import './ClassData.css';
import { useState } from 'react';




function ClassData({name, classSelectedToggle}) {

  //super(selected);
  const [lable, setlable] = useState(name);


  let selected = false;

  function getData () {
    let data = {name: lable, value: selected};
    return data;
  }
  

    return (
      <div className="ClassData">
        <button className="selectClassData" onClick={() => {selected=!selected; classSelectedToggle(getData());  console.log(`selected: ${lable}: ` + selected);} }>{lable}</button>
      </div>
    );
  }
  
export default ClassData;