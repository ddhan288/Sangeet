import React, { useState } from 'react';
import buddha from '../assets/vector.jpg';
import { Button, TextField, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../firebase-config';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

function Signin() {
    const [info, setInfo] = useState({
        email: "",
        password: "",
        
    });

    const [error, setError] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false);

    function handleChange(e) {
        setError({
            email: false,
            password: false,
            clientID: false
        });

        if (e.target.id === 'email') {
            setInfo(prev => {
                return { ...prev, email: e.target.value }
            });

        } else if (e.target.id === 'pass') {
            setInfo(prev => {
                return { ...prev, password: e.target.value }
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


        if (info.email !== '' && info.password !== '') {
            setDisabled(true);

            setTimeout(async () => {
                const res = await signInWithEmailAndPassword(auth ,info.email, info.password);
                // console.log(""res);

                setInfo({
                    email: "",
                    password: "",
                });

                setDisabled(false);
                localStorage.setItem("user", res.user.photoURL);
                localStorage.setItem("displayName", res.user.displayName);
                navigate("/");
            }, 2000);


        }
    }

     // useMediaQuerry for dynamic size
     const theme = useTheme();
     const isMidScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className='lg:text-base text-lg bg-gradient-to-br from-[#002142] to-[#026BC9] h-screen grid place-items-center' >

            <div className='bg-white lg:w-[60%] lg:h-3/4 w-full h-full flex' style={{ "box-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>

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
                        <TextField onChange={handleChange} value={info.email} id='email' error={error.email ? true : false} className='w-full' label="Email" type='Email' variant="outlined" size={isMidScreen ? "large" : "small"} helperText={error.email ? "Mandatory field" : ''} />
                        <TextField onChange={handleChange} value={info.password} id='pass' error={error.password ? true : false} className='w-full' label="Password" type='Password' variant="outlined" size={isMidScreen ? "large" : "small"} helperText={error.password ? "Mandatory field" : ''} />
                        <Button onClick={handleClick} size='large' disabled={disabled} className='w-full float-right' variant="contained">SIGN IN</Button>
                    </div>

                    <div className='m-10 mt-[100px]'>
                        {(!error.password && !error.email) && <p className='lg:mt-5 mt-32 text-slate-400 cursor-default text-sm'>Don't have an account ? <span onClick={() => { navigate("/signup") }} className='hover:cursor-pointer hover:border-b-[1px] border-blue-300 text-blue-400'>Sign up</span></p>}
                    </div>


                </div>


            </div>

        </div>
    )
}

export default Signin
