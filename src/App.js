import './App.css';
import Login from './Login.js'
import React, {useEffect, useState} from "react";
import {getTokenFromUrl} from './spotify';
import SpotifyWebApi from "spotify-web-api-js"; 
import Player from './Player'
import {useDataLayerValue} from './DataLayer'

const spotify= new SpotifyWebApi();

function App() {

  const [token, setToken] = useState(null);
const [{}, dispatch] = useDataLayerValue();

useEffect(()=>{
   const hash = getTokenFromUrl();
   window.location.hash="";
   const _token = hash.access_token;
   if(_token){
     setToken(_token)
     spotify.setAccessToken(_token)
     spotify.getMe().then(user=>{
       console.log(user);
       dispatch({
         type: 'SET_USER',
         user: user,
         
       })

     })
   }
   console.log('I HAVE A TOKEN>>>>>>', _token);
},[]);




  return (
    <div className="App">
      {
        token ? (
        <Player />) :
        (     <Login />
          )
      }
    </div>
  );
}

export default App;
