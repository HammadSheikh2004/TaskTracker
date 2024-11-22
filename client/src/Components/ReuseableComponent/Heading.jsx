import React, { useContext } from 'react'
import { ContextApi } from '../Context/Context'
import { Typography } from '@mui/material';

const Heading = ({heading}) => {
    const { colors } = useContext(ContextApi);
    return (
        <>
            <Typography sx={{backgroundColor:colors.backgroundColor, color:colors.textColor, padding:'15px', fontSize:'25px', borderRadius:'8px'}}>{heading}</Typography>
        </>
    )
}

export default Heading