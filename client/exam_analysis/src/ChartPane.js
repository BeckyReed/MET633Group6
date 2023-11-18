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
        const scores = getScoreArray();
        setDatasetSize(scores.length);
    }, [exams]);

    useEffect(() => {
        const scores = getScoreArray();
        let result;
        if (scores.length>0){
            result = standardDeviation(getScoreArray()).toFixed(2);
        }
        setStandDevScore(result);
    }, [exams]);

    useEffect(() => {
        const time = getTimeArray();
        let result;
        if (time.length>0){
            result = standardDeviation(getTimeArray()).toFixed(2);
        }
        setStandDevTime(result);
    }, [exams]);

    useEffect(() => {
        const scores = getScoreArray();
        // const times = getTimeArray();
        let result;
        if (scores.length>0){
            result = sampleCorrelation(getScoreArray(), getTimeArray()).toFixed(2);
        }
        setCorrelation(result);
    }, [exams]);


    
    /**get exam score array */
    function getScoreArray() {
        const scores = [];
        if (exams.length>0) {
            exams.forEach(element => {
                    let score = parseFloat(element.score);
                    console.log(`%%% Stata score: ${score}`);
                    scores.push(score);
            });
        };
        return scores;
    }

    /**get exam time array */
    function getTimeArray() {
        const times = [];
        if (exams.length>0) {
            exams.forEach(element => {
                    let time = parseFloat(element.time_min);
                    console.log(`%%% Stata time: ${time}`);
                    times.push(time);
            });
        };
        return times;
    }


    /**get exam list */
    function getExams() {


        if (toChartPaneExams != null) {

            /* let concatExams = []
            let examsArrays = toChartPaneExams();
            examsArrays.forEach(element => {
                concatExams.concat(element);
            });

 */
            setExams(toChartPaneExams);
            console.log(`chart pane exams: ${exams}`)
        }
        else {
            console.log(`Null To Chart Pane Exams`);
        }

    }

    console.log(exams);

    //TEST GET DATA EXAMS
    /*     async function getExamData(){
            //TEST HARD VALUE
            const className = "CS633SPRING2020";
    
    
            try {
                //const response = await fetch(`http://localhost:4000/exams/${userID}${className}`);
    
                //TEST
                const response = await fetch(`http://localhost:4000/exams`);
    
                const json = await response.json();
                console.log(json);
                setExams(json);
            } catch (err) {
                console.log(err);
            }
        }
        useEffect(() => getExamData, []);
        console.log(`CHART PANE EXAMS GET DATA ${exams}`);
        console.log(exams); */

    /**CLASS LIST TO SHOW CHART FOR */

    //const [classDataUpload, setClassDataUpload] = useState([]);

    function chartData(classArray, colorArray) {

        console.log(`TESTING: CHART PANE CHART DATA: To Chart Pane List: ${toChartPaneList()}`);

        let testOnStart
        if (classArray == null) {
            testOnStart = [];
        } else {
            testOnStart = classArray;
        }
        /*         for (let index = 0; index < classArray.length; index++) {
                    if (!getExams.includes(classArray[index])) {
                        setClassDataUpload([...classDataUpload, classArray[index]]);
                    }
                }
                for (let index = 0; index < classDataUpload.length; index++) {
                    if (!classArray.includes(classDataUpload[index])) {
                        setClassDataUpload(classDataUpload.splice(index, classDataUpload[index]));
                    }
        
                }
        
                console.log(`Class Data Upload: ` + classDataUpload); */

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




    /*  const [classDataUpload, setClassDataUpload] = useState([]);
 
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
 
                 data.push(makeDataset(toChartPaneList(), userID, exams, classArray[index], colorArray[index]));
                 //data.push(makeDataset(toChartPane(), , classArray[index], colorArray[index]));
             }
 
         }
         console.log(`TEST CHART DATA: ` + data);
         let testChart = {
             datasets: data
 
         };
 
 
         return testChart;
     }
  */


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