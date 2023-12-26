import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MainSection from './MainSection';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenDrawer } from '../redux/APISlice';


function Home() {
    const token = useSelector(state => state.APISlice.token);
    const dispatch = useDispatch();
    const nav = useNavigate();


    useEffect(() => {
        if(token === '')
            nav("/login");
    }, [])
    

    return (
        <div>
            <div className="lg:grid place-items-center lg:h-screen bg-[#3ABB82] text-white">
                {/* Main Container Body */}
                <div className="w-full h-full pb-0 md:rounded-sm bg-white text-black flex">
                    {/* SideBar */}
                    <Sidebar />

                    <div  className="bg-gradient-to-t from-[#ECDBFD] via-[#FCF3F8] to-[#FFEEDE] h-fit w-full">
                        {/* Navbar */}
                        <Navbar />

                        {/* Main Section */}
                        <MainSection/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
