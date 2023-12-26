import React, { useState } from 'react';
import buddha from '../assets/vector.jpg';
import { Button, InputAdornment, Popover, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../firebase-config';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';


function Signup() {
    const [info, setInfo] = useState({
        email: "",
        password: "",
        clientID: "",
        fname: "",
        lname: ""
    });

    const [error, setError] = useState({
        email: false,
        password: false,
        clientID: false,
        fname: false,
        lname: false
    });
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    function handleChange(e) {
        setError({
            email: false,
            password: false,
            clientID: false,
            fname: false,
            lname: false
        });

        if (e.target.id === 'email') {
            setInfo(prev => {
                return { ...prev, email: e.target.value }
            });

        } else if (e.target.id === 'pass') {
            setInfo(prev => {
                return { ...prev, password: e.target.value }
            });

        } else if (e.target.id === 'cid') {
            setInfo(prev => {
                return { ...prev, clientID: e.target.value }
            });

        } else if (e.target.id === 'fname') {
            setInfo(prev => {
                return { ...prev, fname: e.target.value }
            });

        } else {
            setInfo(prev => {
                return { ...prev, lname: e.target.value }
            });
        }
    }

    function handleClick() {
        if (info.email === '') {
            setError(prev => {
                return { ...prev, email: true }
            });
        }

        if (info.password === '') {
            setError(prev => {
                return { ...prev, password: true }
            });
        }

        if (info.clientID === '') {
            setError(prev => {
                return { ...prev, clientID: true }
            });
        }

        if (info.fname === '') {
            setError(prev => {
                return { ...prev, fname: true }
            });
        }

        if (info.lname === '') {
            setError(prev => {
                return { ...prev, lname: true }
            });
        }

        if (info.email !== '' && info.password !== '' && info.clientID !== '' && info.fname !== '' && info.lname !== '') {
            setDisabled(true);

            setTimeout(async () => {
                try {
                    const res = await createUserWithEmailAndPassword(auth, info.email, info.password);
                    console.log("Auth response: ", res);
                    await updateProfile(res.user, { photoURL: info.clientID });
                    await updateProfile(res.user, { displayName: `${info.fname} ${info.lname}` });

                    alert("All set account created!!");

                    setInfo({
                        email: "",
                        password: "",
                        clientID: "",
                        fname: "",
                        lname: ""
                    });

                    setDisabled(false);

                    localStorage.setItem("user", info.clientID);
                    localStorage.setItem("displayName", `${info.fname} ${info.lname}`);
                    navigate("/");

                } catch (error) {
                    alert(error);
                    setDisabled(false);
                }



            }, 500);


        }
    }

    // Controlls for popover
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    // useMediaQuerry for dynamic size
    const theme = useTheme();
    const isMidScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <div className='lg:text-base text-lg bg-gradient-to-br from-[#002142] to-[#026BC9] h-screen grid place-items-center' >

            <div className='bg-white lg:w-[60%] lg:h-fit w-full h-full flex' style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>

                {/* Image */}
                <div className='object-contain lg:block hidden'>
                    <img className='h-[100%] w-[550px]' src={buddha} alt="vector" style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }} />
                </div>

                {/* Signin UI */}
                <div className='w-full'>

                    {/* Container */}
                    <div className='m-10 hover:cursor-default'>
                        <h1 className='border-b-4 border-indigo-500 w-fit h-fit mb-1 font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 from-20% to-blue-500 to-80%'>संगीत</h1>

                        <p className='text-gray-500'>Welcome to Sangeet</p>
                        <p className='text-gray-500'>Sangeet is the moonlight in the gloomy night of life.</p>
                    </div>

                    <div className='m-10 lg:space-y-5 space-y-10 mb-5'>
                        <div className='flex gap-2 items-center justify-between'>
                            <TextField sx={{ width: "50%" }} onChange={handleChange} value={info.fname} id='fname' label="First Name" size={isMidScreen ? "large" : "small"} error={error.fname ? true : false} helperText={error.fname ? "Mandatory field" : ''} />
                            <TextField sx={{ width: "50%" }} onChange={handleChange} value={info.lname} id='lname' label="Last Name" size={isMidScreen ? "large" : "small"} error={error.lname ? true : false} helperText={error.lname ? "Mandatory field" : ''} />
                        </div>
                        <TextField onChange={handleChange} value={info.email} id='email' error={error.email ? true : false} className='w-full' label="Email" type='Email' variant="outlined" size={isMidScreen ? "large" : "small"} helperText={error.email ? "Mandatory field" : ''} />
                        <TextField onChange={handleChange} value={info.password} id='pass' error={error.password ? true : false} className='w-full' label="Password" type='Password' variant="outlined" size={isMidScreen ? "large" : "small"} helperText={error.password ? "Mandatory field" : ''} />
                        <TextField onChange={handleChange} InputProps={{
                            startAdornment: (
                                <InputAdornment onClick={handleClickPopover}  position="start">
                                    <InfoIcon sx={{"&:hover": { color: "orange" }}} className='text-slate-300 hover:cursor-pointer hover:text-slate-600' fontSize='small' />
                                </InputAdornment>
                            ),
                        }} value={info.clientID} id='cid' error={error.clientID ? true : false} className='w-full mb-5' label="Spotify Client ID" variant="outlined" size={isMidScreen ? "large" : "small"} helperText={error.clientID ? "Mandatory field" : ''} />
                        <Button onClick={handleClick} size='large' disabled={disabled} className='w-full float-right' variant="contained">SIGN UP</Button>
                    </div>

                    <div className='m-10 mt-[100px]'>
                        {(!error.password && !error.email && !error.clientID) && <p className='lg:mt-5 mt-32 text-slate-400 cursor-default text-sm'>Already have an account ? <span onClick={() => { navigate("/signin") }} className='hover:cursor-pointer hover:border-b-[1px] border-blue-300 text-blue-400'>Sign in</span></p>}
                    </div>

                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className='p-3'>
                            <p className='text-base font-semibold text-slate-600'>How to get Spotify Client ID ?</p>
                            <ul className='text-[14px] mb-2 mt-2'>
                                <li>🟢 Sign in to your spotify dev account.</li>
                                <li>🟢 Go to your dashboard.</li>
                                <li>🟢 Click on create app.</li>
                                <li>🟢 Fill the info as you like.</li>
                                <li>🔴 Give redirect URL as <span className='text-indigo-500'>https://sangeet365.netlify.app/login</span></li>
                                <li>🟢 Check the checkbox and save.</li>
                                <li>🟢 Go to the settings and copy the Client ID.</li>
                            </ul>
                            <Tooltip title="https://developer.spotify.com/" placement="right">
                                <Button onClick={() => {window.open("https://developer.spotify.com/")}} size='small' variant='outlined'>Take me</Button>
                            </Tooltip>
                        </div>
                    </Popover>

                </div>


            </div>

        </div>
    )
}

export default Signup
