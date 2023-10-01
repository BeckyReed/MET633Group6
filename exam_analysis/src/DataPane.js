import './DataPane.css';
import ClassData from './ClassData';
import { handleFileAsync } from './scripts/FileHandling';
import { useCallback, useEffect, useState } from 'react';


/**Funciton to make buttons for classes listed in Localstorage */
/*  function classDataList () {

  const className = Object.keys(localStorage);
  const listItems = className.map(className => 
  <ClassData key={className} name={className} classSelectedToggle={classSelectedToggle}/>);
  return listItems;
} */
 
/**Function to set list of classes selected and not*/
/* function classSelectList () {
  const className = Object.keys(localStorage);
  const listItems = new Map();
  className.forEach((element) => listItems.set(element, false));
  console.log(`class select map: ` + listItems);
}

function classSelectedToggle (childClickSelected) {
  setClassSelected(childClickSelected);
} */


function DataPane({selctedToContent}) {

  const [classDataShown, setClassDataShown] = useState(classDataList);
  const [classList, setClassList] = useState(classSelectList);
  //const [classSelected, setClassSelected] = useState(false);

/**Funciton to make buttons for classes listed in Localstorage */
function classDataList () {

  const className = Object.keys(localStorage);
  const listItems = className.map(className => 
  <ClassData key={className} name={className} classSelectedToggle={classSelectedToggle}/>);
  return listItems;
}
 
/**Function to set list of classes selected and not*/
function classSelectList () {
  const className = Object.keys(localStorage);
  const listItems = new Map();
  className.forEach((element) => listItems.set(element, false));
  console.log(`class select map: ` + listItems);
  return listItems;
}

function classSelectedToggle (childClickSelected) {
  let keyLable = childClickSelected.name;
  console.log(`keyLable: ` + keyLable);
  let value = childClickSelected.value;
  console.log(`value: `+ value);
  console.log(`toggle class list map1: `+ [...classList.entries()]);
  setClassList(
    new Map(classList.set(keyLable, value))
  ); 
  console.log(`toggle class list map2: `+[...classList.entries()]);
  selctedToContent(classList);
}



/* foreceUpdate to update previous uploads list from change in LocalStorage */

  const forceUpdateDataShown = useCallback(() => setClassDataShown(classDataList),[]);
   useEffect(() => {
    window.addEventListener('storage',forceUpdateDataShown);
    setClassDataShown(classDataList);
    return () => window.removeEventListener('storage',forceUpdateDataShown);    
  }, []) 

  /* foreceUpdate to update previous uploads list from change in LocalStorage */

  const forceUpdateSelectList = useCallback(() => setClassList(classSelectList),[]);
   useEffect(() => {
    window.addEventListener('storage',forceUpdateSelectList);
    setClassList(classSelectList);
    return () => window.removeEventListener('storage',forceUpdateSelectList);   
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