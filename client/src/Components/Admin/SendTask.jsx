import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import Heading from '../ReuseableComponent/Heading';
import ButtonComp from '../ReuseableComponent/ButtonComp';
import { useForm } from 'react-hook-form';
import Api from '../../API/Api';

const SendTask = () => {
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

    const fileTypes = ["PDF", "XLS", "XLSX", "DOC", "DOCX"];

    const handleFormData = async (formData) => {
        const data = new FormData();
        data.append("ManagerEmail", formData.ManagerEmail);

        if (formData.DocumentFile && formData.DocumentFile.length > 0) {
            data.append("file", formData.DocumentFile[0]);  
        }
        try {
            const res = await Api.addTask(data);
            console.log(res.data);
        } catch (error) {
            console.log(error.response?.data.errors);
        }
    };

    return (
        <>
            <Heading heading="Add Task!" />
            <form onSubmit={handleSubmit(handleFormData)} encType='multipart/form-data'>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                    
                    <TextField
                        type='email'
                        label="Email"
                        name='ManagerEmail'
                        {...register("ManagerEmail", { required: "Email is required!" })}
                        variant="outlined"
                        sx={{ marginBottom: '20px', width: '350px' }}
                        error={!!errors.ManagerEmail}
                        helperText={errors.ManagerEmail?.message}
                    />

                    {/* File Input */}
                    <TextField
                        type="file"
                        name='file'
                        {...register("DocumentFile", { required: "File is required!" })}
                    />
                    {errors.DocumentFile && <Typography color="error">{errors.DocumentFile.message}</Typography>}

                    <ButtonComp btnText="Add Task!" onclick={handleSubmit(handleFormData)} />
                </Box>
            </form>
            
            <Typography sx={{ textAlign: 'center' }}>
                Supported file types: {fileTypes.join(', ')}
            </Typography>
        </>
    );
};

export default SendTask;
