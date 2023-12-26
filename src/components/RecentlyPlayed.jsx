import React from 'react'
import Navbar from './Navbar'
import MainSection from './MainSection'
import Sidebar from './Sidebar'

function RecentlyPlayed() {
  return (
    <div>
        <div className="grid place-items-center h-screen bg-[#3ABB82] text-white">
                {/* Main Container Body */}
                <div className="mr-2 md:w-[72%] md:h-[90%] w-[95%] h-[98%] lg:h-fit md:rounded-sm bg-white text-black flex" style={{ "box-shadow": " rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px" }}>
                    {/* SideBar */}
                    <Sidebar />

                    <div className="bg-gradient-to-t from-[#ECDBFD] via-[#FCF3F8] to-[#FFEEDE] h-full w-full">
                        This is Recently Played Songs

                    </div>
                </div>
            </div>
        </div>
  )
}

export default RecentlyPlayed
