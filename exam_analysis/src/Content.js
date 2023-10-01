import { useState } from 'react';
import './Content.css';
import Tray from './Tray';
import Main from './Main';
import DataPane from './DataPane';


function Content() {

  const [showingGetData, setShowingGetData] = useState(false);
  const [selctedClass, setSelectedClass] = useState(new Map());
  const [chartList, setChartList] = useState([]);

  /**Pass Selected list to Content Parent component */
  function selctedToContent(classList) {

    let keyClass = Array.from(classList.keys());
    let valClass = Array.from(classList.values());

    for (let index = 0; index < keyClass.length; index++) {
      setSelectedClass(new Map(selctedClass.set(keyClass[index], valClass[index])));
    }

    console.log(`content Parent List: ` + [...selctedClass.entries()]);


  }


  function contentToMain() {
    console.log(`selectedClass List: ` + selctedClass);

    let keyClass = Array.from(selctedClass.keys());
    console.log(`keyClass: ` + keyClass);
    let valClass = Array.from(selctedClass.values());
    console.log(`valClass: ` + valClass);
    

    for (let index = 0; index < keyClass.length; index++) {
      if (valClass[index] && !chartList.includes(keyClass[index])) {
        setChartList([...chartList, keyClass[index]]);
      } else if (!valClass[index] && chartList.includes(keyClass[index])) {
        setChartList([chartList.splice(index, keyClass[index])]);
      }
    }

    console.log(`content to main array: ` + chartList);

    return chartList;
  }



  return (
    <div>
      
      <div className="Content">
        <Tray isShowingGetData={showingGetData} onClickGetData={() => setShowingGetData(!showingGetData)} />

        {showingGetData ? <DataPane selctedToContent={selctedToContent} /> : null}

        <Main contentToMain={contentToMain} />
      </div>
    </div>

  );
}

export default Content;