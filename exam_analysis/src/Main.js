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

        <ChartPane toChartPane={toChartPane}/>
        <div className="downloadTray">
            
            <button className="download">Download</button>
        </div>
        
      </div>
    );
  }
    
export default Main;