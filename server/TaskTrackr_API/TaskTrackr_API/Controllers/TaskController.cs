using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskTrackr_API.Models;
using TaskTrackr_API.SignalR;

namespace TaskTrackr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IWebHostEnvironment _web;
        private readonly IHubContext<Notification> _notificationHub;
        public TaskController(IWebHostEnvironment web, MyDbContext context, IHubContext<Notification> notificationHub)
        {
            _web = web;
            _context = context;
            _notificationHub = notificationHub;
        }

        [HttpPost("AddTask")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddTask([FromForm] SendTaskModel model, IFormFile file, [FromServices] IHubContext<Notification> notification)
        {
            if (file != null)
            {
                var documentName = "Document_" + DateTime.Now.Ticks + Path.GetExtension(file.FileName);
                var directoryPath = Path.Combine(_web.WebRootPath, "DocumentFiles");

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                var filePath = Path.Combine(directoryPath, documentName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                model.DocumentFile = documentName;
            }

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email!.ToLower() == model.ManagerEmail!.ToLower());

            if (user == null || string.IsNullOrEmpty(user.Email))
            {
                return BadRequest(new { EmailError = "User not found or email not provided!" });
            }

            try
            {
                _context.Tasks.Add(model);
                await _context.SaveChangesAsync();
                await notification.Clients.All.SendAsync("ReceiveNotification", $"A new file '{file!.FileName}' has been uploaded by Admin.");

                return Ok(new { message = "File uploaded successfully!" });
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpGet("GetFiles")]
        public async Task<IActionResult> GetTaskFiles()
        {
            var files = await _context.Tasks.OrderByDescending(x => x.DocId).ToListAsync();
            if (files == null)
            {
                return BadRequest(new { error = "File Not Found!" });
            }
            return Ok(files);
        }

        [HttpPost("SendTaskToSpecificEmployee")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> SendTaskToSpecificEmployee([FromForm] SendTaskToSpecificEmp model, IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Request Invalid!" });
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "File is required!" });
            }

            var userIdsArray = model.EmployeeIds.Split(',');
            string documentName = null;
            if (file != null)
            {
                var fileName = Path.GetFileName(file.FileName);
                documentName = fileName + DateTime.Now.Millisecond + Path.GetExtension(file.FileName);
                var directoryPath = Path.Combine(_web.WebRootPath, "Files");

                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }

                var filePath = Path.Combine(directoryPath, documentName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            var task = new EmployeeTask
            {
                Id = Guid.NewGuid(),
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                DocumentFile = documentName
            };

            _context.EmployeeTasks.Add(task);
            await _context.SaveChangesAsync();

            foreach (var userId in userIdsArray)
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);

                if (user == null)
                {
                    return BadRequest(new { message = $"Employee (User) with ID {userId} not found!" });
                };


                var taskAssignment = new TaskAssignment
                {
                    Id = Guid.NewGuid(),
                    TaskId = task.Id,
                    UserId = user.Id,  
                    AssignedDate = DateTime.UtcNow
                };

                _context.TaskAssignments.Add(taskAssignment);
            }
            await _context.SaveChangesAsync();
            await _notificationHub.Clients.All.SendAsync("ReceiveNotification");
            return Ok(new { successMsg = "Task Sent to Employees!" });
        }

        [HttpGet("GetTasksByUserId")]
        public async Task<IActionResult> GetTasksByUserId(Guid userId)
        {
            var taskAssignments = await _context.TaskAssignments
                .Where(ta => ta.UserId == userId)
                .Include(ta => ta.Task) 
                .Select(ta => new
                {
                    TaskId = ta.Task.Id,
                    Document = ta.Task.DocumentFile,
                    StartDate = ta.Task.StartDate,
                    EndDate = ta.Task.EndDate,
                    AssignmentId = ta.Id,
                    AssignedDate = ta.AssignedDate,
                    IsTaskDone = ta.isTaskDone,
                })
                .ToListAsync();

            if (!taskAssignments.Any())
            {
                return NotFound(new { ErrorMsg = "No tasks found for the specified User ID." });
            }

            return Ok(taskAssignments);
        }

        [HttpPost("IsTaskDone")]
        public async Task<IActionResult> IsTaskDone(Guid id)
        {
            var task = await _context.TaskAssignments.FirstOrDefaultAsync(x => x.TaskId == id);
            if (task == null)
            {
                return BadRequest(new { ErrorMsg = "Task Id Not FOund" });
            }
            task.isTaskDone = true;
            _context.TaskAssignments.Update(task);
            await _context.SaveChangesAsync();
            return Ok(new {SuccessMsg = "Task marked as Done!"});

        }

        [HttpGet("GetAllTask")]
        public async Task<IActionResult> GetAllTask()
        {
            var task = await _context.TaskAssignments
                .Include(ta => ta.Task)
                .Select(ta => new
                {
                    TaskId = ta.Task.Id,
                    Document = ta.Task.DocumentFile,
                    StartDate = ta.Task.StartDate,
                    EndDate = ta.Task.EndDate,
                    AssignmentId = ta.Id,
                    AssignedDate = ta.AssignedDate,
                    IsTaskDone = ta.isTaskDone
                })
                .ToListAsync(); ;
            if (!task.Any())
            {
                return BadRequest(new {ErrorMsg="No task Found!"});
            }
            return Ok(task);
        }



    }





}
