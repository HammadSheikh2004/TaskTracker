import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';

import UserAvatar from '../../../assets/Images/userAvatar.png'
import { ContextApi } from '../../Context/Context';
import ButtonComp from '../../ReuseableComponent/ButtonComp';
import { HubConnectionBuilder } from '@microsoft/signalr';

const baseImageUrl = "http://localhost:5045/UserImages/";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    backgroundColor: '#ECF0F1',
    color: 'black'
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);
const MDashboard = () => {
    const { colors, auth } = useContext(ContextApi);

    const [open, setOpen] = useState(true);

    const [notificationCount, setNotificationCount] = useState(
        () => Number(localStorage.getItem('notificationCount')) || 0
    );

    useEffect(() => {
        var connection = new HubConnectionBuilder().withUrl("http://localhost:5045/notification").withAutomaticReconnect().build();

        connection.start().then(() => {
            connection.on("ReceiveNotification", (message) => {
                setNotificationCount((preCount) => {
                    const newCount = preCount + 1;
                    localStorage.setItem('notificationCount', newCount);
                    return newCount;
                });
            })
        }).catch((err) => {
            console.log("Connection Failed!", err);
        })

        return () => {
            connection.stop();
        };

    }, [notificationCount])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const removeItem = () => {
        localStorage.removeItem('notificationCount');
        setNotificationCount(0);
        console.log("Removed Called!")
    }
    const menuItems = [
        {
            text: (
                <>
                    Notification{' '}
                    <span style={{ backgroundColor: colors.primaryColor, padding: '6px', borderRadius: '100%', color: '#fff', textAlign: 'center' }}>
                        ({notificationCount ? notificationCount : 0})
                    </span>
                </>
            ),
            path: '/manager/receiveNotification',
            icon: faEnvelope,
            onClick: removeItem,
        },

        { text: 'Send Task to Employee', path: '/manager/sendTaskToManager', icon: faStar },
    ];

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: colors.primaryColor }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </IconButton>
                    <Container>
                        <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" noWrap component="div">
                                {
                                    auth && (
                                        <>
                                            Welcome <Box component='span'>{auth.userName}!</Box>
                                            <Box component='div' sx={{ fontSize: '14px' }}>{auth.role}</Box>
                                        </>
                                    )
                                }
                            </Typography>
                            <Box sx={{ marginLeft: '10px' }}>
                                <ButtonComp btnText='Logout' icon={faSignOutAlt} onclick={logOut} />
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{ backgroundColor: colors.secondaryColor, color: 'black' }}>
                <DrawerHeader>
                    <Typography component='span' sx={{ marginRight: '30px', fontSize: '16px', fontWeight: 'bold' }}>Manager Dashboard</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <FontAwesomeIcon icon={faBars} />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ color: 'black' }}>
                    <Box sx={{ ...(open ? { display: 'block' } : { display: 'none' }), textAlign: 'center', marginBottom: '20px' }}>
                        {auth &&
                            <>
                                <img src={auth.userImage ? `${baseImageUrl}${auth.userImage}` : UserAvatar} height='200px' width='200px' alt="" style={{ borderRadius: '50%' }} />
                                <Box component='div' sx={{ marginTop: '10px' }}>
                                    <NavLink to={`profile/${auth?.id}`} style={{ backgroundColor: colors.primaryColor, padding: '10px', color: colors.whiteColor, textDecoration: 'none', }}>Edit Profile</NavLink>
                                </Box>
                            </>
                        }
                    </Box>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block', color: 'black' }}>
                            <NavLink to={item.path} style={{ textDecoration: 'none', color: 'black' }}
                                onClick={item.onClick}>

                                <ListItemButton
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                            color: 'black',
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                                color: 'black',
                                            },
                                            open
                                                ? {
                                                    mr: 3,
                                                }
                                                : {
                                                    mr: 'auto',
                                                },
                                        ]}
                                    >
                                        <FontAwesomeIcon icon={item.icon} style={{ color: colors.primaryColor }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            color: 'black',
                                            ...(open ? { display: 'block' } : { display: 'none' }),
                                        }}
                                    />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}

                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Container sx={{ marginTop: '60px' }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    )
}

export default MDashboard