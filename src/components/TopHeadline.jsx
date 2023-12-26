import React, { useRef, useEffect, useState } from 'react';
import ArtistCard from './ArtistCard';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem, Tooltip, Snackbar, Alert } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { loadSong, setMarket } from '../redux/APISlice';
import { useNavigate } from 'react-router-dom';

function TopHeadline() {
    const token = useSelector((state) => state.APISlice.token);
    const status = useSelector((state) => state.APISlice.status);
    const totalPlaylist = useSelector((state) => state.APISlice.totalPlaylist);
    const searchSong = useSelector((state) => state.APISlice.searchSong);
    const [search, setSearch] = useState([]);
    const [newAlbum, setNewAlbum] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        if (searchSong !== null) {
            setSearch([...searchSong.tracks.items.slice(0, 10), ...searchSong.albums.items.slice(0, 10)]);
        } else
            setSearch(null);
    }, [searchSong])


    // Check if token is expired or not, If yes then get new token.
    useEffect(() => {
        const checkToken = () => {
            if (localStorage.hasOwnProperty("token")) {
                const token = JSON.parse(localStorage.getItem("token"));
                const exp = new Date(token.expires_in);
                if (Date.now() >= exp) {
                    localStorage.removeItem("token");
                }
            }
        }

        return () => {
            checkToken();
        }

    }, [])

    // get new release albums according to the market.
    async function getNewRelease(token, market, limit) {

        var payload = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const endpoint = 'https://api.spotify.com/v1/browse/new-releases' + `?country=${market}` + `&limit=${limit}`;

        const res = await fetch(endpoint, payload);

        if (res.ok) {
            const data = await res.json();
            setNewAlbum(data.albums.items);
            dispatch(loadSong(data.albums.items));
        }
        else {
            // alert(res.statusText);
            localStorage.removeItem('token');
            // localStorage.removeItem('user');
            navigate("/login");
        }

    }

    // Call api new release whenever the dependency 'filter' changes.
    const [filter, setFilter] = useState({ market: 'IN', limit: 20 });

    useEffect(() => {

        if (status === 'success') {
            getNewRelease(token, filter.market, filter.limit);
            dispatch(setMarket(filter.market));
        }

    }, [filter, status])



    // for handeling smooth scroll behaviour.
    const scrollRef = useRef(null);

    function handleScroll(direction, amount) {
        const content = scrollRef.current;

        const scrollAmount = direction === 'left' ? -amount : amount;
        content.scrollBy({
            left: scrollAmount,
            behavior: 'smooth',
        });

    }

    // For opening the menu for market location.
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setFilter(prev => {
            return { ...prev, market: event.currentTarget.innerText }
        })
        setAnchorEl(null);
    };
    //
    

    const [playlists, setPlaylists] = useState([]);

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
        if (token !== '')
            getUserPlaylist();
    }, [token, totalPlaylist])



    return (
        <section className='space-y-3 w-full lg:w-[1200px]'>
            {/* Top bar */}
            <div className='flex justify-between'>
                <div className='flex gap-5 items-center'>
                    <h1 className='font-bold text-slate-700'>{`New Release (${filter.market})`}</h1>
                    <IconButton style={{ 'marginLeft': -20, 'fontSize': 10 }}>
                        <PlaceIcon
                            fontSize='small'
                            style={{ 'fontSize': 20 }}
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} />

                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >

                        <Tooltip title={"United State"} placement="right">
                            <MenuItem onClick={handleClose}>
                                US
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="India" placement="right">
                            <MenuItem onClick={handleClose}>
                                IN
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="Japan" placement="right">
                            <MenuItem onClick={handleClose}>
                                JP
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="East Spain" placement="right">
                            <MenuItem onClick={handleClose}>
                                ES
                            </MenuItem>
                        </Tooltip>
                        <Tooltip title="Korea" placement="right">
                            <MenuItem onClick={handleClose}>
                                KR
                            </MenuItem>
                        </Tooltip>
                    </Menu>

                    <p className='text-[11px] font-semibold text-gray-500'>{`- Top ${search === null ? newAlbum.length : search.length}`}</p>
                </div>

                <div className='md:flex gap-5 items-center mr-5 hidden'>
                    <span className='bg-white pl-2 pr-2 rounded-lg shadow-xl'>
                        <i onDoubleClick={() => handleScroll('left', 600)} onClick={() => handleScroll('left', 200)} className="fa-solid fa-arrow-left hover:cursor-pointer text-slate-500 hover:text-[#F96071] md:hover:transition-colors duration-300 ease-in-out"></i>
                    </span>
                    <span className='bg-white pl-2 pr-2 rounded-lg shadow-xl'>
                        <i onDoubleClick={() => handleScroll('right', 600)} onClick={() => handleScroll('right', 200)} className="fa-solid fa-arrow-right hover:cursor-pointer text-slate-500 hover:text-[#F96071] md:hover:transition-colors duration-300 ease-in-out"></i>
                    </span>
                </div>
            </div>

            {/* Bottom Artist Cards */}
            <div ref={scrollRef} className='scroll-container md:flex md:h-fit md:w-full md:flex-nowrap flex gap-5 overflow-x-scroll pt-2 pl-6 pr-2 rounded-md' style={{ "scrollbarWidth": "thin", "scrollbarColor": "transparent transparent"}}>
                {search === null ? newAlbum.map((item, ind) => {
                    return <ArtistCard cover={item.images.length === 0 ? 'https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : item.images[0].url} name={item.name} artist={item.artists[0].name} key={ind} uri={item} type={item.type} playlists={playlists} />

                }) : search.map((item, ind) => {
                    return <ArtistCard cover={(item.type === 'track' && item.album.images.length === 0) || (item.type === 'album' && item.images.length === 0) ? 'https://images.pexels.com/photos/2746823/pexels-photo-2746823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : item.type === 'album' ? item.images[0].url : item.album.images[0].url} name={item.name} artist={item.artists[0].name} key={ind} uri={item} type={item.type} playlists={playlists} />
                })
                }
            </div>

        </section>
    )
}

export default TopHeadline
