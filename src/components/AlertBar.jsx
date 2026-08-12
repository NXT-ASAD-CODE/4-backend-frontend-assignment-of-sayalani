import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
function AlertBar() {
    return (
        <div className='AlertBar'>
            <p>
                Sign up and get 20% off to your first order. <span> Sign Up Now </span>
            </p>
            <CloseIcon sx={{
                color:"#FFFFFF",
                position:"absolute",
                right:"60px",
                fontSize:"20px"
            }}/>
        </div>
    )
}

export default AlertBar;