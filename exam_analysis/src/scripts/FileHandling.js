import { read, utils} from 'xlsx';

/** upload excel file and verify*/
async function handleFileAsync() {
    localStorage.clear();
    const file = document.getElementById('inputFile').files;

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


    //CLEAR LOCAL STORAGE FOR TEST
    localStorage.clear();
}

function dataByClassToLocal(jsonData) {

    //localStorage.setItem('test', []);

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