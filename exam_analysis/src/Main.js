import DataPane from './DataPane';
import ChartPane from './ChartPane';
import './Main.css';


function Main() {
    return (
      <div className="Main">
        <div className="chart">x chart goes here x</div>
        <ChartPane/>
        <div className="downloadTray">
            
            <button className="download">Download</button>
        </div>

        {/* <DataPane/> */}
        
      </div>
    );
  }
  
export default Main;