import './DataPane.css';
import ClassData from './ClassData';
import { handleFileAsync, handleTemplateDownload } from './scripts/FileHandling';
import { useCallback, useEffect, useState } from 'react';


function DataPane({ selctedToContent, examsToContent }) {

  /**DATABASE WORK FOR DATA */
  /**USER ID FROM DB */
  const [userID, setUserID] = useState(1);

  /**CLASS LIST FROM DB */
  const [classesShown, setClassesShown] = useState(null);
  /**LIST OF SELECTED CLASSES */
  const [classListDB, setClassListDB] = useState(classSelectListDB);

  /**EXAM LIST FROM DB */
  const [examsList, setExamsList] = useState([]);

  //TEST GET DATA CLASSES
  const getClassData = async () => {
    //const userId = 1;
    try {
      console.log(`### getClassData Async Call to DB ###`);
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/classes/${userID}`);
      const json = await response.json();
      console.log(json);
      setClassesShown(json);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => getClassData, []);
  console.log(classesShown);

  //TEST GET DATA EXAMS
  /*   const getExamData = async () => {
      //TEST
      const classId = "CS633SPRING2020";
      try {
        const response = await fetch(`http://localhost:4000/exams/${classId}`);
        const json = await response.json();
        console.log(json);
        setExams(json);
      } catch (err) {
        console.log(err);
      }
    }
    useEffect(() => getExamData, []);
    console.log(exams) */

  /**DATABASE WORKING WITH RETURN FOR CLASSES*/
  /**Funciton to make buttons for classes listed FROM DB */
  /*   function classDataListDB() {
    const className = classesShown;
    const listItems = className.map(className =>
      <ClassData key={className} name={`${className.course_number}${className.semester}${className.class_year}`} classSelectedToggleDB={false} />);
    return listItems;
  } */

  /**Function to set list of classes selected or not (FROM DB)*/
  function classSelectListDB() {
    const listItems = new Map();
    classesShown?.forEach((element) => listItems.set(element, false));
    console.log(`class select map: ` + listItems);
    return listItems;
  }


  //get Exam Data JSON
  async function getExamData(courseName) {

    //TEST HARD VALUE
    //const className = "CS633SPRING2020";

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/exams/${courseName}`);

      const json = await response.json();
      console.log(`getExamData: JSON:: ${JSON.stringify(json)}`);
      console.log(json);

      //setExamData(examData.push(json));


      console.log(`CHART PANE EXAMS GET DATA : ${courseName}  :: ${json}`);
      console.log(json);

      // console.log(`select exam list array1: ${examsList}`);
      // setExamsList([...json]);
      // console.log(`select exam list array2:  ${examsList}`);

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

    //selctedToContent(classListDB);


    //console.log(`select exam list array1: ${examsList}`);
    //console.log(`select exam list array Exams: ${exams}`);

    /**WORKING NOW ? */
    //setExamsList([...exams]);
    
    // let existingExams = examsList.push(exams);
    // setExamsList(existingExams);


    //console.log(`select exam list array2:  ${examsList}`);



    let exams = await getExamData(childClickSelected.courseName);
    setExamsList([...await exams]);
    //console.log(`exams list: ${JSON.stringify(...examsList)}` );
    console.log(`exams: ${JSON.stringify(exams)}` );
    //console.log(`select exam list array in Toggle:  ${[...examsList]}`);

    //examsToContent(examsList);
  }
  useEffect(() => {
    console.log(`use effect exams DP_ ${JSON.stringify(...examsList)}`);
    //console.log(`select exam list array in Toggle:  ${JSON.stringify(...examsList)}}`);
    examsToContent(examsList);
  }, [examsList]);
  useEffect(() => {
    console.log(`use effect selected DP_ ${classListDB}`);
    selctedToContent(classListDB);
  }, [classListDB]);




  //useEffect(() => classSelectedToggleDB, [])





  /**LOCAL WORK FOR DATA */
  /*   const [classDataShown, setClassDataShown] = useState(classDataList);
    const [classList, setClassList] = useState(classSelectList); */

  /**Funciton to make buttons for classes listed in Localstorage */
  /*   function classDataList() {
  
      const className = Object.keys(localStorage);
      const listItems = className.map(className =>
        <ClassData key={className} name={className} classSelectedToggle={classSelectedToggle} />);
      return listItems;
    } */

  /**Function to set list of classes selected and not*/
  /*   function classSelectList() {
      const className = Object.keys(localStorage);
      const listItems = new Map();
      className.forEach((element) => listItems.set(element, false));
      console.log(`class select map: ` + listItems);
      return listItems;
    } */

  /*   function classSelectedToggle(childClickSelected) {
      let keyLable = childClickSelected.name;
      console.log(`keyLable: ` + keyLable);
      let value = childClickSelected.value;
      console.log(`value: ` + value);
      console.log(`toggle class list map1: ` + [...classList.entries()]);
      setClassList(
        new Map(classList.set(keyLable, value))
      );
      console.log(`toggle class list map2: ` + [...classList.entries()]);
      selctedToContent(classList);
    } */



  /* foreceUpdate to update previous uploads list from change in LocalStorage */

  /*   const forceUpdateDataShown = useCallback(() => setClassesShown(classesShown), []);
    useEffect(() => {
      window.addEventListener('storage', forceUpdateDataShown);
      setClassesShown(classesShown);
      return () => window.removeEventListener('storage', forceUpdateDataShown);
    }, []) */

  /* foreceUpdate to update previous uploads list from change in LocalStorage */

  const forceUpdateSelectList = useCallback(() => setClassListDB(classSelectListDB), []);
  useEffect(() => {
    window.addEventListener('storage', forceUpdateSelectList);
    setClassListDB(classSelectListDB);
    return () => window.removeEventListener('storage', forceUpdateSelectList);
  }, [])


  return (
    <div className="DataPane">

      <div id="existingData">
        <h3>Previous Uploads</h3>
        {/**<div id="classOptions">
          {classDataShown}
  </div>*/}
        <h3>DB TEST - Previous Uploads</h3>
        <div id="classOptionsDB">
          {classesShown?.map(classShown =>
            <ClassData key={classShown.class_name} className={classShown.class_name} name={`${classShown.course_number}${classShown.semester}${classShown.class_year}`} classSelectedToggleDB={classSelectedToggleDB} />)}
        </div>
      </div>

      <div id="uploadNew">
        <h3>Upload New Data</h3>

        <button id="downloadTemplate" onClick={handleTemplateDownload}>Download Excel Template</button>


        <label for="inputFile">Choose an Excel file to upload</label>
        <input id="inputFile" name="inputFile" type="file" accept=".xlsx"></input>
        <button id="uploadFile" onClick={() => handleFileAsync(userID)}>Upload</button>
      </div>

    </div>
  );
}

export default DataPane;