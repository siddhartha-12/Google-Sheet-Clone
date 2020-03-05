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
    quoDelete();
    window.table.addEventListener("click", function()
        {
            //alert("Event happened") //Test if event is working by uncommenting the command alert
            quoDelete();
        }
        )
    document.getElementById("rowCheck").innerHTML = "Row index is: " + window.rowIndex;
    //alert("Welcome");

}



function quoDelete()
{
    let del = document.getElementById('btnDelteRow');
    if(window.rowIndex>=1 && window.table.rows.length>2)
    {
        //alert("Disabled");
        del.disabled=false;
    }
    else
    {
        del.disabled=true;
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

  }

  function addColumn(){

    var row = document.getElementById("tblHeader");
        if(window.columnIndex==undefined || window.columnIndex==-1)
        {
           // let colIn = window.table.rows[0].cells.length;
           
            var x = row.insertCell(window.table.rows[0].cells.length);
            x.classList.add("tHeader");
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
            var x = row.insertCell(window.columnIndex+1);
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
  }
  function updateColumnHead()
  {
    var row = document.getElementById("tblHeader");
    for(var i=0;i<window.table.rows.cells.length;i++)

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
