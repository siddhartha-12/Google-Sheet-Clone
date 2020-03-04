let rowIndex;
let columnIndex;
let rowCount;
let columnCount;
let table;

function onLoad()
{
    window.rowIndex = 1;
    window.columnIndex = 0;
    window.rowCount=1;
    window.columnCount='a';
    window.table = document.getElementById("table");
    quoDelete();

}

function addRow() {
    document.getElementById("rowCheck").innerHTML = "Row index is: " + window.rowIndex;
    let row;
    if(window.rowIndex==undefined || window.rowIndex==-1)
    {
        window.rowIndex==0;
        row = window.table.insertRow();
    }
    else
    { 
    row= window.table.insertRow(window.rowIndex+1);
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
  function quoDelete()
  {
      let del = Document.getElementById('btnDelteRow');
  }

  function deleteRow() {

    row= window.table.deleteRow(window.rowIndex+1);

  }

  function addColumn(){
    let table = document.getElementById("table");
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