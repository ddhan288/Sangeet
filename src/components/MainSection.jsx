import React from 'react'
import TopHeadline from './TopHeadline'
import BottomSection from './BottomSection'
import { useDispatch } from 'react-redux'
import { setOpenDrawer } from '../redux/APISlice';


function MainSection() {
  const dispatch = useDispatch();
  return (
    <div onClick={(e) => {dispatch(setOpenDrawer(false))}} className='md:ml-5 lg:ml-8 ml-2 mr-2 mt-7 md:w-[850px] md:h-full w-[400px] space-y-5'>
      <TopHeadline/>
      <BottomSection />
    </div>
  )
}

export default MainSection
