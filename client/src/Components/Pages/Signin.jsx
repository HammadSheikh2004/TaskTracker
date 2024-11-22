import React, { useContext, useEffect } from 'react';
import { ContextApi } from '../Context/Context';
import { Box, Container, Typography, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import ButtonComp from '../ReuseableComponent/ButtonComp';
import { NavLink, useNavigate } from 'react-router-dom';
import Api from '../../API/Api';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';

const Signin = () => {
  const { colors, setAuth } = useContext(ContextApi);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      if (role === 'Admin') navigate('/admin/adminDashboard');
      else if (role === 'Manager') navigate('/manager/managerDashboard');
      else if (role === 'Employee') navigate('/employee/employeeDashboard');
    }
  }, [navigate]);

  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const handleFormSubmit = async (formData) => {
    const data = {
      Email: formData.Email,
      Password: formData.Password
    };

    try {
      const res = await Api.signinData(data);

      setAuth(res.data.user);
      localStorage.setItem("auth", JSON.stringify(res.data.user));

      const token = res.data.token;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role === "Admin") navigate("/admin/adminDashboard");
      else if (role === "Manager") window.location.href = "/manager/managerDashboard";
      else window.location.href = "/employee/employeeDashboard";
    } catch (error) {
      if (error.response && error.response.data) {
        const serverError = error.response.data;
        if (serverError.emailAndPassword) {
          setError("Email", { type: 'server', message: serverError.emailAndPassword });
        }
        if (serverError.password) {
          setError("Password", { type: 'server', message: serverError.password });
        }
      } else {
        console.log("Unexpected error:", error);
      }
    }

  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '600px' }}>
      <Box sx={{
        boxShadow: '10px 10px 19px 1px rgba(150,176,152,1)',
        padding: '20px',
        backgroundColor: colors.backgroundColor,
        color: colors.textColor,
        width: '300px',
        borderRadius: '10px'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <Box component='span' sx={{
            backgroundColor: colors.primaryColor,
            color: colors.whiteColor,
            padding: '10px',
            borderRadius: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px',
            height: '50px'
          }}>
            <FontAwesomeIcon icon={faUnlockKeyhole} />
          </Box>
          <Typography sx={{ fontSize: '23px', textAlign: 'center' }}>
            Sign in to Continue Managing Tasks in
            <Box component='span' sx={{ fontWeight: 'bold' }}> TaskTrackr</Box>!
          </Typography>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
          <form onSubmit={handleSubmit(handleFormSubmit)} method='POST'>
            <TextField
              fullWidth
              label="Email"
              name='Email'
              {...register("Email", { required: "Email is required!" })}
              variant="outlined"
              sx={{
                marginBottom: '15px',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: colors.primaryColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.primaryColor,
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: colors.primaryColor,
                  },
                },
              }}
            />
            {errors.Email && (
              <Box component='span' sx={{ color: colors.errorColor, marginTop: '10px', marginBottom: '10px' }}>
                {errors.Email.message}
              </Box>
            )}
            <TextField
              fullWidth
              label="Password"
              type="password"
              name='Password'
              {...register("Password", { required: "Password is required!" })}
              variant="outlined"
              sx={{
                marginBottom: '15px',
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: colors.primaryColor,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.primaryColor,
                  },
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: colors.primaryColor,
                  },
                },
              }}
            />
            {errors.Password && (
              <Box component='span' sx={{ color: colors.errorColor, marginTop: '10px', marginBottom: '10px' }}>
                {errors.Password.message}
              </Box>
            )}
            <ButtonComp btnText="Sign in" width="100%" onclick={handleFormSubmit} />
          </form>
        </Box>

        <Box component="div" sx={{ marginTop: '10px' }}>
          <Typography>
            Don't have an Account? <NavLink to="/signup" style={{ textDecoration: 'none', color: colors.primaryColor }}>
              <Box component="span" sx={{ fontWeight: 'bold' }}>Sign Up</Box>
            </NavLink>!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
