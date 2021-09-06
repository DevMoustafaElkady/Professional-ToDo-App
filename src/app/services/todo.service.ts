import { Todo, TodoFilter, TodoGrouped } from './../models/todo';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  /* Groups Array */
  groupData: any[] = [
    {
      name: 'Group 1',
      id:1
    },
    {
      name: 'Group 2',
      id:2
    },
    {
      name: 'Our Home ToDos',
      id:3
    },
  ];

  private readonly _todos = new BehaviorSubject<TodoGrouped>(new TodoGrouped([]));
  readonly todos$ = this._todos.asObservable();
  private get todos() : TodoGrouped {
  return this._todos.getValue()
  }

  private set todos(val:TodoGrouped) {
  this._todos.next(val)
  }
   pageTitle$ = new BehaviorSubject<string>('');

  constructor(private datePipe: DatePipe) { }

/* Get All Data Method */
  getAllTodos(filterObj?:TodoFilter) {
    const todoList = JSON.parse(localStorage.getItem('todosDB') || '[]');
    // console.log('date', this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
    if(filterObj) {
      console.log('filter ', filterObj)
      let filteredItems = todoList.filter((el: any) => {
          return (
            (filterObj.search  ? el.title.toLocaleLowerCase().indexOf(filterObj.search.toLocaleLowerCase()) > -1 : true) &&
            (filterObj.group  ? el.group == filterObj.group : true) &&
            (filterObj.dateRange && filterObj.dateRange.firstDate && filterObj.dateRange.lastDate  ? new Date(el.date).getTime() < filterObj.dateRange.lastDate.getTime() && new Date(el.date).getTime() > filterObj.dateRange.firstDate.getTime()  : true) &&
            (filterObj.isDeleted  ? el.isDeleted : !el.isDeleted) &&
            (filterObj.isCompleted  ? el.isCompleted : true) &&
            (filterObj.groupId  ? el.group == filterObj.groupId : true) &&
            (filterObj.date ? this.datePipe.transform(filterObj.date, 'yyyy-MM-dd')  == this.datePipe.transform(el.date, 'yyyy-MM-dd'):true)
      )});
      this.todos = new TodoGrouped(filteredItems);

    } else {
      this.todos = new TodoGrouped(todoList);
    }
  }

  /* Get Data From Localstorage */
  getAllTodosList() {
      return JSON.parse(localStorage.getItem('todosDB') || '[]');
  }

  /* Save All Data To List */
  saveAll(data:Todo[]) {
    localStorage.setItem('todosDB', JSON.stringify(data))
  }

  /* Adding New Data Method */
  addNew(data:Todo) {
    const todoList : Todo[] = JSON.parse(localStorage.getItem('todosDB') || '[]');
    todoList.push(data);
    this.saveAll(todoList)
  }
/* Patch Field */
  patchField(data:Todo[], key:string,val:any, filter: TodoFilter) {
    let allData:Todo[] = this.getAllTodosList()
    allData.map((el:Todo) => {
      data.map((elx:Todo) => {elx.title === el.title && (this.editVal(el,key, val) )});
    })
    this.saveAll(allData)
    this.getAllTodos(filter);
  }
  /* Find By Name */
  findByName(name:any) : any{
    let allData:Todo[] = this.getAllTodosList()
    return allData.filter((el:Todo) => el.title === name)?.length ? allData.filter((el:Todo) => el.title === name)[0] : null;
  }

  editVal(obj:any, key:string, val:any) {
    return obj[key] = val
  }

 /*   formatDate(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  } */
setTitle(title:string) {
  this.pageTitle$.next(title)
}
  /*console.log(thisformatDate('Sun May 11,2014'));*/
}





