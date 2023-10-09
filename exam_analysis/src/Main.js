import DataPane from './DataPane';
import ChartPane from './ChartPane';
import './Main.css';
import { useState } from 'react';


function Main({contentToMain}) {

  const [chartList, setChartList] = useState([]);
  function toChartPane () {
    setChartList(contentToMain);
    return chartList;
  }



    return (
      <div className="Main">
        {/*<div className="chart">x chart goes here x</div>*/}
        
        <ChartPane toChartPane={toChartPane}/>
        <div className="downloadTray">
            
            <button className="download">Download</button>
        </div>

        {/* <DataPane/> */}
        
      </div>
    );
  }
    
export default Main;