import React from 'react';
import avatar from '../assets/man.png';
import { FcSearch } from 'react-icons/fc';
import { BsGridFill } from 'react-icons/bs';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSearchSong, setOpenDrawer, setSearch } from '../redux/APISlice';
import { Divider, IconButton, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


const styleMenu = {
  p: 5
}



function Navbar() {
  const [searchInput, setSearchInput] = useState('');
  const token = useSelector(state => state.APISlice.token);
  const status = useSelector(state => state.APISlice.status);
  const error = useSelector(state => state.APISlice.error);
  const market = useSelector(state => state.APISlice.market);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For opening and closing menu. 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  useEffect(() => {
    if (searchInput.length >= 2) {
      dispatch(getSearchSong({ token, searchInput, market, limit: 20 }));
    }
    else
      dispatch(setSearch(null));

  }, [searchInput, market])

  // Logout functionality
  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    navigate("/login");
  }


  return (
    <nav  className='md:ml-8 ml-2 mt-4 flex justify-between md:gap-2 gap-1'>
      {/* left part of navbar */}
      <div className="space-x-3 flex items-center md:gap-2 gap-1 md:hover:cursor-pointer">
        {/* icon button collaps */}
        <div onClick={() => {dispatch(setOpenDrawer(true))}} className='lg:hidden hover:cursor-pointer hover:text-[#F96071] text-slate-700 hover:transition-colors duration-300 ease-in-out'>
          <BsGridFill size={25} />
        </div>

        {/* search box */}
        <div onClick={() => {dispatch(setOpenDrawer(false))}} className='relative lg:w-[500px]'>
          <TextField
            id="input-with-icon-textfield"
            placeholder='Search...'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon  color='warning'/>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size='small'
            color='warning'
            className='lg:w-full'
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/* <input onChange={(e) => setSearchInput(e.target.value)} type="search" name="search" id="src" placeholder='Search...' className='outline-none rounded-md p-1 pl-[40px] lg:w-[90%] w-[100%] lg:text-sm text-base text-gray-500' style={{ "boxShadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }} /> */}
          {/* <FcSearch className='absolute top-[25%] left-[5px]' size={20} /> */}
        </div>

      </div>

      {/* right part of the navbar */}
      <div onClick={() => {dispatch(setOpenDrawer(false))}} className='flex items-center mr-3 gap-2 md:gap-3 w-1/2'>

        {/* Image of user*/}
        <div className='rounded-full border-2 border-white'>
          <img src={avatar} alt="Man" className='object-cover w-8' />
        </div>

        {/* name of the user */}
        <p className='text-xs font-semibold text-neutral-500 whitespace-nowrap overflow-hidden text-ellipsis'>
          {localStorage.getItem("displayName")}
        </p>

        {/* drop down menu for md screen */}
        <div className=''>
          <IconButton onClick={handleClick}>
            <MdOutlineArrowDropDownCircle  size={20} className='text-gray-400 hover:cursor-pointer' />
          </IconButton>
        </div>
        {/* notification bell icon */}
        <i class="hidden md:block lg:ml-80 fa-solid fa-bell ml-1 text-slate-400 hover:cursor-pointer md:ml-40 hover:text-slate-600 hover:transition-colors duration-300 ease-in-out "></i>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={styleMenu}
      >
        <MenuItem onClick={handleClose}>
          <div className='space-x-1 flex text-slate-800'>
            <AccountBoxIcon fontSize='small' />
            <p>Profile</p>
          </div>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <div className='space-x-1 flex text-slate-800'>
            <SettingsIcon fontSize='small' />
            <p>Settings</p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <div className='space-x-1 flex pr-10 text-slate-800'>
            <LogoutIcon fontSize='small' />
            <p onClick={handleLogout}>Logout</p>
          </div>
        </MenuItem>
      </Menu>


    </nav>
  )
}

export default Navbar
