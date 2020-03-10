let rowIndex;
let columnIndex;
let rowCount;
let columnCount;
let table;

function onLoad()
{
    window.rowIndex = -1;
    window.columnIndex = -1;
    window.rowCount=1;
    window.columnCount='a';
    window.table = document.getElementById("table");
    
    window.initialSetup();
    window.table.addEventListener("click", function()
        {
            //alert("Event happened") //Test if event is working by uncommenting the command alert
            quoButton();
        }
        )
    document.getElementById("rowCheck").innerHTML = "Row index is: " + window.rowIndex;
    //alert("Welcome");

}

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
            q.setAttribute( "contenteditable", "true" );
            
        }
    window.rowIndex = -1;
    window.columnIndex = -1;
    window.updateRowNumber();
    window.quoButton();
  }


  function deleteRow() {
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

  function addColumn(){

    let row = document.getElementById("tblHeader");
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
                x.setAttribute( "contenteditable", "true" );
                
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


  function updateColumnHead()
  {
    let row = document.getElementById("tblHeader");
    for(let i=1;i<window.table.rows[0].cells.length;i++)
    {
        window.table.rows[0].cells[i].innerHTML = String.fromCharCode(64+i);
    }

  }

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

function updateRowNumber()
{
    let i;
    for(i=1;i<window.table.rows.length;i++)
    {
        window.table.rows[i].cells[0].innerHTML = i;
    }
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

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

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function Upload() {
    let fileUpload = document.getElementById("fileUpload");
    let regex = /.+(\.csv)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            reader.onload = function (e) {
                window.tableEmpty();
                // //var table = document.createElement("table");
                let rows = e.target.result.split("\n");
                let headerFlag = 0;
                for (let i = 1; i < rows.length; i++) {
                    let cells = rows[i].split(",");
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

function getCellValue(cellAddress)
{
    alert("555")

}