import axios from "axios"

const insertApi = "http://localhost:5045/api/User/Register";
const signinApi = "http://localhost:5045/api/User/signin";
const fetchSingleDataApi = "http://localhost:5045/api/User/FetchDataById";
const updateData = "http://localhost:5045/api/User/UpdateUserData";
const getEmployeesApi = "http://localhost:5045/api/User/GetEmployees";
const getAllUsersApi = "http://localhost:5045/api/User/GetAllUsers";

const addTaskApi = "http://localhost:5045/api/Task/AddTask";
const fetchTaskApi = "http://localhost:5045/api/Task/GetFiles";
const stse = "http://localhost:5045/api/Task/SendTaskToSpecificEmployee";
const specificTaskApi = "http://localhost:5045/api/Task/GetTasksByUserId";
const getAllTaskApi = "http://localhost:5045/api/Task/GetAllTask";
const markAsDoneApi = "http://localhost:5045/api/Task/IsTaskDone";

const Api = {
    insertData: (data) => {
        return axios({
            method: "POST",
            url: insertApi,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
    },

    signinData: (data) => {
        return axios({
            method: 'POST',
            url: signinApi,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    findDataById: (id) => {
        return axios({
            method: "GET",
            url: `${fetchSingleDataApi}?id=${id}`,
        })
    },

    updateUserData: (data, id) => {
        return axios({
            method: "POST",
            url: `${updateData}?id=${id}`,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    fetchEmployees: () => {
        return axios({
            method: "GET",
            url: getEmployeesApi,
        })
    },

    addTask: (data) => {
        return axios({
            method: "POST",
            url: addTaskApi,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    getFile: () => {
        return axios({
            method: "GET",
            url: fetchTaskApi,
        })
    },

    sendTaskSpeciEmp: (data) => {
        return axios({
            method: "POST",
            url: stse,
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },

    getSpecificTask: (id) => {
        return axios({
            method: "GET",
            url: `${specificTaskApi}?userId=${id}`
        })
    },

    getAllUsers: () => {
        return axios({
            method: 'GET',
            url: getAllUsersApi,
        })
    },

    getTasks: () => {
        return axios({
            method: 'GET',
            url: getAllTaskApi,
        })
    },

    taskMarkAsDone: (id) => {
        return axios({
            method: 'POST', 
            url: `${markAsDoneApi}?id=${id}`,
        });
    },

}

export default Api