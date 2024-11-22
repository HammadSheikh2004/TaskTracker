import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../API/Api';
import { TextField, Typography, Box } from '@mui/material';
import { ContextApi } from '../Context/Context';
import { useForm } from 'react-hook-form';
import ButtonComp from '../ReuseableComponent/ButtonComp';

const Profile = () => {
    const { id } = useParams();
    const { colors, setAuth, auth } = useContext(ContextApi);
    const [data, setData] = useState({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        file: ''
    });

    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();

    useEffect(() => {
        Api.findDataById(id)
            .then((res) => {
                setData(res.data);
                reset({
                    FirstName: res.data.firstName,
                    LastName: res.data.lastName
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);


    const handleFormSubmit = async (formData) => {
        const data = new FormData();
        data.append("FirstName", formData.FirstName);
        data.append("LastName", formData.LastName);

        if (formData.UserImage && formData.UserImage.length > 0) {
            data.append("file", formData.UserImage[0]);
        }

        try {
            const res = await Api.updateUserData(data, id);
            const existingAuthData = JSON.parse(localStorage.getItem("auth")) || {};
            const updatedAuthData = { ...existingAuthData, ...res.data.user };
            setAuth(updatedAuthData);
            localStorage.setItem("auth", JSON.stringify(updatedAuthData));
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                console.log(error.response.data.errors)
                const serverErrors = error.response.data.errors;

                if (serverErrors.FirstName) {
                    setError("FirstName", { type: 'server', message: serverErrors.FirstName[0] });
                }
                if (serverErrors.LastName) {
                    setError("LastName", { type: 'server', message: serverErrors.LastName[0] });
                }
                if (serverErrors.UserImage) {
                    setError("UserImage", { type: 'server', message: serverErrors.UserImage[0] });
                }
            } else {
                console.log("Unexpected error!", error);
            }
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)} encType='multipart/form-data'>
                <TextField
                    fullWidth
                    type="text"
                    value={data.userName}
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={{ marginBottom: '15px' }}
                />
                <TextField
                    fullWidth
                    type="email"
                    value={data.email}
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={{ marginBottom: '15px' }}
                />

                <TextField
                    fullWidth
                    type="text"
                    name='firstName'
                    placeholder='First Name'
                    {...register("FirstName", { required: "First Name is required!" })}
                    variant="outlined"
                    sx={{ marginBottom: '15px' }}
                />
                {errors.FirstName && (
                    <Box component='span' sx={{ color: colors.errorColor }}>
                        {errors.FirstName.message}
                    </Box>
                )}
                <TextField
                    fullWidth
                    type="text"
                    name='lastName'
                    placeholder='Last Name'
                    {...register("LastName", { required: "Last Name is required!" })}
                    variant="outlined"
                    sx={{ marginBottom: '15px' }}
                />
                {errors.LastName && (
                    <Box component='span' sx={{ color: colors.errorColor }}>
                        {errors.LastName.message}
                    </Box>
                )}
                <TextField
                    fullWidth
                    type="file"
                    name='file'
                    {...register("UserImage", { required: "Image is required!" })}
                    variant="outlined"
                    sx={{ marginBottom: '15px' }}
                />
                {errors.UserImage && (
                    <Box component='span' sx={{ color: colors.errorColor }}>
                        {errors.UserImage.message}
                    </Box>
                )}
                <ButtonComp btnText="Update Profile" onclick={handleFormSubmit} />
            </form>
        </>
    );
};

export default Profile;
