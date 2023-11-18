import { Scatter, Line } from "react-chartjs-2";
import { Chart as ChartJS, Colors, LineElement } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { colorArray } from './resource/color';
import { makeDataset, downloadPDF } from './scripts/ChartHandling';
import { useState, useEffect } from 'react';
import { standardDeviation, sampleCorrelation } from "simple-statistics";



ChartJS.register(
    Colors,
    LineElement
    );

const bgColor = {
    id: 'bgColor',
    beforeDraw: (chart, args, pluinOptions) => {
        const { ctx, canvas: { top, botom, left, right, width, height } } = chart;
        ctx.save();

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);

    }
};

const hQuadrentLine = {
    id: 'hQuadrentLine',
    beforeDatasetsDraw(chart, args, pluinOptions) {
        const{ 
            ctx, 
            chartArea: {top, right, bottom, left, width, height}, 
            scales: {x,y} 
        } = chart;
        ctx.save();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.setLineDash([6, 6]);
        ctx.moveTo(left, ((bottom+top)/2));
        ctx.lineTo(right, ((bottom+top)/2));
        ctx.stroke();
        ctx.restore();

        ctx.setLineDash([]);
        
    }
};

const vQuadrentLine = {
    id: 'vQuadrentLine',
    beforeDatasetsDraw(chart, args, pluinOptions) {
        const{ 
            ctx, 
            chartArea: {top, right, bottom, left, width, height}, 
            scales: {x,y} 
        } = chart;
        ctx.save();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.setLineDash([6, 6]);
        ctx.moveTo(((width/2)+left), top);
        ctx.lineTo(((width/2)+left), bottom);
        ctx.stroke();
        ctx.restore();

        ctx.setLineDash([]);
        
    }
};



const options = {
    elements: {
        point: {
            pointStyle: 'rectRot',
            radius: 4
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Score',
                color: 'rgb(0,0,0)',
                font: {
                    size: 20
                }
            },
            ticks: {
                stepSize: 5,
                includeBounds: false,
                font: {
                    size: 15
                }
            },
            afterDataLimits: function(axis) {
                    axis.max = 100;
                if (axis.min >= 5) {
                    axis.min -=1;
                }                
            }
        },
        x: {
            title: {
                display: true,
                text: 'Time in Minutes',
                color: 'rgb(0,0,0)',
                font: {
                    size: 20
                }
            },
            //suggestedMax: 100,
            ticks: {
                stepSize: 10,
                includeBounds: false,
                font: {
                    size: 15
                }
            },
            afterDataLimits: function(axis) {
                if (axis.min >= 10) {
                    axis.min -=10;
                }
                axis.max +=1;
            }
        }
    },
    plugins: {
        
        colors: {
            forceOverride: true
        },
        legend: {
            labels: {
                font: {
                    size: 15
                }
            }
        }
    }
};






function ChartPane({ toChartPaneList, toChartPaneExams }) {

    /**EXAM LIST FROM DB */
    const [exams, setExams] = useState([]);
    /**Class LIST FROM DB */
    const [list, setList] = useState([]);
    /**CHART DATA */
    const [chartDataSet, setChartDataSet] = useState();
    /**EXAM STATS Dataset Size*/
    const [datasetSize, setDatasetSize] = useState();
    /**EXAM STATS Standard Deviation SCORE*/
    const [standDevScore, setStandDevScore] = useState();
    /**EXAM STATS Standard Deviation TIME*/
    const [standDevTime, setStandDevTime] = useState();
    /**EXAM STATS Correlation */
    const [correlation, setCorrelation] = useState();
    /**User ID */
    const [userID, setUserID] = useState(1);

    useEffect(() => {
        setExams(toChartPaneExams);
    },[toChartPaneExams]);

    useEffect(() => {
        setList(toChartPaneList);
    },[toChartPaneList]);


    useEffect(() => {

        console.log(`%%% ChartPane: useEffect Stats: list: ${list}`);

        const scores = getScoreArray();
        const time = getTimeArray();

        setDatasetSize(scores.length);

        let resultSDscore;
        if (scores.length>0){
            resultSDscore = standardDeviation(getScoreArray()).toFixed(2);
        }
        setStandDevScore(resultSDscore);

        let resultSDtime;
        if (time.length>0){
            resultSDtime = standardDeviation(getTimeArray()).toFixed(2);
        }
        setStandDevTime(resultSDtime);

        let resultCor;
        if (scores.length>0){
            resultCor = sampleCorrelation(getScoreArray(), getTimeArray()).toFixed(2);
        }
        setCorrelation(resultCor);



    }, [list]);



    useEffect(() => {

        console.log(`%%% ChartPane: useEffect Stats: list: ${list}`);

        const scores = getScoreArray();
        const time = getTimeArray();

        setDatasetSize(scores.length);

        let resultSDscore;
        if (scores.length>0){
            resultSDscore = standardDeviation(getScoreArray()).toFixed(2);
        }
        setStandDevScore(resultSDscore);

        let resultSDtime;
        if (time.length>0){
            resultSDtime = standardDeviation(getTimeArray()).toFixed(2);
        }
        setStandDevTime(resultSDtime);

        let resultCor;
        if (scores.length>0){
            resultCor = sampleCorrelation(getScoreArray(), getTimeArray()).toFixed(2);
        }
        setCorrelation(resultCor);



    }, [exams]);

   /*  useEffect(() => {
        const scores = getScoreArray();
        setDatasetSize(scores.length);
    }, [exams]); */

    /* useEffect(() => {
        const scores = getScoreArray();
        let result;
        if (scores.length>0){
            result = standardDeviation(getScoreArray()).toFixed(2);
        }
        setStandDevScore(result);
    }, [exams]); */

    /* useEffect(() => {
        const time = getTimeArray();
        let result;
        if (time.length>0){
            result = standardDeviation(getTimeArray()).toFixed(2);
        }
        setStandDevTime(result);
    }, [exams]); */

    /* useEffect(() => {
        const scores = getScoreArray();
        // const times = getTimeArray();
        let result;
        if (scores.length>0){
            result = sampleCorrelation(getScoreArray(), getTimeArray()).toFixed(2);
        }
        setCorrelation(result);
    }, [exams]);
 */

    
    /**get exam score array */
    function getScoreArray() {
        const scores = [];
        if (list.length > 0 && exams.length > 0) {
            exams.forEach(element => {
                    let score = parseFloat(element.score);
                    let name = element.class_name;

                    let classNameList = [];
                    list.forEach(element => {
                        classNameList.push(`${userID}${element}`)
                    });

                    if (classNameList.includes(name)) {
                        console.log(`%%% Stata score: ${score}`);
                        console.log(`%%% Stata score Class: ${element.class_name}`);
                        scores.push(score);
                    }                    
            });
        }
        return scores;
    }

    /**get exam time array */
    function getTimeArray() {
        const times = [];
        if (list.length > 0 && exams.length > 0) {
            exams.forEach(element => {
                    let time = parseFloat(element.time_min);
                    let name = element.class_name;

                    let classNameList = [];
                    list.forEach(element => {
                        classNameList.push(`${userID}${element}`)
                    });

                    if (classNameList.includes(name)) {
                        console.log(`%%% Stata time: ${time}`);
                        console.log(`%%% Stata time Class: ${element.class_name}`);
                        times.push(time);
                    }                    
            });
        }
        return times;
    }

    console.log(exams);

    //TEST GET DATA EXAMS
    function chartData(classArray, colorArray) {

        console.log(`TESTING: CHART PANE CHART DATA: To Chart Pane List: ${toChartPaneList()}`);

        let testOnStart
        if (classArray == null) {
            testOnStart = [];
        } else {
            testOnStart = classArray;
        }

        let data = [];

        for (let index = 0; index < testOnStart.length; index++) {

            if (testOnStart[index] != ``) {
                console.log(`classArray index to make dataset:  ` + testOnStart[index]);



                data.push(makeDataset(toChartPaneList(), userID, exams, testOnStart[index], colorArray[index]));
                //data.push(makeDataset(toChartPane(), , classArray[index], colorArray[index]));
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
            <Scatter id="scatterChart" options={options} plugins={[bgColor, hQuadrentLine, vQuadrentLine]} data={chartData(toChartPaneList(), colorArray)} />
            <div>
                <h3 id="statDatasetSize">Size of Dataset: {datasetSize}</h3>
                <h4 id="percentInQ1">% in Q1 (Genius): {}</h4>
                <h4 id="percentInQ2">% in Q2 (Expected Behavior): {}</h4>
                <h4 id="percentInQ3">% in Q3 (Over-Confident): {}</h4>
                <h4 id="percentInQ4">% in Q4 (Need External Help): {}</h4>
                <h3 id="statStandardDeviationScore">Standard Deviation (Score): {standDevScore}</h3>
                <h3 id="statStandardDeviationTime">Standard Deviation (Time): {standDevTime}</h3>
                <h3 id="statCorrelation">Correlation: {correlation}</h3>
            </div>
            <button className="download" onClick={() => downloadPDF(datasetSize, standDevScore, standDevTime, correlation)}>Download PDF</button>
        </div>
    );
}

export default ChartPane;