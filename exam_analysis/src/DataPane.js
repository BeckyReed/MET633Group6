import './DataPane.css';



function DataPane() {
    return (
      <div className="DataPane">


        <div id="upload new">
          <h3>Upload New Data</h3>
          <label for="inputFile">Choose an Excel file to upload</label>
          <input id="inputFile" name="inputFile" type="file" accept=".xlsx"></input>
        </div>

      </div>
    );
  }
  
export default DataPane;