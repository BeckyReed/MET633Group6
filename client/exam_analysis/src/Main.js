import DataPane from './DataPane';
import ChartPane from './ChartPane';
import './Main.css';
import { useState, useEffect } from 'react';


function Main({ contentToMainSelected, contentToMainExams }) {

  function toChartPaneList() {
    console.log(`TEST to Chart Pane List: ${contentToMainSelected()}`);
    return contentToMainSelected();
  }

  function toChartPaneExams() {
    console.log(`TEST to Chart Pane Exams: ${JSON.stringify(...contentToMainExams())}`);
    return contentToMainExams();
  }


  return (
    <div className="Main">

      <ChartPane toChartPaneList={toChartPaneList} toChartPaneExams={toChartPaneExams}/>

    </div>
  );
}

export default Main;