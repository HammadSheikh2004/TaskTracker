using Microsoft.AspNetCore.SignalR;

namespace TaskTrackr_API.SignalR
{
    public class Notification : Hub
    {
        public async Task SendNotification(string message) 
        { 
            await Clients.All.SendAsync("ReceiveNotification", message);
        }

    }
}
