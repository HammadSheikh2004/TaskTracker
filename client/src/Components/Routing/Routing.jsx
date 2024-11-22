import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signin from '../Pages/Signin'
import Signup from '../Pages/Signup'
import AdminDashboard from '../Admin/AdminDashboard'
import EmployeeDashboard from '../Employee/EmployeeDashboard'
import ProtectedRoutes from './ProtectedRoutes'
import ManagerDashboard from '../Manager/ManagerDashboard'
import Dashboard from '../Admin/Layout/Dashboard'
import MDashboard from '../Manager/Layout/MDashboard'
import EDashboard from '../Employee/Layout/EDashboard'
import Profile from '../Pages/Profile'
import SendTask from '../Admin/SendTask'
import ReceiveNotification from '../Manager/ReceiveNotification'
import SendTaskToEmployees from '../Manager/SendTaskToEmployees'
import GetTask from '../Employee/GetTask'
import GetAllUsers from '../Admin/GetAllUsers'
import GetAllTasks from '../Admin/GetAllTasks'

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />


        <Route path='/admin/*' element={<ProtectedRoutes />}>
          <Route element={<Dashboard />}>
            <Route path='adminDashboard' element={<AdminDashboard />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='sendTask' element={<SendTask />} />
            <Route path='users' element={<GetAllUsers />} />
            <Route path='allTask' element={<GetAllTasks />} />
          </Route>
        </Route>

        <Route path='/manager/*' element={<ProtectedRoutes />}>
          <Route element={<MDashboard />}>
            <Route path='managerDashboard' element={<ManagerDashboard />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='receiveNotification' element={<ReceiveNotification />} />
            <Route path='sendTaskToManager' element={<SendTaskToEmployees />} />
          </Route>
        </Route>


        <Route path='/employee/*' element={<ProtectedRoutes />}>
          <Route element={<EDashboard />}>
            <Route path='employeeDashboard' element={<EmployeeDashboard />} />
            <Route path='profile/:id' element={<Profile />} />
            <Route path='getTask' element={<GetTask />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default Routing