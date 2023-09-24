import { read, utils} from 'xlsx';

/** upload excel file and verify*/
async function handleFileAsync() {

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
    }


}

export {handleFileAsync}