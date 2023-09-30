import './ClassData.css';
import { useState } from 'react';




function ClassData({name, classSelectedToggle}) {

  //super(selected);
  const [lable, setlable] = useState(name);


  let selected = false;

  let data = {lable: selected}
/*   function toggleSelected () {
    if(selected == true) {
      setClassSelected(false);
    } else {
      setClassSelected(true);
    }
  } */

    return (
      <div className="ClassData">
        <button className="selectClassData" onClick={() => {selected=!selected; classSelectedToggle(data);  console.log(`selected: ${lable}: ` + selected);} }>{lable}</button>
      </div>
    );
  }
  
export default ClassData;