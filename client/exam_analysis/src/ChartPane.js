import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, Colors } from "chart.js/auto";
import './ChartPane.css';
import './scripts/ChartHandling';
import { colorArray } from './resource/color';
import { makeDataset, downloadPDF } from './scripts/ChartHandling';
import { useState, useEffect } from 'react';




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
    elements: {
        point: {
            pointStyle: 'rectRot'
        }
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Score',
                color: 'rgb(0,0,0)'
            },
            //max: 100,
            ticks: {
                stepSize: 5,
                includeBounds: false
            },
            afterDataLimits: function(axis) {
                if (axis.max < 90){
                    axis.max +=10;
                } else {
                    axis.max = 100;
                    axis.max +=1;
                }
                //axis.max +=1;
                if (axis.min >= 5) {
                    axis.min -=2;
                }                
            }
        },
        x: {
            title: {
                display: true,
                text: 'Time',
                color: 'rgb(0,0,0)'
            },
            //suggestedMax: 100,
            ticks: {
                stepSize: 10,
                includeBounds: false
            },
            afterDataLimits: function(axis) {
                if (axis.min >= 10) {
                    axis.min -=10;
                }
                axis.max +=1;
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






function ChartPane({ toChartPaneList, toChartPaneExams }) {

    /**EXAM LIST FROM DB */
    const [exams, setExams] = useState();
    /**User ID */
    const [userID, setUserID] = useState(1);

    useEffect(() => {
            setExams(toChartPaneExams);
    },[toChartPaneExams]);


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
            <Scatter id="scatterChart" options={options} plugins={[bgColor]} data={chartData(toChartPaneList(), colorArray)} />
            <button className="download" onClick={downloadPDF}>Download PDF</button>
        </div>
    );
}

export default ChartPane;