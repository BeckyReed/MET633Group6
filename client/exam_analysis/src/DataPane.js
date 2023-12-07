import './DataPane.css';
import ClassData from './ClassData';
import { handleFileAsync, handleTemplateDownload } from './scripts/FileHandling';
import { useEffect, useState } from 'react';


function DataPane({ selctedToContent, examsToContent }) {

  /**DATABASE WORK FOR DATA */
  /**USER ID FROM DB */
  const [userID, setUserID] = useState(1);

  /**CLASS LIST FROM DB */
  const [classesShown, setClassesShown] = useState([]);
  /**LIST OF SELECTED CLASSES */
  const [classListDB, setClassListDB] = useState(classSelectListDB);

  /**EXAM LIST FROM DB */
  const [examsList, setExamsList] = useState([]);


  //TEST GET DATA CLASSES
  async function getClassData ()  {
    try {
      console.log(`### getClassData Async Call to DB ###`);
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/classes/${userID}`);
      const json = await response.json();
      console.log(`### JSON from getClassData Async Call to DB ${json}`);
      setClassesShown(json);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getClassData();
    console.log(`### use effect getClassData_ ${JSON.stringify([...classesShown])}`);
  }, []);

  console.log(classesShown);

  /**Function to set list of classes selected or not (FROM DB)*/
  function classSelectListDB() {
    const listItems = new Map();
    classesShown?.forEach((element) => listItems.set(element, false));
    console.log(`### class select map: `+ [...listItems.entries()]);
    return listItems;
  }



  //get Exam Data JSON
  async function getExamData(courseName) {

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/exams/${courseName}`);

      const json = await response.json();
      console.log(`getExamData: JSON:: ${JSON.stringify(json)}`);
      console.log(json);

      console.log(`CHART PANE EXAMS GET DATA : ${courseName}  :: ${json}`);
      console.log(json);

      return json;

    } catch (err) {
      console.log(err);
    }


  }


  async function classSelectedToggleDB(childClickSelected) {
    let keyLable = childClickSelected.name;
    console.log(`keyLable: ` + keyLable);

    let value = childClickSelected.value;
    console.log(`value: ` + value);

    console.log(`toggle class list map1: ` + [...classListDB.entries()]);
    setClassListDB(
      new Map(classListDB.set(keyLable, value))
    );
    console.log(`toggle class list map2: ` + [...classListDB.entries()]);

    let exams = await getExamData(childClickSelected.courseName);
    setExamsList([...await exams]);
    
    console.log(`exams: ${JSON.stringify(exams)}` );
    
  }

  useEffect(() => {
    console.log(`use effect exams DP_ ${JSON.stringify(...examsList)}`);
    examsToContent(examsList);
  }, [examsList]);

  useEffect(() => {
    console.log(`use effect selected DP_ ${classListDB}`);
    selctedToContent(classListDB);
  }, [classListDB]);



  return (
    <div className="DataPane">

      <div id="existingData">
        <h3>Previous Uploads</h3>
        <div id="classOptionsDB">
          {classesShown?.map(classShown =>
            <ClassData key={classShown.class_name} className={classShown.class_name} name={`${classShown.course_number}${classShown.semester}${classShown.class_year}`} classSelectedToggleDB={classSelectedToggleDB} />)}
        </div>
      </div>

      <div id="uploadNew">
        <h3>Upload New Data</h3>

        <button id="downloadTemplate" onClick={handleTemplateDownload}>Download Excel Template</button>

        <br/>
        <label for="inputFile">Choose a completed Excel Template to upload new data.</label>
        <input id="inputFile" name="inputFile" type="file" accept=".xlsx"></input>
        <button id="uploadFile" onClick={() => handleFileAsync(userID)}>Upload File</button>
      </div>

    </div>
  );
}

export default DataPane;