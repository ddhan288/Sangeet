import { Alert, Avatar, IconButton, Menu, MenuItem, Paper, Snackbar, Tooltip } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaySong } from '../redux/APISlice';

function SongCard({ id, name, artist, duration, pic, isPlaying, uri, type, playlist }) {
    const [status, setStatus] = useState(isPlaying);
    const token = useSelector(state => state.APISlice.token);

    const [anchorEl, setAnchorEl] = useState(null);
    const [alertopen, setAlertOpen] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const alertclose = () => {
        setAlertOpen(false);
    }

    const handleClose = async (id, name) => {
        var payload = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                uris: [
                    uri.uri
                ],
                position: 0
            })
        }

        const endpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`;
        const res = await fetch(endpoint, payload);
        if (res.ok) {
            setAlertOpen(true);
        }
        else {
            alert(res.statusText);
        }

        setAnchorEl(null);
    };
    const dispatch = useDispatch();



    var minutes = Math.floor(duration / (1000 * 60));
    var seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return (
        <div>
            <Paper elevation={1} style={{ height: 62, padding: 5, width: '100%', display: 'flex', alignItems: 'center' }} className='hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out hover:bg-gray-100 flex items-center gap-2'>
                <p className='text-[12px] font-semibold text-slate-700'>{id.toString().padStart(2, '0')}</p>

                <Avatar sizes='small' variant='rounded' src={pic}></Avatar>
                <Tooltip title={name} placement='top' >
                    <p className='w-full text-[13px] font-semibold text-slate-800 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</p>
                </Tooltip>

                <p className='text-[11px] ml-10 font-semibold text-slate-400'>{`${minutes.toString().padStart(2, 0)}:${seconds.toString().padEnd(2, 0)}`}</p>

                <div className='text-slate-600 ml-10 pr-2' onClick={() => { setStatus(prev => !prev) }}>

                    {status ? <IconButton><PlayCircleOutlineIcon onClick={() => dispatch(loadPlaySong([uri]))} fontSize='small' /></IconButton> : <div className='w-[25px] ml-2 -mt-2 mr-1'> <img className='object-contain' src="https://media.tenor.com/g2q5VyGBJPcAAAAi/musica-music.gif" alt="gif" /> </div>}

                </div>
                {type === 'track' &&
                    <Tooltip title="Add to a playlist" placement="top">
                        <IconButton onClick={handleClick}>
                            <PlaylistAddIcon fontSize='small'  />
                        </IconButton>
                    </Tooltip>
                }
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {playlist.map((item, id) => {
                        return <MenuItem key={id} onClick={() => handleClose(item.id, item.name)}>{item.name}</MenuItem>
                    })}

                </Menu>
            </Paper>
            <Snackbar open={alertopen} autoHideDuration={6000} onClose={alertclose} >
                <Alert onClose={alertclose} severity="success" sx={{ width: '100%' }}>
                    {`Song added to playlist`}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SongCard
