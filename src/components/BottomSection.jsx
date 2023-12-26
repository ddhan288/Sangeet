import React, { useEffect, useState } from 'react'
import Queue from './Queue'
import Embed from './Embed'
import { useSelector } from 'react-redux';

function BottomSection() {
  return (
    <div className='lg:flex gap-5 lg:pb-3'>
      {/* Player */}
      {/* <Player /> */}
      <Embed/>
      {/* Mostly Played */}
      <Queue />
    </div>
  )
}

export default BottomSection
