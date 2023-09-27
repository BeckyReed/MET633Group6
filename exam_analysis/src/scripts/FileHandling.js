import { read, utils} from 'xlsx';

/** upload excel file and verify*/
async function handleFileAsync() {
    
    //CLEAR LOCAL STORAGE FOR TEST
    localStorage.clear();


    const file = document.getElementById('inputFile').files;

    if (file.length > 0) {
        const fileName = file[0].name;
        console.log(fileName);
        const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        console.log(extension);

        if(extension==='xlsx') {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file[0]);
            reader.onload = function(e) {
            console.log(file);

            const data = e.target.result;
            const workbook = read(data);

            console.log(workbook);

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = utils.sheet_to_json(worksheet, {defval:""});
    
            console.log(JSON.stringify(jsonData));

            dataByClassToLocal(jsonData);

            window.dispatchEvent(new Event('storage'));
        }


    }


    //CLEAR LOCAL STORAGE FOR TEST
    localStorage.clear();
    }


}

/**Store excel file data as JSON obj in arry value with key of constructed name 
 * name == Course_Number + Semester + Year
 * store in local storage
 */
function dataByClassToLocal(jsonData) {

    jsonData.forEach(element => {
        console.log(element);
        //let data = JSON.parse(element);
        let className = "" + element.Course_Number+element.Semester+element.Year;
        console.log(className);

        if(Object.keys(localStorage).includes(className)) {
            let item = localStorage.getItem(className);
            //console.log(item);
            //console.log(JSON.stringify(element));
            //console.log(Array.isArray(item));
            if(!Array.isArray(item)) {
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

    console.log(localStorage.getItem('CS633SPRING2020'));

    console.log(Object.keys(localStorage));
}

export {handleFileAsync}