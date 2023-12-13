import { Scatter} from "react-chartjs-2";
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
        const {
            ctx,
            chartArea: { top, right, bottom, left, width, height },
            scales: { x, y }
        } = chart;
        ctx.save();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.setLineDash([6, 6]);
        ctx.moveTo(left, ((bottom + top) / 2));
        ctx.lineTo(right, ((bottom + top) / 2));
        ctx.stroke();
        ctx.restore();

        ctx.setLineDash([]);

    }
};

const vQuadrentLine = {
    id: 'vQuadrentLine',
    beforeDatasetsDraw(chart, args, pluinOptions) {
        const {
            ctx,
            chartArea: { top, right, bottom, left, width, height },
            scales: { x, y }
        } = chart;
        ctx.save();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.setLineDash([6, 6]);
        ctx.moveTo(((width / 2) + left), top);
        ctx.lineTo(((width / 2) + left), bottom);
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
            afterDataLimits: function (axis) {
                axis.max = 100;
                if (axis.min >= 5) {
                    axis.min -= 1;
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
            afterDataLimits: function (axis) {
                if (axis.min >= 10) {
                    axis.min -= 10;
                }
                axis.max += 1;
            }
        }
    },
    plugins: {

        colors: {
            forceOverride: true
        },
        legend: {
            onClick: null,
            labels: {
                font: {
                    size: 15
                }
            }
        }
    }
};






function ChartPane({ toChartPaneList, toChartPaneExams }) {
    /**User ID */
    const [userID, setUserID] = useState(1);

    /**EXAM LIST FROM DB */
    const [exams, setExams] = useState([]);
    /**Class LIST FROM DB */
    const [list, setList] = useState([]);
    /**CHART DATA */
/*     const [chartDataSet, setChartDataSet] = useState(); */
    /**EXAM STATS Dataset Size*/
    const [datasetSize, setDatasetSize] = useState();
    /**EXAM STATS Standard Deviation SCORE*/
    const [standDevScore, setStandDevScore] = useState();
    /**EXAM STATS Standard Deviation TIME*/
    const [standDevTime, setStandDevTime] = useState();
    /**EXAM STATS Correlation */
    const [correlation, setCorrelation] = useState();

    /**EXAM STATS Quadrant 1 */
    const [quad1Count, setQuad1Count] = useState();
    /**EXAM STATS Quadrant 2 */
    const [quad2Count, setQuad2Count] = useState();
    /**EXAM STATS Quadrant 3 */
    const [quad3Count, setQuad3Count] = useState();
    /**EXAM STATS Quadrant 4 */
    const [quad4Count, setQuad4Count] = useState();

    /**EXAM STATS % Quadrant 1 */
    const [quad1Per, setQuad1Per] = useState();
    /**EXAM STATS % Quadrant 2 */
    const [quad2Per, setQuad2Per] = useState();
    /**EXAM STATS % Quadrant 3 */
    const [quad3Per, setQuad3Per] = useState();
    /**EXAM STATS % Quadrant 4 */
    const [quad4Per, setQuad4Per] = useState();


    useEffect(() => {
        if(datasetSize == 0 || quad1Count == 0) {
            setQuad1Per(0);
        } else {
            setQuad1Per(((quad1Count*100)/datasetSize).toFixed(2));
        }

        if(datasetSize == 0 || quad2Count == 0) {
            setQuad2Per(0);
        } else {
            setQuad2Per(((quad2Count*100)/datasetSize).toFixed(2));
        }

        if(datasetSize == 0 || quad3Count == 0) {
            setQuad3Per(0);
        } else {
            setQuad3Per(((quad3Count*100)/datasetSize).toFixed(2));
        }

        if(datasetSize == 0 || quad4Count == 0) {
            setQuad4Per(0);
        } else {
            setQuad4Per(((quad4Count*100)/datasetSize).toFixed(2));
        }

    }, [quad1Count, quad2Count, quad3Count, quad4Count]);

    useEffect(() => {
        setExams(toChartPaneExams);
    }, [toChartPaneExams]);

    useEffect(() => {
        setList(toChartPaneList);
    }, [toChartPaneList]);

    useEffect(() => {
        console.log(`%%% ChartPane: useEffect Stats: list: ${list}`);

        const scores = getScoreArray();
        const time = getTimeArray();
        setStats(scores, time);
        
    }, [list, exams]);

    useEffect(() => {
        const scores = getScoreArray();
        const time = getTimeArray();
        //Quadrants
        let yMin = Math.floor((Math.min(...scores) - 1) / 5) * 5;
        let yMax = 100;
        let yMid = ((yMax - yMin) / 2) + yMin;
        let xMin = Math.floor((Math.min(...time) - 10) / 10) * 10;
        let xMax = Math.ceil((Math.max(...time) + 1) / 10) * 10;
        let xMid = ((xMax - xMin) / 2) + xMin;
        console.log(`%%% ChartPane: useEffect Stats: Y Min = ${yMin}`);
        console.log(`%%% ChartPane: useEffect Stats: Y Max = ${yMax}`);
        console.log(`%%% ChartPane: useEffect Stats: Y Mid = ${yMid}`);
        console.log(`%%% ChartPane: useEffect Stats: X Min = ${xMin}`);
        console.log(`%%% ChartPane: useEffect Stats: X Max = ${xMax}`);
        console.log(`%%% ChartPane: useEffect Stats: X Mid = ${xMid}`);

        let resQ1 = 0;
        let resQ2 = 0;
        let resQ3 = 0;
        let resQ4 = 0;
        exams.forEach(element => {
            let score = parseFloat(element.score);
            let time = parseFloat(element.time_min);
            let name = element.class_name;

            let classNameList = [];
            list.forEach(element => {
                classNameList.push(`${userID}${element}`)
            });

            if (classNameList.includes(name)) {

                //Top half 
                if (score > yMid) {
                    //Q1 (Left)
                    if (time < xMid) {
                        resQ1 = resQ1 + 1;
                    }
                    //Q2 (Right)
                    else {
                        resQ2 = resQ2 + 1;
                    }
                }
                //Bottom half 
                else {
                    //Q3 (Left)
                    if (time < xMid) {
                        resQ3 = resQ3 + 1;
                    }
                    //Q4 (Right)
                    else {
                        resQ4 = resQ4 + 1;
                    }
                }

            }
        });
        setQuad1Count(resQ1);
        setQuad2Count(resQ2);
        setQuad3Count(resQ3);
        setQuad4Count(resQ4);
    }, [list, exams]);


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

    /**set Stats states for useEffect */
    function setStats (scoresArray, timeArray) {

        setDatasetSize(scoresArray.length);

        let resultSDscore;
        if (scoresArray.length > 1) {
            resultSDscore = standardDeviation(scoresArray).toFixed(2);
        } else if (scoresArray.length == 1) {
            resultSDscore = "sample size of one"
        }
        setStandDevScore(resultSDscore);

        let resultSDtime;
        if (timeArray.length > 1) {
            resultSDtime = standardDeviation(timeArray).toFixed(2);
        }  else if (scoresArray.length == 1) {
            resultSDtime = "sample size of one"
        }
        setStandDevTime(resultSDtime);

        let resultCor;
        if (scoresArray.length > 1) {
            resultCor = sampleCorrelation(scoresArray, timeArray).toFixed(2);
        } else if (scoresArray.length == 1) {
            resultCor = "sample size of one"
        }
        setCorrelation(resultCor);
    }


    // GET DATA EXAMS
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
            
            <Scatter id="scatterChart" options={options} plugins={[bgColor, hQuadrentLine, vQuadrentLine]} data={chartData(toChartPaneList(), colorArray)} />
            <button className="download" onClick={() => downloadPDF(datasetSize, standDevScore, standDevTime, correlation, quad1Per, quad2Per, quad3Per, quad4Per)}>Download PDF</button>
            <div className="statsDisplay">
                <div className="statsCards">
                    <h4 id="statDatasetSize">Size of Dataset<br/>{datasetSize}</h4>
                    <h4 id="statStandardDeviationScore">Standard Deviation (Score)<br/>{standDevScore}</h4>
                    <h4 id="statStandardDeviationTime">Standard Deviation (Time)<br/>{standDevTime}</h4>
                    <h4 id="statCorrelation">Correlation (Score)vs(Time)<br/>{correlation}</h4>
                </div>
                <div className="statsCards">
                    <h4 id="percentInQ1">% in Q1<br/>(Genius)<br/>{quad1Per} %</h4>
                    <h4 id="percentInQ2">% in Q2<br/>(Expected Behavior)<br/>{quad2Per} %</h4>
                    <h4 id="percentInQ3">% in Q3<br/>(Over-Confident)<br/>{quad3Per} %</h4>
                    <h4 id="percentInQ4">% in Q4<br/>(Need External Help)<br/>{quad4Per} %</h4>
                </div>
            </div>
            
        </div>
    );
}

export default ChartPane;