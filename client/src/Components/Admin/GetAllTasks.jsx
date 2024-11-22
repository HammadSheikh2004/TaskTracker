import React, { useEffect, useState } from 'react'
import Api from '../../API/Api';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Heading from '../ReuseableComponent/Heading';

const GetAllTasks = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await Api.getTasks();
            console.log(res.data);
            setData(res.data);
        };
        fetchUsers();
    }, []);
    return (
        <>
            <Box component='div' sx={{ marginY: '20px' }}>
                <Box sx={{ marginY: '20px' }}>
                    <Heading heading='All Tasks Assigned By Manager!' />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Assigned Date</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Document</TableCell>
                                <TableCell>Task Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((da, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{new Date(da.assignedDate).toLocaleString()}</TableCell>
                                        <TableCell>{da.startDate}</TableCell>
                                        <TableCell>{da.endDate}</TableCell>
                                        <TableCell>
                                            <a href={`http://localhost:5045/Files/${da.document}`} style={{ textDecoration: 'none' }}>{da.document}</a>
                                        </TableCell>
                                        <TableCell>{da.taskId}</TableCell>
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

export default GetAllTasks