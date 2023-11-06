import { read, utils } from 'xlsx';
//import { 'testHi.xlsx'} from './resource'
import FileSaver from 'file-saver'
import { EXAM_ANALYSIS_DATA_TEMPLATE } from '../resource/excelConstants';
import { useState } from 'react';
import { elements } from 'chart.js';

//TESTING
/* const [excelData, setExcelData] = useState({
    email: "",
    course_number: "",
    semester: "",
    year: -1,
    time: -1,
    score: -1,
    outlier: true
}) */
//TESTING
/* const handleChange = (e) => {
    console.log('file input changeing', e);
}
 */
/** upload excel file and verify*/
async function handleFileAsync(user_id) {

    //CLEAR LOCAL STORAGE FOR TEST
    localStorage.clear();


    const file = document.getElementById('inputFile').files;

    if (file.length > 0) {
        const fileName = file[0].name;
        console.log(fileName);
        const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        console.log(extension);

        if (extension === 'xlsx') {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file[0]);
            reader.onload = function (e) {
                console.log(file);

                const data = e.target.result;
                const workbook = read(data);

                console.log(workbook);

                //const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const worksheet = workbook.Sheets["DATA"];
                const jsonData = utils.sheet_to_json(worksheet, { defval: "" });

                //console.log(JSON.stringify(jsonData));

                //dataByClassToLocal(jsonData);
                let classes = classFromExcelToDB(jsonData, user_id);
                let exams = examFromExcelToDB(jsonData, user_id);

                //classes.forEach((element) => checkClassDB(element));
                //classes.forEach((element) => postClassData(element));
                //exams.forEach((element) => postExamData(element));

                let classPromises = [];
                let examPromises = [];
                for (let i = 0; i<classes.length; i++) {
                    let promise = postClassData(classes[i]);
                    classPromises.push(promise);
                }

                Promise.all(classPromises).then( results => {
                    console.log("CLASS Promise. ALL RETURNED");
                    for(let i=0; i<exams.length; i++) {
                        let promise = postExamData(exams[i]);
                        examPromises.push(promise);
                    }
                    Promise.all(examPromises).then( results => {
                        console.log("EXAM Promise. ALL RETURNED");
                    })
                })


                window.dispatchEvent(new Event('storage'));
            }


        }


        //CLEAR LOCAL STORAGE FOR TEST
        localStorage.clear();
    }


}


//post CLASS and EXAM async
/* async function asyncPost(classData, examData) {
    let classRes = classData.forEach((element) => postClassData(element));
    let examRes = examData.forEach((element) => postExamData(element));
    let result = {"Class Res": classRes, "Exam Res": examRes};
    return result;
} */




/**Class for Post excel file data to database
 * Course_Number >> 
 * Semester >> 
 * Year >> 
 */
function classFromExcelToDB(jsonData, user_id) {

    let classes = [];

    jsonData.forEach(element => {

        let classInfo = {
            "className": `${user_id}${element.Course_Number}${element.Semester}${element.Year}`,
            "courseNumber": element.Course_Number,
            "semester": element.Semester,
            "year": element.Year
        };

        console.log(`CLASS INFO for Data from Excel to DB: ${JSON.stringify(classInfo)}`);

        if (classes.some(e => (e.courseNumber === classInfo.courseNumber) && (e.semester === classInfo.semester) && (e.year === classInfo.year))) {

        } else {
            classes.push(classInfo);
        };

    });

    console.log(classes);
    return classes;
}

/**Post Class to Database */
async function postClassData(data) {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/addclass`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(response);
        return response;
    } catch (err) {
        console.log(err)
    }
}

/**Check if Class already in Database 
 * DOES NOT WORK
*/
/* async function checkClassDB(data) {
    try {
        // check for matching class row in table
        //const className = data.className;
        const parmas = `course_number=${data.courseNumber}`
        console.log("TEST check db");
        const response = await fetch(`http://localhost:4000/class_match?${parmas}`);
        const json = await response.json();
        console.log("check class db JSON: ");
        console.log(json);
        console.log("the class db json");
    } catch (err) {
        console.log(err)
    }
}
 */

/**Exam for Post excel file data to database
 * Course_Number >> 
 * Semester >> 
 * Year >> 
 * Project_Group
 * Time >> 
 * Score >> 
 * Experience
 * Stressor
 * Outlier >> 
 */
function examFromExcelToDB(jsonData,  user_id) {

    let exams = [];

    jsonData.forEach(element => {

        let experience = false;
        if (element.Experience == "") { experience = false; }
        else { experience = true; }


        let stressor = false;
        if (element.Stressor == "") { stressor = false; }
        else { stressor = true; }


        let outlier = false;
        if (element.Outlier == "") { outlier = false; }
        else { outlier = true; }


        let examInfo = {
            "courseName":  user_id+element.Course_Number+element.Semester+element.Year,
            "courseNumber": element.Course_Number,
            "semester": element.Semester,
            "year": element.Year,
            "projectGroup": element.Project_Group,
            "time": element.Time,
            "score": element.Score,
            "experience": experience,
            "stressor": stressor,
            "outlier": outlier
        };

        console.log(`CLASS INFO for Data from Excel to DB: ${JSON.stringify(element)}`);

        exams.push(examInfo);

    });

    console.log(exams);
    return exams;
}


/**Post Exam to Database */
async function postExamData(data) {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/addexam`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        console.log(response);
    } catch (err) {
        console.log(err)
    }
}


/**Store excel file data as JSON obj in arry value with key of constructed name 
 * name == Course_Number + Semester + Year
 * store in local storage
 */
function dataByClassToLocal(jsonData) {

    jsonData.forEach(element => {
        //console.log(element);
        //let data = JSON.parse(element);
        let className = "" + element.Course_Number + element.Semester + element.Year;
        console.log(className);

        if (Object.keys(localStorage).includes(className)) {
            let item = localStorage.getItem(className);
            console.log(item);
            //console.log(JSON.stringify(element));
            //console.log(Array.isArray(item));
            if (!Array.isArray(item)) {
                let recordArray = [];
                recordArray.push(item);
                recordArray.push(JSON.stringify(element));
                localStorage.setItem(className, recordArray);
            } else {
                item.push(JSON.stringify(element));
                localStorage.setItem(className, item);
            }

        } else {
            let recordArray = [];
            recordArray.push(JSON.stringify(element));
            localStorage.setItem(className, recordArray);
        }

    });

    //console.log(localStorage.getItem('CS633SPRING2020'));

    console.log(Object.keys(localStorage));
}



//For handleTemplateDownload help
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}


//On Click for downloading excel template
function handleTemplateDownload() {

    let dataBlob = EXAM_ANALYSIS_DATA_TEMPLATE;

    var blob = new Blob([s2ab(atob(dataBlob))], {
        type: ''
    });

    let url = URL.createObjectURL(blob);

    console.log(url);

    var link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'ExamAnalysisDataTemplate.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();


}

export { handleFileAsync, handleTemplateDownload }