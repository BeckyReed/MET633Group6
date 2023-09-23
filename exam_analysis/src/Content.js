import './Content.css';
import Tray from './Tray';
import Main from './Main';
import DataPane from './DataPane';


function Content() {
    return (
      <div className="Content">
        <Tray/>
        <Main/>
      </div>
    );
  }
  
export default Content;