import { Alert, Box, Container, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import ButtonComp from '../ReuseableComponent/ButtonComp';
import { ContextApi } from '../Context/Context';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Api from '../../API/Api';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const { colors } = useContext(ContextApi);
  const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    data.append("UserName", formData.UserName);
    data.append("Email", formData.Email);
    data.append("Password", formData.Password);

    try {
      const res = await Api.insertData(data);
      if (res.data) {
        setSuccessMessage(res.data.message);
        reset();
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;

        if (serverErrors.userName) {
          setError("UserName", { type: "server", message: serverErrors.userName });
        }
        if (serverErrors.email) {
          setError("Email", { type: "server", message: serverErrors.email });
        }
        if (serverErrors.errors.Password) {
          setError("Password", { type: "server", message: serverErrors.errors.Password[0] });
        }
      } else {
        console.log("Error occurred:", err);
      }
    }
  };


  return (
    <>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
        <Box sx={{ boxShadow: '10px 10px 19px 1px rgba(150,176,152,1)', padding: '20px', backgroundColor: colors.backgroundColor, color: colors.textColor, width: '500px', borderRadius: '10px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Typography sx={{ fontSize: '23px', textAlign: 'center' }}>
              Welcome To
              <Box component='span' sx={{ fontWeight: 'bold' }}> TaskTrackr</Box>!
            </Typography>
          </Box>
          {
            successMessage && (
              <Box sx={{ marginY: '10px' }}>
                <Alert variant="filled" severity="success">
                  {successMessage}
                </Alert>
              </Box>
            )
          }
          <Box sx={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit(handleFormSubmit)} method='POST'>
              <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="UserName"
                    {...register("UserName", { required: "Username is required" })}
                    name='UserName'
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: colors.primaryColor },
                        '&.Mui-focused fieldset': { borderColor: colors.primaryColor },
                      },
                      '& .MuiInputLabel-root': { '&.Mui-focused': { color: colors.primaryColor } },
                    }}
                  />
                  {errors.UserName && <Box component='span' sx={{ color: colors.errorColor, marginTop: '10px' }}>{errors.UserName.message}</Box>}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    {...register("Email", { required: "Email is required" })}
                    variant="outlined"
                    name='Email'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: colors.primaryColor },
                        '&.Mui-focused fieldset': { borderColor: colors.primaryColor },
                      },
                      '& .MuiInputLabel-root': { '&.Mui-focused': { color: colors.primaryColor } },
                    }}
                  />
                  {errors.Email && <Box component='span' sx={{ color: colors.errorColor, marginTop: '10px' }}>{errors.Email.message}</Box>}
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    {...register("Password", { required: "Password is required" })}
                    type="password"
                    name='Password'
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: colors.primaryColor },
                        '&.Mui-focused fieldset': { borderColor: colors.primaryColor },
                      },
                      '& .MuiInputLabel-root': { '&.Mui-focused': { color: colors.primaryColor } },
                    }}
                  />
                  {errors.Password && <Box component='span' sx={{ color: colors.errorColor, marginTop: '10px' }}>{errors.Password.message}</Box>}
                </Grid>
              </Grid>
              <ButtonComp btnText="Sign up" width="100%" onclick={handleSubmit(handleFormSubmit)} />
            </form>
          </Box>
          <Box component="div" sx={{ marginTop: '10px' }}>
            <Typography sx={{ textAlign: 'center' }}>Have an Account? <NavLink to="/" style={{ textDecoration: 'none', color: colors.primaryColor }}><Box component="span" sx={{ fontWeight: 'bold' }}>Sign In</Box></NavLink>!</Typography>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Signup;
