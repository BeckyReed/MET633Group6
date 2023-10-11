import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import {jsPDF} from "jspdf";

/** Test Data */
const test_data = [
    { x: 5, y: 3 }
];

/**Get data from Local and assign to x,y values in datasets */
function prepLocalDataXY(classKey) {

    /**test with first item in local */
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

            console.log(`JSON result: `+result);

            return result;
        }
        return 'string data ' + stringData;
    }


    return [];


}


/** Make datasets */
function makeDataset (classKey, color) {

console.log(`MAKE DATASET: classKey: `+ classKey);

    let data = prepLocalDataXY(classKey);

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
let testChart = {
    datasets: [
        /*         {
                    label: 'class 1',
                    data: test_data,
                    backgroundColor: 'rgb (0, 255, 255)'
                }  */
        prepLocalDataXY()
    ]
};


//Make PDF with jsPDF
function downloadPDF() {
    const canvas = document.getElementById('scatterChart');

    const canvasImage = canvas.toDataURL('image/jpeg', 1.0);
    
    const pdf = new jsPDF('landscape');
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 15, 15, 280, 150);
    pdf.save('Exam Analysis');
}


export { test_data, prepLocalDataXY, makeDataset, testChart, downloadPDF };