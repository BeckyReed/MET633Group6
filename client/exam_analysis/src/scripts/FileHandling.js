import { read, utils } from 'xlsx';
import { EXAM_ANALYSIS_DATA_TEMPLATE } from '../resource/excelConstants';


/** upload excel file and verify*/
async function handleFileAsync(user_id) {

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

                const worksheet = workbook.Sheets["DATA"];
                const jsonData = utils.sheet_to_json(worksheet, { defval: "" });

                let classes = classFromExcelToDB(jsonData, user_id);
                let exams = examFromExcelToDB(jsonData, user_id);

                let classPromises = [];
                let examPromises = [];
                for (let i = 0; i<classes.length; i++) {
                    let promise = postClassData(classes[i]);
                    classPromises.push(promise);
                }

                Promise.all(classPromises).then( results => {
                    console.log("CLASS Promise. ALL RETURNED");
                    /** Adding delay before moving to EXAM table data, to give DB time to complete tasks.
                     *  Had been inconsistently loosing data from EXAM table on hosted version. 
                     */
                    setTimeout(()=>{
                        console.log("DELAY IN Promise. ALL RETURNED");
                        for(let i=0; i<exams.length; i++) {
                            let promise = postExamData(exams[i]);
                            examPromises.push(promise);
                        }
                        Promise.all(examPromises).then( results => {
                            console.log("EXAM Promise. ALL RETURNED");

                            setTimeout(() => {
                                console.log("handle File Async end");
                                window.location.reload(true);
                            }, 500)
                            
                        })
                    }, 2000);
                })
            }
        }

    }


}





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
        if (element.Experience == "1") { experience = true; }
        else { experience = false; }


        let stressor = false;
        if (element.Stressor == "1") { stressor = true; }
        else { stressor = false; }


        let outlier = false;
        if (element.Outlier == "1") { outlier = true; }
        else { outlier = false; }


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