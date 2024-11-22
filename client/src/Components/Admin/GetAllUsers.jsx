import React, { useContext, useEffect, useState } from 'react'
import Api from '../../API/Api';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ContextApi } from '../Context/Context';
import Heading from '../ReuseableComponent/Heading';

const GetAllUsers = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await Api.getAllUsers();
            setData(res.data);
        };
        fetchUsers();
    }, []);

    const { colors } = useContext(ContextApi);

    const RoleStyle = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return { backgroundColor: colors.successColor, color: colors.whiteColor };
                break;
            case 'manager':
                return { backgroundColor: 'yellow', color: colors.blackColor };
                break;
            case 'employee':
                return { backgroundColor: colors.primaryColor, color: colors.whiteColor };
                break;
            default:
                return {};
        }
    }

    return (
        <>
            <Box component='div' sx={{ marginY: '20px' }}>
                <Box sx={{ marginY: '20px' }}>
                    <Heading heading='All Users!' />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((abc, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{abc.userName}</TableCell>
                                        <TableCell>{abc.email}</TableCell>
                                        <TableCell sx={RoleStyle(abc.role)}>{abc.role}</TableCell>
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

export default GetAllUsers