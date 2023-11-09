import './App.css';
import Content from './Content';
import Header from './Header';
import Auth from './Auth';
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';

export function AddLibrary(libraryURL) {
  const script = document.createElement('script');
  script.src = libraryURL;
  script.async = true;
  document.body.appendChild(script);
}


function App() {

  /*   const [backendData, setBackendData] = useState([{}]);
  
    useEffect(() => {
      fetch("/api").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
    }, []); */

  const [cookies, setCookie, removeCookie] = useCookies(null);

  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;

  




  return (
    <div className="App">
      <Header />
      {!authToken && <Auth/>}
      {authToken &&
        <div>
          {AddLibrary("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js")}
          {AddLibrary("https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js")}

          <Content />
        </div>
      }


    </div>
  );
}

export default App;


