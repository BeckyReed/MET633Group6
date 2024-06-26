import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { jsPDF } from "jspdf";
import {autoTable} from "jspdf-autotable"

/** Test Data */
const test_data = [
    { x: 5, y: 3 }
];



/**Get data from DB and assign to x,y values in datasets */
function prepDbDataXY(classesShown, userId, examData, classKey) {

    /**test with first item in local */
    let classKeys = new Map();

    console.log('ELEMENTS CLASSES SHOWN');
    console.log(classesShown);

    classesShown.forEach(element => {
        console.log(`ELMENT COURSE NAME FOR PREP DB DATA XY:  ${element}`);
        classKeys.set(`${element}`, `${userId}${element}`);
    });



    //if (classKeys.includes(classKey)) {

    let stringData = JSON.stringify(examData);



    console.log("STRING Data:  " + stringData);

    let jsonData = examData;
    console.log('JSON Data:  ' + jsonData);

    if (jsonData != `[null]`) {
        // let jsonData = JSON.parse(stringData);
        // let stringArray = [stringData];
        let result = [];
        // let startArray = Array.from(stringArray);
        // console.log('START ARRAY');
        // console.log(startArray);
        jsonData.forEach(element => {

            if (classKeys.get(classKey) == element.class_name) {
                console.log('element: ' + element);
                let x = element.time_min;
                console.log(`ELEMENT.time: ` + x);
                let y = element.score;
                console.log(`ELEMENT.score: ` + y);
                let point = { x, y };
                result.push(point);
            }
        });

        console.log(`JSON result: ` + result);

        return result;
    }
    //return 'string data ' + stringData;
    //}


    //return [];


}


/**Get data from Local and assign to x,y values in datasets */
/* function prepLocalDataXY(classKey) {

    //test with first item in local
    let classKeys = Object.keys(localStorage);


    if (classKeys.includes(classKey)) {

        let stringData = `[` + localStorage.getItem(classKey) + `]`;



        console.log("STRING Data:  " + stringData);

        let jsonData = JSON.parse(stringData);
        console.log('JSON Data:  ' + jsonData);

        if (jsonData != `[null]`) {
            //let jsonData = JSON.parse(stringData);
            //let stringArray = [stringData];
            let result = [];
            //let startArray = Array.from(stringArray);
            //console.log(startArray);
            jsonData.forEach(element => {
                console.log('element: ' + element);
                let x = element.Time;
                console.log(`ELEMENT.time: ` + x);
                let y = element.Score;
                console.log(`ELEMENT.score: ` + y);
                let point = { x, y };
                result.push(point);
            });

            console.log(`JSON result: ` + result);

            return result;
        }
        return 'string data ' + stringData;
    }


    return [];


}
 */

/** Make datasets */
function makeDataset(classesShown, userId, examData, classKey, color) {

    console.log(`MAKE DATASET: classKey: ` + classKey);



    console.log('ELEMENT FROM MAKE DATASET CLASSES SHOWN');
    console.log(classesShown);

    //let data = prepLocalDataXY(classKey);
    let data = prepDbDataXY(classesShown, userId, examData, classKey);

    console.log(`COLOR from Make DATASET: ` + classKey + ` : ` + color);

    let datasetObj = {
        label: classKey,
        data: data,
        backgroundColor: color
    };

    return datasetObj;

}


/**Resize Chart before Printing event handeler */
/* function beforePrintHandler () {
    for (let id in Chart.instances) {
        Chart.instances[id].resize();
    }
}
 */

/** Test create Chart */
/* let testChart = {
    datasets: [
        // {
        //            label: 'class 1',
          //          data: test_data,
            //        backgroundColor: 'rgb (0, 255, 255)'
              //  }  
        prepLocalDataXY()
    ]
}; */


//Make PDF with jsPDF
function downloadPDF(datasetSize, standDevScore, standDevTime, correlation, quad1Per, quad2Per, quad3Per, quad4Per) {
    const canvas = document.getElementById('scatterChart');

    const canvasImage = canvas.toDataURL('image/jpeg', 1.0);

    const pdf = new jsPDF('landscape');
    pdf.setFontSize(16);
    pdf.addImage(canvasImage, 'JPEG', 10, 15, 270, 140);


    const headers = ["Statistic", "Value", "Quadrants", "%"];

    const data = [
        [`Dataset Size: `, `${datasetSize}`, `% in Q1 (Genius): `, `${quad1Per} %`],
        [`Standard Deviation (Score): `, `${standDevScore}`, `% in Q2 (Expected Behavior): `, `${quad2Per} %`],
        [`Standard Deviation (Time): `, `${standDevTime}`, `% in Q3 (Over-Confident): `, `${quad3Per} %`],
        [`Correlation (Score)vs(Time): `, `${correlation}`, `% in Q4 (Need External Help): `, `${quad4Per} %`]
    ];

    const options = {
        startY: 155,
        tableWidth: 'wrap'
    }

    pdf.autoTable(headers, data, options);

/*     pdf.text(`Dataset Size: ${datasetSize}`, 20, 170);
    pdf.text(`Standard Deviation (Score): ${standDevScore}`, 20, 176);
    pdf.text(`Standard Deviation (Time): ${standDevTime}`, 20, 182);
    pdf.text(`Correlation: ${correlation}`, 20, 188); */
    pdf.save('Exam Analysis');
}


export { makeDataset, downloadPDF };