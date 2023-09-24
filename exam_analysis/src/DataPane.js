import './DataPane.css';
import ClassData from './ClassData';
import { handleFileAsync } from './scripts/FileHandling';



function DataPane() {
    return (
      <div className="DataPane">

        <div id="existingData">
          <h3>Previous Uploads</h3>
          <ul id="classOptions">
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
              <ClassData/>
          </ul>
        </div>

        <div id="uploadNew">
          <h3>Upload New Data</h3>
          <label for="inputFile">Choose an Excel file to upload</label>
          <input id="inputFile" name="inputFile" type="file" accept=".xlsx, .csv"></input>
          <button id="uploadFile" onClick={handleFileAsync}>Upload</button>
        </div>

      </div>
    );
  }
  
export default DataPane;