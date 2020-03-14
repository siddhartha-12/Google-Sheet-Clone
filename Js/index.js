const { fromEvent } = rxjs;
const { map, pipe } = rxjs.operators;

let rowIndex; //Global variable which maintains the row index
let columnIndex; //Global variable which maintains the column index
let rowCount; //Global variable which maintains the row count
let columnCount; //Global variable which maintains the column count
let table; ////Global variable which maintains the table dom
/* The function is executed during the first load of the web page. It is responsible to set the initial global variables
that would track the current state of cells and their locations
*/
let formCells;
let cells;
//let fetchNumbers$;
function onLoad()
{
    window.rowIndex = -1;
    window.columnIndex = -1;
    window.rowCount=1;
    window.columnCount='a';
    window.table = document.getElementById("table");
    window.formCells = []
    window.initialSetup();
    // Adding event listener for updating the status quo of the buttons 
    window.table.addEventListener("click", function()
        {
            //alert("Event happened") //Test if event is working by uncommenting the command alert
            quoButton();
        }
        ) 
    document.getElementById("rowCheck").innerHTML = "Row index is: " + window.rowIndex;
    //alert("Welcome");
}
/*
This function is used to generate the intial excel rows and columns and is being called in the onload function
*/
function initialSetup()
{
    for(let i=1;i<15;i++)
    {
        window.addRow();
    }
    for(let i=0;i<15;i++)
    {
        window.addColumn();
    }
    
    
}


/*
This function is responsible to maintain the status quo of the buttons. if the number of columns is at threshold, the
add column function is disabled. If the number of rows is equal to the threshold, it disables the add row button
*/
function quoButton()
{
    let del = document.getElementById('btnDelteRow');
    let delComun = document.getElementById('btnDelCol');
    let addRow = document.getElementById('btnAddRow');
    if(window.table.rows.length>2)
    {
        //alert("Disabled");
        del.disabled=false;
    }
    else
    {
        del.disabled=true;
    }
    
    if(window.table.rows[0].cells.length>2)
    {
        //alert("Disabled");
        delComun.disabled=false;
    }
    else
    {
        delComun.disabled=true;
    }

    if(window.table.rows.length<21)
    {
        //alert("Disabled");
        addRow.disabled=false;
    }
    else
    {
        addRow.disabled=true;
    }
}
function placeSwitch(x)
{
    console.log("Double switch");
    if(x.title.length>1)
    {
        x.innerHTML = x.title;
    }
}

/*
The following function is used to insert the row at a state location. If not state is passed the row will be appended 
at the end of the table. No row will be added if the threshold is reached.
*/
function addRow() {
    document.getElementById("rowCheck").innerHTML = "Row index is: " + window.rowIndex;
    let row;
    if(window.rowIndex==undefined || window.rowIndex==-1)
    {
        window.rowIndex==0;
        row = window.table.insertRow(window.table.rows.length);
    }
    else
    {
    try{row= window.table.insertRow(window.rowIndex+1);}
    catch{row = window.table.insertRow(window.table.rows.length)}
        
    } 
    let q;
        q=row.insertCell(0);
        q.setAttribute( "onClick", "indexer(this)" );
        

        for(i=1;i<window.table.rows[0].cells.length;i++)
        {
            q = row.insertCell(i);
            q.setAttribute( "onClick", "indexer(this)" );
            q.setAttribute( "ondblclick","placeSwitch(this)");
            q.setAttribute( "contenteditable", "true" );
            q.addEventListener('keydown', (evt) => {
                if (evt.keyCode === 13) 
                {
                    checkFormula(evt.target.innerHTML);
                    evt.preventDefault();
                    //console.log("Enter pressed");
                }
            })
            
            
        }
    window.rowIndex = -1;
    window.columnIndex = -1;
    window.updateRowNumber();
    window.quoButton();
  }

/*
The following function is used to delete the row at a state location. If not state is passed the row will be deleted from 
the end of the table. No row will be deleted if only 1 row remains.
*/

  function deleteRow() {
    // Checking for row count validation
    if(window.table.rows.length<=2)
    {
        alert("Cannot have 0 rows in the sheet");
    }
    else
    {
    row= window.table.deleteRow(window.rowIndex);
    window.updateRowNumber();
    }
    window.quoButton();

  }

 /*
The following function is used to insert the column at a state location. If not state is passed the column will be appended 
at the end of the table. No column will be added if the threshold is reached.
*/ 
  function addColumn(){

    let row = document.getElementById("tblHeader");
    // Checking for column count validation
    if(window.table.rows[0].cells.length>26)
    {
        alert("Cannot add more columns");
        return;
    }    
    if(window.columnIndex==undefined || window.columnIndex==-1)
        {
           // let colIn = window.table.rows[0].cells.length;
           
            let x = row.insertCell(window.table.rows[0].cells.length);
            x.classList.add("tHeader");
            x.setAttribute( "onClick", "indexer(this)" );
            for(i=1; i<window.table.rows.length;i++)
            {
                row = window.table.rows[i]
                x = row.insertCell(window.table.rows[i].cells.length);
                x.setAttribute( "onClick", "indexer(this)" );
                x.setAttribute( "ondblclick","placeSwitch(this)");
                x.setAttribute( "contenteditable", "true" );
                x.addEventListener('keydown', (evt) => {
                    if (evt.keyCode === 13) 
                    {
                        //console.log("Value checking" + evt.target.innerHTML);
                        checkFormula(evt.target);
                        evt.preventDefault();
                        checkFormula(x);
                        //console.log("Enter pressed");
                    }
                });
                
                
            }
        }
    else
    {  
        document.getElementById("colCheck").innerHTML = "Column index is: " + window.columnIndex;
            let x = row.insertCell(window.columnIndex+1);
            x.classList.add("tHeader");
            for(i=1; i<window.table.rows.length;i++)
            {
                row = window.table.rows[i]
                x = row.insertCell(window.columnIndex+1);
                x.setAttribute( "onClick", "indexer(this)" );
                x.setAttribute( "contenteditable", "true" );
            } 
    }
    window.updateColumnHead();
    window.quoButton();
  }

  
/*
The following function is used to delete the column at a state location. If no state is passed the column will be deleted from 
the end of the table. No row will be deleted if only 1 row remains.
*/

  function deleteColumn()
  {
      if(window.columnIndex==0)
      {
        alert("Cannot delete row header");
        return; 
      }
      if(window.table.rows[0].cells.length<=2)
      {
          alert("Cannot delete more columns. Atleast 1 required");
          return;
      }
    for(let i=0; i<window.table.rows.length;i++)
    {
        row = window.table.rows[i]
        window.table.rows[i].deleteCell(window.columnIndex);       
    }
    window.updateColumnHead();
    window.quoButton();
  }

/*
The following funcion is responsible to update the header value(A,B,C..) after a column has been added or deleted
*/
  function updateColumnHead()
  {
    let row = document.getElementById("tblHeader");
    for(let i=1;i<window.table.rows[0].cells.length;i++)
    {
        window.table.rows[0].cells[i].innerHTML = String.fromCharCode(64+i);
    }

  }
/*
The following function is called at onclick event of the cell. The purpose of the function is to update the current
pointers to the location of the current cell index and maintain the state so that operations like add column and delete
column can be performed effectively
*/

  function indexer(x)
  {
    let trr = x.parentNode.rowIndex;
    let tdd = x.cellIndex;
    if(window.rowIndex==trr && window.columnIndex==tdd)
    {   
        rowIndex= 0;
        columnIndex= 0
    }
    else
    {
        window.rowIndex=trr;
        window.columnIndex=tdd;
    }
    document.getElementById("tr").innerHTML = "Row index is: " + trr;
    document.getElementById("td").innerHTML = "Column index is: " + tdd;
  }
/*
The following funcion is responsible to update the row header value(1,2,3..) after a row has been added or deleted
*/
function updateRowNumber()
{
    let i;
    for(i=1;i<window.table.rows.length;i++)
    {
        window.table.rows[i].cells[0].innerHTML = i;
    }
}
/*
The following functions combines the data from the html table and is used to create a downloadable CSV file 
*/
function exportTableToCSV(filename) {
    let csv = [];
    let rows = document.querySelectorAll("table tr");
    
    for (let i = 1; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (let j = 1; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
/*
This function is used to initiate file download 
*/

function downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}



/*
The following function is to parse a csv file into HTML table. A regex is used see if the file extension is valid or not 
*/
function Upload() {
    let fileUpload = document.getElementById("fileUpload");
    let regex = /.+(\.csv)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            reader.onload = function (e) {
                window.tableEmpty();
                // //let table = document.createElement("table");
                let rows = e.target.result.split("\n");
                let headerFlag = 0;
                for (let i = 1; i < rows.length; i++) {
                    let cells = rows[i].split(",");
                    // Checks for the header creations of the table. If the column header is generated the flag is turned true
                    if(headerFlag==0)
                    {
                        let row = document.getElementById("tblHeader");
                        for(let q=1;q<cells.length;q++)
                        {
                            let x = row.insertCell(window.table.rows[0].cells.length);
                            x.classList.add("tHeader");
                            x.setAttribute( "onClick", "indexer(this)" );
                        }
                        headerFlag=1;
                    }
                    if (cells.length > 1) {
                        let row = window.table.insertRow(-1);
                        let cell = row.insertCell(0);
                        cell.setAttribute( "onClick", "indexer(this)" );
                        for (let j = 1; j < cells.length; j++) {
                            let cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                            cell.setAttribute( "onClick", "indexer(this)" );
                            cell.setAttribute( "contenteditable", "true" );
                        }
                        headerFlag=1;
                    }
                }
                window.updateRowNumber();
                window.updateColumnHead();
                window.quoButton();
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}
//The following function is used to delete all the rows and columns of the table
function tableEmpty()
{
    let length = window.table.rows.length;
    for(let i=1; i<length;i++)
    {
        row= window.table.deleteRow(length-i)      
    }

    let colLength = window.table.rows[0].cells.length;
    for(let i=1; i<colLength;i++)
    {
        window.table.rows[0].deleteCell(colLength-i);       
    }
    
}
// The following is cellAddress test fuction
function getCellValue(cellAddress)
{
    alert("555");


}

function cellColumnId(letter)
{
 let index = 0;   
 let colId=letter.charCodeAt(index);
 return colId - 64;
}
     
function generateFormula(stringVal)
{   
    
    var formula = "";
    let breaker = stringVal.split('')
    let startPoint = breaker[6];
    if(breaker[7]!=":")
    {
        startpoint = breaker[6] + breaker[7]
    }
    let endPoint = breaker[9];
    if(breaker[10]!=")")
    {
        endPoint = breaker[9] + breaker[10];
    }
    let colValue = window.cellColumnId(breaker[5]); 
    if(stringVal.substring(1,4).toLowerCase()=="sum")
    {
        for(let i= startPoint;i<endPoint;i++)
        {
            if(window.table.rows[i].cells[colValue].innerHTML!="")
            {
                formula=formula + window.table.rows[i].cells[colValue].innerHTML;
                formula = formula + "+";
            }
        }
        formula=formula + window.table.rows[endPoint].cells[colValue].innerHTML;     
    }
    else if(stringVal.substring(1,4).toLowerCase()=="mul")
    {
        for(let i= startPoint;i<endPoint;i++)
        {
            //console.log(i,colValue);
            //console.log(window.table.rows[i].cells[colValue].innerHTML);

            formula=formula + window.table.rows[i].cells[colValue].innerHTML;
            formula = formula + "*";
        }
        formula=formula + window.table.rows[endPoint].cells[colValue].innerHTML;     
    }
    else if(stringVal.substring(1,4).toLowerCase()=="div")
    {
        for(let i= startPoint;i<endPoint;i++)
        {
            //console.log(i,colValue);
            //console.log(window.table.rows[i].cells[colValue].innerHTML);

            formula=formula + window.table.rows[i].cells[colValue].innerHTML;
            formula = formula + "/";
        }
        formula=formula + window.table.rows[endPoint].cells[colValue].innerHTML;     
    }
    else if(stringVal.substring(1,4).toLowerCase()=="sub")
    {
        for(let i= startPoint;i<endPoint;i++)
        {
            //console.log(i,colValue);
            //console.log(window.table.rows[i].cells[colValue].innerHTML);

            formula=formula + window.table.rows[i].cells[colValue].innerHTML;
            formula = formula + "-";
        }
        formula=formula + window.table.rows[endPoint].cells[colValue].innerHTML;     
    }
    else
    {
        
        let currentVal = "";
        for(let q=1;q<stringVal.length;q++)
        {
            //console.log(stringVal[q]);
            if(stringVal[q]=="+" || stringVal[q]=="/" || stringVal[q]=="*" || stringVal[q]=="-" )
            {
                //console.log("Oper");
                //formula = formula + (currentVal.substring(1,currentVal.length));
                
                //console.log("Updated Formula -" + formula );
                if(currentVal!="")
                {
                   // console.log("------>" + currentVal);
                    colValue = window.cellColumnId(currentVal[0]);
                    //console.log("currentVal --- > " + currentVal);
                    //console.log("Row index- >" + currentVal.substring(1,currentVal.length));
                    if(window.table.rows[currentVal.substring(1,currentVal.length)].cells[colValue].innerHTML!="")
                    {
                    formula = formula + window.table.rows[currentVal.substring(1,currentVal.length)].cells[colValue].innerHTML;
                    formula = formula + stringVal[q];
                    }
                }
                //console.log(currentVal);
                currentVal = "";
            }
            else
            {
                currentVal = currentVal+ stringVal[q];
            }
        }
        colValue = window.cellColumnId(currentVal[0]);
        //console.log("last row index - > "+currentVal);
        if(window.table.rows[currentVal.substring(1,currentVal.length)].cells[colValue].innerHTML.length!=0)
        {
        formula = formula + window.table.rows[currentVal.substring(1,currentVal.length)].cells[colValue].innerHTML;
        }
        else
        {
            formula = formula+"0";
        }

        
    }
   // console.log("Formula - > "+ formula);
    // console.log(eval(formula));
    let ans = eval(formula);
    if(ans == "Infinity")
    {
        ans = "err";
    }
    return(ans);
}

// onchange="myFunction()"

function checkFormula(x)
{
    
    let breaker = x.innerHTML;
    //console.log("this is breaker" + breaker);
    try
    {
    
    if(breaker!=undefined && breaker[0]=="=")
    {
        let form = x.innerHTML;
        x.innerHTML = generateFormula(x.innerHTML);
        x.title = form;
        window.formCells.push(x)
    }
    else
    {
        x.title = x.innerHTML;
        if(window.formCells.includes(x))
        {
            window.formCells.pop(x);
        }
        //window.reRunFormula();
    }

    }
    catch(err)
    {
        x.innerHTML="err";
        //console.log(err);
    }
    finally
    {
       
    }

}
function rxjsCall()
{
    //console.log("called");
    const fetchNumbers$ = rxjs.fromEvent(document.querySelectorAll('tr td'), 'keydown');

    //Subscriber
    const storeValues = fetchNumbers$.subscribe((evt) => {
        if (evt.keyCode === 13) 
        {
            checkFormula(evt.target);
            evt.preventDefault();
            console.log("Enter pressed in subscriber ->"+ evt.target.innerHTML);
            reRunFormula();
        }
    });

function reRunFormula()
{
   // console.log("Updating Formula");
    window.formCells.forEach(element => {
        console.log("Revamping formula "+ element.innerHTML);
        element.innerHTML = element.title;
        checkFormula(element);
    });
}


function checkFormulaloop(x)
{
    
    let breaker = x.innerHTML;
    //console.log("this is breaker" + breaker);
    try
    {
    
    if(breaker.substring(0,1)=="=")
    {
        let form = x.innerHTML;
        x.innerHTML = generateFormula(x.innerHTML);
        x.title = form;
        window.formCells.push(x)
    }
    else
    {
        x.title = x.innerHTML;
        if(window.formCells.includes(x))
        {
            window.formCells.pop(x);
        }
        //window.reRunFormula();
    }

    }
    catch(err)
    {
        x.innerHTML="err";
        //console.log(err);
    }
    finally
    {
       
    }
}

    
}
