import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../Context/Context';
import Api from '../../API/Api';
import { Box, Card, CardContent, Grid2, Typography } from '@mui/material';
import Heading from '../ReuseableComponent/Heading';

const EmployeeDashboard = () => {
  const { auth } = useContext(ContextApi);
  const [data, setData] = useState([]);
  const [adjustedDate, setAdjustedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (auth?.id) {
        const res = await Api.getSpecificTask(auth?.id);
        console.log(res.data);
        setData(res.data);
      }
    }
    fetchData();
  }, [auth]);

  const count = data.length;

  return (
    <>
      <Box>
        <Heading heading="Dashboard" />
        <Box component='div' sx={{ marginY: '20px' }}>
          <Card>
            <CardContent>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Total Projects : {count}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  )
}

export default EmployeeDashboard