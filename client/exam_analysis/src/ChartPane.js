import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Colors } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { colorArray } from './resource/color';
import { makeDataset, downloadPDF } from './scripts/ChartHandling';
import { useState } from 'react';




ChartJS.register(Colors);

const bgColor = {
    id: 'bgColor',
    beforeDraw: (chart, args, pluinOptions) => {
        const { ctx, canvas: { top, botom, left, right, width, height } } = chart;
        ctx.save();

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

    }
};

const options = {

    scales: {
        y: {
            title: {
                display: true,
                text: 'Score',
                color: 'rgb(0,0,0)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
                stepSize: 5
            }
        },
        x: {
            title: {
                display: true,
                text: 'Time',
                color: 'rgb(0,0,0)'
            },
            suggestedMax: 100,
            suggestedMin: 0,
            ticks: {
                stepSize: 5
            }
        }
    },
    bgColor: {
        color: 'white'
    },

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

            {/* <div>{toChartPane()}</div> */}
            <Scatter id="scatterChart" options={options} plugins={[bgColor]} data={chartData(toChartPane(), colorArray)} />
            <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>
    );
}

export default ChartPane;