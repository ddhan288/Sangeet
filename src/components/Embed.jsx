import { Card, CardActionArea, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

function Embed() {
    const playsongs = useSelector(state => state.APISlice.playsongs);
    const [newSongs, setNewSongs] = useState([{type:'album', uri:'2i0fbrz2Fb19AVpq7vWrfm'}]);
    const [index, setIndex] = useState(0);


    // Split all uris and break it down into two parts 'type' and 'uri'
    useEffect(() => {
        if (playsongs.length > 0) {
            const arr = playsongs.map((item) => {
                const splited = item.uri.split(':');
                return {
                    type: splited[1],
                    uri: splited[2]
                }
            })

            setNewSongs(arr);
            setIndex(0);
        }

    }, [playsongs])

    // useMediaQuerry for dynamic size
    const theme = useTheme();
    const isMidScreen = useMediaQuery(theme.breakpoints.down('lg')); 

    

    // Setting up the embed URL
    var src = `https://open.spotify.com/embed/${newSongs[index].type}/${newSongs[index].uri}?utm_source=oembed`;

    return (
            <div className='md:mb-5 md:pr-3'>
                <p className='ml-1 font-bold text-base mt-1 text-slate-700'>Now Playing</p>
                <Card style={{padding: 0, width: isMidScreen ? "100%" : "480px", height: "288px", marginTop: 25, borderRadius: 10}}>

                    <iframe
                    title='OEmbed' 
                    width="100%"
                    // height={isMidScreen ? "400" : "200"}
                    height="350"
                    style={{"border-radius": "12px", "marginTop": "5px", "opacity": "1"}} 
                    frameborder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    src={src}
                    id='iFrame'
                    className='flex-grow-1'>
                    </iframe>

                </Card>
            </div>

    )
}

export default Embed
