import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, elements, Colors } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { colorArray } from './resource/color';
import { prepLocalDataXY, makeDataset } from './scripts/ChartHandling';
import { useCallback, useEffect, useState } from 'react';

ChartJS.register(Colors);
const options = {
    plugins: {
        colors: {
            forceOverride: true
        }
    }
};



function ChartPane({ toChartPane }) {

    let thisKeys = ['CS633SPRING2021'];
    let thisColors = ['rgb (0, 255, 0)'];

    const [classDataUpload, setClassDataUpload] = useState([]);

    function chartData(classArray, colorArray) {
        for (let index = 0; index < classArray.length; index++) {
            if (!classDataUpload.includes(classArray[index])) {
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

                data.push(makeDataset(classArray[index], colorArray[index]));
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
            <Scatter options={options} data={chartData(toChartPane(), colorArray)} />

        </div>
    );
}

export default ChartPane;