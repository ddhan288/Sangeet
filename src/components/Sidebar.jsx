import React, { useEffect, useState } from 'react';
import { FaHome, FaFolderOpen } from 'react-icons/fa';
import { BiGridAlt } from 'react-icons/bi';
import { BsFillPersonFill, BsFillCameraVideoFill, BsFillFileEarmarkMusicFill } from 'react-icons/bs';
import { MdTimer } from 'react-icons/md';
import { Avatar, Box, Button, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListItemButton, Modal, Switch, TextField, Tooltip, Typography, useMediaQuery } from '@mui/material';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadPlaySong, setOpenDrawer, setTotalPlaylist } from '../redux/APISlice';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};



function Sidebar() {
    const token = useSelector(state => state.APISlice.token);
    const status = useSelector((state) => state.APISlice.status);
    const totalPlaylist = useSelector((state) => state.APISlice.totalPlaylist);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const dispatch = useDispatch();
    const [createPlaylistData, setCreatePlaylistData] = useState({
        name: '',
        desc: '',
        public: false
    });
    const [err, setErr] = useState(false);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    async function getCurrentUserSavedSong() {
        var payload = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const endpoint = 'https://api.spotify.com/v1/me/tracks';

        const res = await fetch(endpoint, payload);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
        }
        else {
            alert(res.statusText);
            navigate("/login");
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
            // navigate("/login");
        }

    }

    async function getUserID() {
        var payload = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }

        const endpoint = 'https://api.spotify.com/v1/me';

        const res = await fetch(endpoint, payload);

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            return data.id;
        }
        else {
            alert(res.statusText);
            return '';
        }
    }

    async function createPlaylist(user_id) {
        var payload = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify({
                name: createPlaylistData.name,
                description: createPlaylistData.desc,
                public: createPlaylistData.public
            })
        }

        const endpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;

        const res = await fetch(endpoint, payload);

        dispatch(setTotalPlaylist());
        alert(res.statusText);

    }

    // For getting the input and make the data.
    function handleChange(e) {
        if (e.target.id === 'name') {
            setErr(false);
            setCreatePlaylistData((prev) => {
                return { ...prev, name: e.target.value }
            })

        } else if (e.target.id === 'desc') {
            setCreatePlaylistData((prev) => {
                return { ...prev, desc: e.target.value }
            })

        } else {
            setCreatePlaylistData((prev) => {
                return { ...prev, public: e.target.checked }
            })
        }
    }

    const handleClose = async () => {
        if (createPlaylistData.name === '') {
            document.getElementById('name').focus();
            setErr(true);
            return;
        }
        setCreatePlaylistData({
            name: '',
            desc: '',
            public: false
        })

        const user_id = await getUserID();
        createPlaylist(user_id);

        setOpen(false);
        setErr(false);
    }


    useEffect(() => {
        if (status === 'success') {
            getUserPlaylist();
        }
    }, [status, totalPlaylist])



    const theme = useTheme();
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));
    const openDrawer = useSelector(state => state.APISlice.openDrawer);
    




    return (


        <section className= {`lg:w-[19%] p-5 text-xs font-semibold lg:block ${isMidScreen && openDrawer ? 'fixed' : 'hidden'} md:top-0 md:left-0 bg-white md:w-fit ${isMidScreen && 'z-30'}`} >
            
            {isMidScreen && <IconButton onClick={(e) => {dispatch(setOpenDrawer(false))}} className='fixed -top-4 left-36'>
                <CloseIcon fontSize='small'/>
            </IconButton>}
            {/* Top Menu */}
            <div className='space-y-3 mb-10'>
                <div onClick={() => navigate("/home")} className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out '>
                    <FaHome size={20} />
                    <p>Home</p>
                </div>

                <div className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <BiGridAlt size={20} />
                    <p>Browse</p>
                </div>

                <div className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <FaFolderOpen size={20} />
                    <p>Album</p>
                </div>
                <div className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <BsFillPersonFill size={20} />
                    <p>Artist</p>
                </div>
                <div className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <BsFillCameraVideoFill size={20} />
                    <p>Video</p>
                </div>
            </div>

            {/* Middle Menu */}
            <div className='space-y-4 mb-10'>
                <h4 className=' text-gray-500 text-[15px] font-semibold mb-3'>MY MUSIC</h4>
                <div onClick={() => navigate("/recent")} className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <MdTimer size={20} style={{ "color": "inherit" }} />
                    <p>Recently Played</p>
                </div>
                <div className='sidebtn flex items-center gap-3 hover:text-[#F96071] hover:cursor-pointer md:hover:transition-colors duration-300 ease-in-out'>
                    <BsFillFileEarmarkMusicFill size={20} />
                    <p>Local Files</p>

                </div>

            </div>

            {/* Playlist */}
            <div className=''>
                <div className='flex justify-between'>
                    <h4 className=' text-gray-500 text-[15px] font-semibold mt-2 '>PLAYLIST</h4>
                    <Tooltip title='Create new playlist' placement='top'>

                        <IconButton size="small" aria-label="add" className='text-slate-800'>
                            <AddIcon onClick={handleOpen} />
                        </IconButton >
                    </Tooltip>
                </div>

                <div className=' scroll-container w-[180px] hover:cursor-pointer font-semibold text-[13px] overflow-y-scroll h-[270px]' style={{scrollbarWidth: "none"}}>

                    {/* All available playlists of current user */}
                    {playlists.map((item, ind) => {
                        return <List key={ind} >
                            <ListItem disablePadding >
                                <ListItemButton style={{ display: 'flex', justifyContent: 'space-between', padding: 1, paddingTop: 2, paddingBottom: 2 }}>
                                    <div className='flex justify-center items-center gap-2'>
                                        <Avatar variant='square' style={{ width: 32, height: 32 }} src={item.images.length !== 0 ? item.images[0].url : ''}>

                                        </Avatar>
                                        <p>{item.name}</p>
                                    </div>
                                    <Tooltip title="Play songs" placement='top'>
                                        <PlaylistPlayIcon onClick={() => dispatch(loadPlaySong([item]))} />
                                    </Tooltip>
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    })}

                </div>
            </div>

            {/* Create new playlist Modal */}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setCreatePlaylistData({
                        name: '',
                        desc: '',
                        public: false
                    });
                    setErr(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='space-y-3'>
                    <p className='text-center mb-3 font-bold text-slate-700'>Create New Playlist</p>
                    <TextField id='name' onChange={handleChange} label="Playlist Name" variant="outlined" color={err ? 'error' : 'success'} size='small' style={{ width: "100%" }} helperText={err ? 'Atleast give it a name.' : ''} />
                    <TextField id='desc' onChange={handleChange} label="Description" variant="outlined" color='success' multiline style={{ width: "100%" }} />
                    <FormControlLabel className='text-slate-700' control={<Switch id='check' color='success' onChange={handleChange} />} label={createPlaylistData.public ? 'Public' : 'Private'} />
                    <Button onClick={handleClose} className='float-right' color='success' size='small' variant="outlined">create</Button>
                </Box>
            </Modal>
        </section>

    )
}

export default Sidebar
