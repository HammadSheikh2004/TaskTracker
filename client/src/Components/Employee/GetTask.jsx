import React, { useContext, useEffect, useState } from 'react'
import { ContextApi } from '../Context/Context'
import Api from '../../API/Api';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const GetTask = () => {
  const { auth } = useContext(ContextApi);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (auth?.id) {
        const res = await Api.getSpecificTask(auth?.id);
        setData(res.data);
      }
    }
    fetchData();
  }, [auth, data]);

  const taskUpdate = async (id) => {
    try {
      const response = await Api.taskMarkAsDone(id);
      if (response.data?.successMsg) {
        setData((prevData) =>
          prevData.map((doc) =>
            doc.taskId === id ? { ...doc, isTaskDone: true } : doc
          )
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <>
      <Box component='div' sx={{ marginY: '20px' }}>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Document File</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{doc.startDate}</TableCell>
                    <TableCell>{doc.endDate}</TableCell>
                    <TableCell>
                      <a href={`http://localhost:5045/Files/${doc.document}`} download>
                        {doc.document}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{ padding: '8px', textTransform: 'capitalize' }}
                        onClick={() => { taskUpdate(doc.taskId) }}
                        disabled={doc.isTaskDone}
                      >
                        {doc.isTaskDone ? "Task Completed" : "Mark as Done"}
                      </Button>
                    </TableCell>

                  </TableRow>
                ))
              }
            </TableBody>

          </Table>
        </TableContainer>





      </Box>

    </>
  )
}

export default GetTask