import './DataPane.css';
import ClassData from './ClassData';
import { handleFileAsync } from './scripts/FileHandling';
import { useCallback, useEffect, useState } from 'react';



function classDataList () {

  const className = Object.keys(localStorage);
  const listItems = className.map(className => 
  <ClassData key={className} name={className}/>);
  return listItems;
}


function DataPane() {

  const [classDataShown, setClassDataShown] = useState(classDataList);
  
/* foreceUpdate to update previous uploads list from change in LocalStorage */

  const forceUpdate = useCallback(() => setClassDataShown(classDataList),[]);

   useEffect(() => {
    window.addEventListener('storage',forceUpdate);
    setClassDataShown(classDataList);

    return () => window.removeEventListener('storage',forceUpdate);
    
  }, []) 

  
    return (
      <div className="DataPane">

        <div id="existingData">
          <h3>Previous Uploads</h3>
          <div id="classOptions">
             {classDataShown}
          </div>
        </div>

        <div id="uploadNew">
          <h3>Upload New Data</h3>
          <label for="inputFile">Choose an Excel file to upload</label>
          <input id="inputFile" name="inputFile" type="file" accept=".xlsx"></input>
          <button id="uploadFile" onClick={handleFileAsync}>Upload</button>
        </div>

      </div>
    );
  }
  
export default DataPane;