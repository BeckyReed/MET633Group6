import DataPane from './DataPane';
import ChartPane from './ChartPane';
import './Main.css';
import { useState, useEffect } from 'react';


function Main({ contentToMainSelected, contentToMainExams }) {

  const [chartList, setChartList] = useState([]);
  const [ examData, setExamData ] = useState([]);



  function toChartPaneList() {
    //setChartList(contentToMainSelected);
    console.log(`TEST to Chart Pane List: ${contentToMainSelected()}`);
    return contentToMainSelected();
  }

  function toChartPaneExams() {
    //console.log(`TEST to Chart Pane Exams Content: ${[...contentToMainExams()]}`);
    //setExamData([...examData, contentToMainExams ]);
    console.log(`TEST to Chart Pane Exams: ${JSON.stringify(...contentToMainExams())}`);
    return contentToMainExams();
  }
  //useEffect(() => toChartPaneExams, []);
  //console.log(examData);


  return (
    <div className="Main">

      <ChartPane toChartPaneList={toChartPaneList} toChartPaneExams={toChartPaneExams}/>
      {/*<div className="downloadTray">
            
            <button className="download">Download</button>
    </div>*/}

    </div>
  );
}

export default Main;