import React, { useContext, useEffect } from 'react'
import { ContextApi } from '../Context/Context'

const ManagerDashboard = () => {
  const { auth } = useContext(ContextApi);

  return (
    <div>Manager { auth && auth.role}</div>
  )
}

export default ManagerDashboard