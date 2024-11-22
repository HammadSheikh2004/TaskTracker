import React, { useContext, useEffect, useState } from 'react';
import Api from '../../API/Api';
import { Box, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Grid2, Grid } from '@mui/material';
import Heading from '../ReuseableComponent/Heading';
import ButtonComp from '../ReuseableComponent/ButtonComp';
import { useForm } from 'react-hook-form';
import { ContextApi } from '../Context/Context';

const SendTaskToEmployees = () => {
    const [data, setData] = useState([]);
    const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
    const { colors } = useContext(ContextApi);


    useEffect(() => {
        const employeeData = async () => {
            const res = await Api.fetchEmployees();
            if (res.data) {
                setData(res.data);
            } else {
                console.log("Error fetching data");
            }
        };
        employeeData();
    }, []);

    const handleOnSelection = (empId) => {
        setSelectedEmployeeIds((selectedId) => {
            if (selectedId.includes(empId)) {
                return selectedId.filter((id) => id !== empId)
            } else {
                return [...selectedId, empId]
            }
        })
    }

    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const handleSendTask = async (formData) => {
        if (selectedEmployeeIds.length === 0) {
            console.log("No employees selected");
            return;
        }

        const data = new FormData();
        data.append("StartDate", formData.StartDate);
        data.append("EndDate", formData.EndDate);
        data.append("EmployeeIds", selectedEmployeeIds.join(","));
        
        if (formData.DocumentFile && formData.DocumentFile[0]) {
            data.append("file", formData.DocumentFile[0]);
        }
        try {
            const res = await Api.sendTaskSpeciEmp(data);
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    };
    return (
        <Box component="div" sx={{ width: '100%', overflowX: 'hidden' }}>
            <Box component="div" sx={{ marginY: '20px' }}>
                <Heading heading="Send Task To Employees!" />
            </Box>

            <form onSubmit={handleSubmit(handleSendTask)} encType='multipart/form-data'>
                <Box>
                    <TextField
                        type="file"
                        name="file"
                        fullWidth
                        {...register('DocumentFile', { required: "File is Requied!" })}
                    />
                    {errors.DocumentFile && (
                        <Box component='span' sx={{ color: colors.errorColor }}>
                            {errors.DocumentFile.message}
                        </Box>
                    )}
                    <Grid2 container spacing={2} sx={{ marginY: '10px' }}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <label htmlFor="startDate" style={{ marginY: '10px' }}>Starting Date</label>
                            <TextField
                                type="date"
                                name="StartDate"
                                fullWidth
                                {...register('StartDate', { required: "This Field is Requied!" })}
                                InputLabelProps={{
                                    shrink: true, 
                                }}
                            />
                            {errors.StartDate && (
                                <Box component='span' sx={{ color: colors.errorColor }}>
                                    {errors.StartDate.message}
                                </Box>
                            )}
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <label htmlFor="endDate" style={{ marginY: '10px' }}>Ending Date</label>
                            <TextField
                                type="date"
                                name="EndDate"
                                fullWidth
                                {...register('EndDate', { required: "This Field is Requied!" })}
                            />
                            {errors.EndDate && (
                                <Box component='span' sx={{ color: colors.errorColor }}>
                                    {errors.EndDate.message}
                                </Box>
                            )}
                        </Grid2>
                    </Grid2>
                </Box>

                <Paper sx={{ marginTop: '20px', width: '100%' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="employee table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Employee Name</TableCell>
                                    <TableCell>Employee Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((emp, index) => (
                                    <TableRow key={index}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedEmployeeIds.includes(emp.id)}
                                                onChange={() => handleOnSelection(emp.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{emp.userName}</TableCell>
                                        <TableCell>{emp.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Box component="div" sx={{ marginTop: '20px' }}>
                    <ButtonComp btnText="Send Task!" onclick={handleSubmit(handleSendTask)} />
                </Box>
            </form>
        </Box>
    );
};

export default SendTaskToEmployees;
