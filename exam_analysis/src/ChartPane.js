import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, elements } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { prepLocalDataXY, makeDataset } from './scripts/ChartHandling';
import { useCallback, useEffect, useState } from 'react';



function chartData(classKeyArray, collorArray) {

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
}


function ChartPane() {

    let thisKeys = ['CS633SPRING2021'];
    let thisColors = ['rgb (0, 255, 0)'];

/*       const [classDataUpload, setClassDataUpload] = useState(chartData(thisKeys, thisColors));

    //foreceUpdate to update previous uploads list from change in LocalStorage 

    const forceUpdate = useCallback(() => setClassDataUpload(chartData), []);

    useEffect(() => {
        window.addEventListener('storage', forceUpdate);
        setClassDataUpload(chartData);
        console.log("effect chart pane");

        return () => window.removeEventListener('storage', forceUpdate);

    }, [])  
 */


    return (
        <div className="chart">
            <Scatter data={chartData(thisKeys, thisColors)} />

        </div>
    );
}

export default ChartPane;