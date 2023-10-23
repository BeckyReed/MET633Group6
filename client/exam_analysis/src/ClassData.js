import './ClassData.css';
import { useState } from 'react';




function ClassData({className, name, classSelectedToggleDB}) {

  const [ lable, setlable ] = useState(name);
  const [ selected, setSelected ] = useState(true);
  const [ courseName, setCourseName ] = useState(className);


  //pass data to the DataPaine method classSelectedToggleDB
  function getData () {
    setSelected( !selected );
    let data = {'name': lable, 'value': selected, 'courseName': courseName};
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
        <button className="selectClassData" onClick={() => {classSelectedToggleDB(getData());   console.log(`selected: ${lable}: ` + selected);} }>{tag()}{lable}</button>
      </div>
    );
  }
  
export default ClassData;