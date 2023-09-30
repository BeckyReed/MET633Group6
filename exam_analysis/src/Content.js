import { useState } from 'react';
import './Content.css';
import Tray from './Tray';
import Main from './Main';
import DataPane from './DataPane';


function Content() {

  const [showingGetData, setShowingGetData] = useState(false);

  

    return (
      <div className="Content">
        <Tray isShowingGetData={showingGetData} onClickGetData={() => setShowingGetData(!showingGetData)}/>

        {showingGetData ? <DataPane /> : null}

        <Main/>
      </div>
    );
  }
  
export default Content;