import { IconButton } from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { Slider } from '@mui/material';



function Player() {
  return (
    <div className='lg:w-1/2 lg:h-[330px] w-[100%] space-y-3' >
      <p className='font-bold text-base text-slate-700'>Now Playing</p>

      <div className='shadow-md text-[10px] h-[280px] w-[98%] pl-5 bg-white flex flex-col items-center justify-center rounded-xl'>
        <p className='hover:cursor-pointer ml-48 pr-2 mt-2 w-[150px] h-[40px] text-[11px]  text-slate-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>Next -<span className='text-slate-700 '>Rockstar is the house</span></p>

        {/* song info */}
        <div className='w-1/2 p-2'>
          <div className='w-[70px] rounded-lg ml-10 bg-transparent'>
            <img className='object-contain rounded-lg hover:cursor-pointer hover:scale-105 md:hover:transition-transform  duration-300 ease-in-out' src="https://i.scdn.co/image/ab67616d00001e02e2e352d89826aef6dbd5ff8f" alt="pic" style={{"boxShadow": "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"}} />
          </div>

          <p className='whitespace-nowrap overflow-hidden text-ellipsis text-center text-[12px] font-semibold text-slate-700'>Sunflower - Spider-Man: Into the Spider-Verse</p>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis text-center mt-1 font-semibold text-slate-500'>Post Melone</p>

        </div>

        {/* Slider and time */}
        <div>
          <Slider size='small' style={{width: 230, color: '#F96071'}}/>

          <div className='flex justify-between text-slate-400 font-semibold'>
            <span className='pl-1'>0:00</span>
            <span className='pr-1'>0:00</span>
          </div>
        </div>

        {/* Music controller */}
        <div className='w-[200px] flex justify-between items-center gap-2 mt-4 text-sm mb-5 mr-6 text-slate-700'>
          <IconButton>
            <ShuffleIcon fontSize='small' style={{height:25, color: '#F96071'}}/>
          </IconButton>
          <IconButton>
            <SkipPreviousIcon fontSize='small' style={{height:25, color: '#F96071'}}/>
          </IconButton>
          <IconButton>
            <PlayArrowIcon fontSize='small' style={{height:25, color: '#F96071'}}/>
          </IconButton>
          <IconButton>
            <SkipNextIcon fontSize='small' style={{height:25, color: '#F96071'}}/>
          </IconButton>
          <IconButton>
            <RepeatIcon fontSize='small' style={{height:25, color: '#F96071'}}/>
          </IconButton>
        </div>
      </div>


    </div>
  )
}

export default Player
