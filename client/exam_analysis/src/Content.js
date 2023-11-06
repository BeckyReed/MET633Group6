import { useEffect, useState } from 'react';
import './Content.css';
import Tray from './Tray';
import Main from './Main';
import DataPane from './DataPane';


function Content() {

  const [showingGetData, setShowingGetData] = useState(true);//TESTING true, instead of false, trying to pin differnece in prod
  const [selctedClass, setSelectedClass] = useState(new Map());
  const [chartList, setChartList] = useState([]);
  const [fetchedExams, setFetchedExams] = useState([]);
  const [fectchedExamList, setFetchedExamList] = useState([]);


  /**Pass Exam list to Contnet Parent component */
  function examsToContent(examList) {

    console.log(`content Parent List EXAMS FROM DP: ${JSON.stringify(examList)}`);
    //if the class_name for exams not in fexchedExamList array, then add exam data to fetchedExams
    if (examList != null && examList.length > 0) {
      let className = examList[0].class_name;
      if (!fectchedExamList.includes(className)) {

        examList.forEach(element => {
          console.log(element)
          setFetchedExams([
            ...fetchedExams,
            element
          ]
          );
        });

        setFetchedExams([...fetchedExams, ...examList]);

        console.log(`Exams To Contnet set fetched exams: ${fetchedExams.length}`);
        setFetchedExamList([...fectchedExamList, className]);
        console.log(`exam class name list ${fectchedExamList.length}`);
        console.log("new exams added");
      }

    }

    console.log(`content Parent List EXAMS: ${JSON.stringify(...fetchedExams)}`);
  }
  useEffect(() => {
    console.log(`use effect setFetchedExams Content_ ${fetchedExams}`);
    contentToMainExams();
  }, [fetchedExams]);

  useEffect(() => {
    console.log(`use effect setFetchedExamsList Content_ ${fectchedExamList}`);
  }, [fectchedExamList]);


  /**Pass Selected list to Content Parent component */
  function selctedToContent(classList) {

    let keyClass = Array.from(classList.keys());
    let valClass = Array.from(classList.values());

    for (let index = 0; index < keyClass.length; index++) {
      setSelectedClass(new Map(selctedClass.set(keyClass[index], valClass[index])));
    }
    console.log(`content Parent List CLASSES: ` + [...selctedClass.entries()]);
  }



  function contentToMainSelected() {
    console.log(`selectedClass List: ${selctedClass}`);

    let keyClass = Array.from(selctedClass.keys());
    console.log(`keyClass: ${keyClass}`);
    let valClass = Array.from(selctedClass.values());
    console.log(`valClass: ${valClass}`);


    for (let index = 0; index < keyClass.length; index++) {
      if (valClass[index] && !chartList.includes(keyClass[index])) {
        setChartList([...chartList, keyClass[index]]);
      } else if (!valClass[index] && chartList.includes(keyClass[index])) {
        setChartList([chartList.splice(index, keyClass[index])]);
      }
    }

    console.log(`content to main CLASS array: ${chartList}`);

    return chartList;
  }


  function contentToMainExams() {
    console.log(`Exams List: ${JSON.stringify(fetchedExams)}`);

    /*     let keyExams = Array.from(fetchedExams.keys());
        console.log(`keyExams: ` + keyExams);
        let valExams = Array.from(fetchedExams.values());
        console.log(`valExams: ` + valExams);
        
    
        for (let index = 0; index < keyExams.length; index++) {
          if (valExams[index] && !fetchedExams.includes(keyExams[index])) {
            setChartList([...fetchedExams, keyExams[index]]);
          } else if (!valExams[index] && fetchedExams.includes(keyExams[index])) {
            setChartList([fetchedExams.splice(index, keyExams[index])]);
          }
        } */

    console.log(`content to main EXAM array: ${fetchedExams}`);

    return fetchedExams;
  }


  return (
    <div>

      <div className="Content">
        <Tray isShowingGetData={showingGetData} onClickGetData={() => setShowingGetData(!showingGetData)} />

        {showingGetData ? <DataPane selctedToContent={selctedToContent} examsToContent={examsToContent} /> : null}

        <Main contentToMainSelected={contentToMainSelected} contentToMainExams={contentToMainExams} />
      </div>
    </div>

  );
}

export default Content;