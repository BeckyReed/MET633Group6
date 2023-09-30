import './Tray.css';
import React, {useState} from 'react';


function Tray({isShowingGetData, onClickGetData}) {

    return (
      <div className="Tray">
        <button className="getData" onClick={onClickGetData}>Get Data {isShowingGetData ? '<<' : '>>'}</button>
      </div>
    );
  }
  
export default Tray;