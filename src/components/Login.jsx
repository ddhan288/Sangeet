import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAccessToken, loadToken, setToken } from '../redux/APISlice';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login({user}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    // const [user, setUser] = useState(null);

    useEffect(() => {
        const ID = localStorage.getItem("user");
        if(ID)
            dispatch(getAccessToken(ID));
        else
            navigate("/signup");
        
    },[]);




    const handleClick = (e) => {
        setOpen(true);
        dispatch(loadToken());

        setTimeout(() => {
            navigate("/home");
        }, 2000);

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };




    return (
        <div className='navbackImg text-white grid place-items-center h-screen '>
            <div className='lg:w-1/4 w-3/4'>
                <img className='lg:object-contain' src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png" alt="spotify" />
            </div>
            <h2 className='lg:text-lg text-2xl'>Powered By Spotify API</h2>
            <button onClick={handleClick} className='bg-slate-800 border hover:border-[#1ED760] p-4 rounded-3xl shadow-md hover:text-[#1ED760] hover:cursor-pointer hover:transition-colors duration-300 ease-in-out'>Get Access Token</button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Access token granted successfully!!
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Login
