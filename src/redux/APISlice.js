import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAccessToken = createAsyncThunk('accesstoken/fetch', async (CID) => {
    console.log("getAccessToken runn");
    // Check if it stored into database or not and expired or not.
    if (localStorage.hasOwnProperty("token")) {
        const token = JSON.parse(localStorage.getItem("token"));
        const exp = new Date(token.expires_in);
        // console.log(token);
        if (Date.now() < exp)
            return { access_token: token.access_token };
    }

    // Initializing client details.
    const CLIENT_ID = CID === 'admin' ? '3b3c5d0e0dfd45e9a9358944b4d61e6e' : CID;
    const redirectURL = 'http://localhost:3000/login';
    const scopes = [
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-library-read',
        'user-top-read',
        'playlist-modify-public',
        'playlist-modify-private'

    ]

    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${scopes.join("%20")}&redirect_uri=${redirectURL}&show_dialog=false`;


    window.location.href = authorizationUrl;

    return { access_token: null }

})

export const getSearchSong = createAsyncThunk('searchSong/fetch', async (props) => {

    const token = props.token;
    const limit = props.limit;
    const market = props.market;
    const searchInput = props.searchInput;

    var payload = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    const endpoint = 'https://api.spotify.com/v1/search?q=' + searchInput + '&type=album%2Ctrack' + `&market=${market}` + `&limit=${limit}`;
    const res = await fetch(endpoint, payload);

    if (res.ok) {
        // console.log(res);
        return await res.json();
    }
    else
        throw Error(res.statusText);
})




const APISlice = createSlice({
    name: 'APISlice',
    initialState: {
        token: '',
        topsongs: [],
        playsongs: [],
        playlists: [],
        totalPlaylist: 0,

        status: 'idle',
        error: null,
        market: '',
        searchSong: null,
        openDrawer: false
    },

    reducers: {
        loadSong: (state, action) => {
            state.topsongs = action.payload;
        },

        loadPlaySong: (state, action) => {
            state.playsongs = action.payload;
        },

        loadToken: (state, action) => {
            // Check if it stored into database or not and expired or not.
            if (localStorage.hasOwnProperty("token")) {
                const token = JSON.parse(localStorage.getItem("token"));
                const exp = new Date(token.expires_in);
                // console.log(token);
                if (Date.now() < exp && token.access_token !== null)
                    return;
            }

            const urlParams = new URLSearchParams(window.location.href);
            const token = urlParams.get('http://localhost:3000/login#access_token');

            const data = {
                access_token: token,
                expires_in: Date.now() + 3600000
            }

            state.token = data.access_token;
            state.status = 'success';

            // Store it to the localstorage.
            localStorage.setItem('token', JSON.stringify(data));
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },


        setMarket: (state, action) => {
            state.market = action.payload;
        },

        setSearch: (state, action) => {
            state.searchSong = action.payload;
        },

        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },

        setTotalPlaylist: (state, action) => {
            state.totalPlaylist = state.totalPlaylist + 1;
        },

        setOpenDrawer: (state, action) => {
            state.openDrawer = action.payload;
        }

    },

    extraReducers: (builder) => {
        builder.addCase(getSearchSong.fulfilled, (state, action) => {
            console.log(action.payload);
            state.searchSong = action.payload;
            state.status = 'success';

        }).addCase(getSearchSong.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;

        }).addCase(getAccessToken.pending, (state, action) => {
            state.status = 'loading';

        }).addCase(getAccessToken.fulfilled, (state, action) => {
            const data = {
                access_token: action.payload.access_token,
                expires_in: Date.now() + 3600000
            }

            state.token = data.access_token;
            state.status = 'success';

            // Store it to the localstorage.
            localStorage.setItem('token', JSON.stringify(data));


        }).addCase(getAccessToken.rejected, (state, action) => {
            state.status = 'rejected';
        
        })
    }
})



export default APISlice.reducer;
export const { loadSong, setMarket, setSearch, loadToken, setToken, loadPlaySong, setPlaylists, setTotalPlaylist, setOpenDrawer } = APISlice.actions;