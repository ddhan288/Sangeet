import { Tooltip, Modal, Box, Typography, Card, CardMedia, Button, CardContent, CardActions, IconButton, Menu, MenuItem, Snackbar, Alert, Icon } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaySong, loadSong } from "../redux/APISlice";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import AlbumIcon from '@mui/icons-material/Album';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

function ArtistCard(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.APISlice.token);


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [alertopen, setAlertOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const alertclose = () => {
    setAlertOpen(false);
  }

  const handleCloseMenu = async (id) => {
    var payload = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        uris: [
          props.uri.uri
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




  return (
    <div className='space-y-3 w-[180px]'>
      {/* Image div */}
      <div className='rounded-lg w-[85px] hover:cursor-pointer bg-transparent'>
        <img onClick={handleOpen} className='object-contain rounded-lg hover:shadow-xl hover:scale-105 md:hover:transition-transform  duration-300 ease-in-out ' src={props.cover} alt="coverart" />
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-full h-full">
            {/* <img src={props.cover} alt="fullcover" className="object-contain w-full h-full" /> */}
            <Card>
              <CardMedia
                component="img"
                alt="green iguana"
                height="100"
                style={{ objectFit: 'contain', borderRadius: 0 }}
                image={props.cover}
              />
              <CardContent>
                <p>
                  {props.name}
                </p>
                <Typography variant="body2" color="text.secondary">
                  {props.artist}
                </Typography>
              
              </CardContent>
              <CardActions>
                <Button onClick={() => { dispatch(loadPlaySong([props.uri])); handleClose(); }} variant="contained" color="secondary" size="small">Play</Button>
                <Button onClick={() => window.open(props.uri.external_urls.spotify, '_blank')} variant="contained" color="secondary" size="small">Open in Spotify</Button>
                {props.type === 'track' &&
                  <Tooltip title="Add to a playlist" placement="top">
                    <IconButton onClick={handleClick}>
                      <PlaylistAddIcon />
                    </IconButton>
                  </Tooltip>
                }
              </CardActions>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {props.playlists.map((item, id) => {
                  return <MenuItem key={id} onClick={() => handleCloseMenu(item.id, item.name)}>{item.name}</MenuItem>
                })}

              </Menu>

            </Card>


          </div>
        </Box>
      </Modal>


      {/* Album name and Artist name  div*/}
      <div className='space-y-1 w-[120px]'>
        <Tooltip title={props.name}>
          <h1 className='text-[12px] font-bold whitespace-nowrap overflow-hidden text-ellipsis hover:cursor-default'>{props.name}</h1>
        </Tooltip>
        
        <div className="flex gap-5 items-center">
        <Tooltip title={props.artist}>
          <p className='text-[11px] font-semibold text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis hover:cursor-default'>{props.artist}</p>
        </Tooltip>

        {props.type === "track" ? 
        <AudiotrackIcon fontSize="small" style={{width: 17}} className="text-slate-500"/> : 
        <AlbumIcon fontSize="small" style={{width: 17}} className="text-slate-500"/>}
        
        </div>
      </div>

      <Snackbar open={alertopen} autoHideDuration={6000} onClose={alertclose} >
        <Alert onClose={alertclose} severity="success" sx={{ width: '100%' }}>
          {`Song added to playlist`}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ArtistCard
