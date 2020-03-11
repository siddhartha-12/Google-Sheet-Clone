import { Observable,fromEvent,Subject, from } from 'rxjs';
import{ map, tap,bufferCount,mergeMap,sequenceEqual, } from 'rxjs/operators';
import { buffer,debounceTime,filter} from 'rxjs/operators';

// var cells = document.querySelectorAll('table tr td');
// var table = document.getElementById('table');

// var cellClick = fromEvent(table, 'click')
// var cellClickSub =  cellClick.subscribe(() => console.log('Clicked! ' + this));

// table.addEventListener('click', function()
// {
    
//     cells = document.querySelectorAll('table tr td');

// })

