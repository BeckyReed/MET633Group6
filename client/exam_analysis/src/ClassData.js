import './ClassData.css';
import { useState, useEffect } from 'react';




function ClassData({className, name, classSelectedToggleDB}) {

  const [ lable, setlable ] = useState(name);
  const [ selected, setSelected ] = useState(true);
  const [ courseName, setCourseName ] = useState(className);
  const [ examData, setExamData ] = useState([]);



  //get Exam Data JSON
  async function getExamData (courseName) {
    
      //TEST HARD VALUE
      //const className = "CS633SPRING2020";

      try {
          const response = await fetch(`http://localhost:4000/exams/${courseName}`);

          const json = await response.json();
          console.log(`getExamData: JSON:: ${JSON.stringify(json)}`);
          console.log(json);
          setExamData(examData.push(json));
      } catch (err) {
          console.log(err);
      }

      console.log(`CHART PANE EXAMS GET DATA : ${className}  :: ${examData}`);
      console.log(examData);
  }
 //useEffect(() => getExamData, []);
  //console.log(`CHART PANE EXAMS GET DATA : ${className}  :: ${examData}`);
  //console.log(examData);
  


  //pass data to the DataPaine method classSelectedToggleDB
function getData () {
    setSelected( !selected );
    let data = {'name': lable, 'value': selected, 'courseName': courseName, 'exams': examData};
    console.log(`GET DATA VALUE: ${JSON.stringify(data)}`);
    return data;
  }
  
  //selection indicator
  let tag = () => {
    if(!selected) {
      return `*`;
    } else {
      return ``;
    }
  }

    return (
      <div className="ClassData">
        <button className="selectClassData" 
        onClick={() => {
/*           if (examData.length == 0) {
            getExamData(courseName);
            console.log(`GETTIG DATA ON CLICK`)
          }  */
          
          classSelectedToggleDB(getData());   


          console.log(`selected: ${lable}: ` + selected); 

          } }>{tag()}{lable}</button>
      </div>
    );
  }
  
export default ClassData;