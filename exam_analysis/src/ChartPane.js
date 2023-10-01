import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, elements } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { prepLocalDataXY, makeDataset } from './scripts/ChartHandling';
import { useCallback, useEffect, useState } from 'react';



/* function chartData(classKeyArray, collorArray) {

    let data = [];

    if (classKeyArray.length == collorArray.length && classKeyArray.length > 0) {

        for (let index = 0; index > classKeyArray.length; index++) {
            data.push(makeDataset(classKeyArray[index], collorArray[index]));
        }
    }

    let testChart = {
        datasets: data
    };

    return testChart;
} */


function ChartPane({ toChartPane }) {

    let thisKeys = ['CS633SPRING2021'];
    let thisColors = ['rgb (0, 255, 0)'];

    const [classDataUpload, setClassDataUpload] = useState([]);

    function chartData(classArray, collorArray) {
                 for (let index = 0; index < classArray.length; index++) {
                    if(!classDataUpload.includes(classArray[index])) {
                        setClassDataUpload([...classDataUpload, classArray[index]]);
                    }
                  }
                  for (let index = 0; index < classDataUpload.length; index++) {
                    if (!classArray.includes(classDataUpload[index])) {
                        setClassDataUpload(classDataUpload.splice(index, classDataUpload[index]));
                    }

                  }

        console.log(`Class Data Upload: ` + classDataUpload);

        let data = [];

        for (let index = 0; index < classArray.length; index++) {

            if (classArray[index] != ``) {
                console.log(`classArray index to make dataset:  ` + classArray[index]);

                data.push(makeDataset(classArray[index], collorArray[0]));
            }

        }
console.log(`TEST CHART DATA: ` + data);
        let testChart = {
            datasets: data

            
        };

        
        return testChart;
    }



    return (
        <div className="chart">
            <div>{toChartPane()}</div>
            <Scatter data={chartData(toChartPane(), thisColors)} />

        </div>
    );
}

export default ChartPane;