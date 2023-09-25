import './ClassData.css';
import { useState } from 'react';



function ClassData({name}) {

  const [lable, setlable] = useState(name);

    return (
      <div className="ClassData">
        <button className="selectClassData">{lable}</button>
      </div>
    );
  }
  
export default ClassData;