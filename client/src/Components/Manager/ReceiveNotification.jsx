import { HubConnectionBuilder } from '@microsoft/signalr'
import React, { useEffect, useState } from 'react'
import Api from '../../API/Api'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const ReceiveNotification = () => {
    const [notification, setNotification] = useState([])
    const [file, setFile] = useState([])

    useEffect(() => {
        var connection = new HubConnectionBuilder().withUrl("http://localhost:5045/notification").withAutomaticReconnect().build();

        connection.start().then(() => {
            connection.on("ReceiveNotification", (message) => {
                setNotification((preNotification) => [...preNotification, message]);
            })
        }).catch((err) => {
            console.log("Connection Failed!", err);
        })

        return () => {
            connection.stop();
        };

    }, [])

    useEffect(() => {
        const documentFiles = async () => {
            const res = await Api.getFile();
            if (res.data && Array.isArray(res.data)) {
                setFile(res.data);
            } else {
                console.log(res.data.errors);
            }
        }

        documentFiles();
    }, [])

    return (
        <>
            <ul>
                {notification.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>

            <Box component='div' sx={{ marginY: '20px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                file.map((doc, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            <a href={`http://localhost:5045/DocumentFiles/${doc.documentFile}`} download>
                                                {doc.documentFile}
                                            </a>
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

export default ReceiveNotification