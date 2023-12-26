import React, { useEffect, useRef, useState } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SongCard from './SongCard';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { ArrowCircleUp } from '@mui/icons-material';


function Queue() {
  const token = useSelector(state => state.APISlice.token);
  const totalPlaylist = useSelector((state) => state.APISlice.totalPlaylist);
  const [mostPlayed, setMostPlayed] = useState([]);
  const [isDown, setIsDown] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const scrollContainerRef = useRef(null);

  const scrollToLastElement = () => {
    if (scrollContainerRef.current && isDown) {
      const scrollContainer = scrollContainerRef.current;
      const lastElement = scrollContainer.lastElementChild;
      lastElement.scrollIntoView({ behavior: 'smooth' });
      setIsDown(false);
    }
    else {
      const scrollContainer = scrollContainerRef.current;
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsDown(true);
    }
  };

  async function mostPlaySongs() {
    var payload = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const endpoint = 'https://api.spotify.com/v1/me/top/tracks?limit=50';

    const res = await fetch(endpoint, payload);
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      if (mostPlayed.length === 0)
        setMostPlayed(data.items.reverse());
    }
    else {
      alert(res.statusText);
      localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // navigate("/login");
    }

  }

  async function getUserPlaylist() {
    var payload = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }

    const endpoint = 'https://api.spotify.com/v1/me/playlists?limit=20';
    const res = await fetch(endpoint, payload);
    if (res.ok) {
      const data = await res.json();
      setPlaylists(data.items);
    }
    else {
      alert(res.statusText);
    }

  }


  useEffect(() => {
    if (token !== ''){
      mostPlaySongs();
      getUserPlaylist();
    }
  }, [totalPlaylist, mostPlayed])

  // console.log("total playlists: ", totalPlaylist);

  return (
    <div className='lg:w-[85%] md:w-[100%] space-y-3 mb-3'>
      {/* Top section */}
      <div className='flex justify-between items-center gap-5'>
        <p className='ml-1 font-bold text-base text-slate-700'>Mostly Played</p>

        <div className='flex gap-2 items-center text-[12px] text-slate-400 font-semibold'>
          <p className='hover:cursor-pointer'>{`${mostPlayed.length} songs on the list`}</p>
          <IconButton>
            {isDown ? <ArrowCircleDownIcon onClick={scrollToLastElement} className='text-slate-600' fontSize='small' /> : <ArrowCircleUp onClick={scrollToLastElement} className='text-slate-600' fontSize='small' />}


          </IconButton>
        </div>

      </div>

      {/* Bottom section MUI papers */}
      <div ref={scrollContainerRef} className='scroll-container h-[305px] overflow-y-scroll space-y-3 p-1' style={{ "scrollbarWidth": "thin", "scrollbarColor": "transparent transparent" }}>
        {mostPlayed.map((item, index) => <SongCard key={index} id={index + 1} name={item.name} pic={item.album.images[0].url} duration={item.duration_ms} isPlaying={true} uri={item} type={item.type} playlist={playlists} />)}
      </div>
    </div>
  )
}

export default Queue
