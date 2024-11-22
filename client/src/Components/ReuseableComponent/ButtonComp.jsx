import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { ContextApi } from '../Context/Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonComp = ({ btnText, width, icon, onclick }) => {
    const { colors } = useContext(ContextApi);
    return (
        <>
            <Button sx={{ textTransform: 'capitalize', padding: '10px', fontSize: '16px', backgroundColor: colors.primaryColor, color: colors.whiteColor, width: width, marginTop:'10px' }} startIcon={icon && <FontAwesomeIcon icon={icon} style={{ fontSize: '15px', marginLeft: '10px' }} />} onClick={(e) => onclick(e)} type='submit'>{btnText}</Button>
        </>
    )
}

export default ButtonComp