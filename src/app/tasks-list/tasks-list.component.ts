import { TodoFilter, groupEnumName, nextweek, getKeyByvalue, groupEnum } from './../models/todo';
import { TodoService } from './../services/todo.service';
import { Component, OnInit, Query } from '@angular/core';
import { Todo } from '../models/todo';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})

export class TasksListComponent implements OnInit {
  groupEnum = groupEnum;
  selectedItems: Todo[] = [];
  searchVal: string = '';
  groupEnumName = groupEnumName;
  groupsList :any[] = [];
  todoFilter: TodoFilter = new TodoFilter();
  pageType: string = '';

constructor(public todoSer: TodoService, private route: ActivatedRoute, private router :Router) {
  this.route.params.subscribe((res:any) => {
    res && res.pageType ? this.pageType = res.pageType : this.pageType = '';

   if (this.pageType == 'today') {
     this.todoSer.setTitle('Today');
     this.todoFilter = new TodoFilter();
     this.todoFilter.date = new Date() ;
    } else if (this.pageType == 'isDeleted') {
      this.todoSer.setTitle('Deleted');
      this.todoFilter = new TodoFilter();
      this.todoFilter.isDeleted = true
    } else if (this.pageType == 'isCompleted') {
      this.todoSer.setTitle('Completed');
      this.todoFilter = new TodoFilter();
      this.todoFilter.isCompleted = true
    } else if (this.pageType == 'week') {
      this.todoSer.setTitle('Next week');
      this.todoFilter = new TodoFilter();
      this.todoFilter.dateRange = {
        firstDate : new Date(),
        lastDate : nextweek()
      }
    } else if (this.pageType == 'all' || this.pageType == 'home') {
      this.todoSer.setTitle('All');
      this.todoFilter = new TodoFilter();
    } else if (this.pageType == 'group' ) {

      this.todoFilter = new TodoFilter();
      let groupId: string = '';
      this.route.queryParams.subscribe((params:any )=> {
        params && params.groupId ?  groupId = params.groupId : null;
        this.todoFilter.groupId  = groupId;
        this.todoSer.setTitle( groupEnumName[getKeyByvalue(this.groupEnum, Number(groupId))] + ' /');
        this.todoSer.getAllTodos(this.todoFilter)

      })

    }else {
      this.todoSer.setTitle('All');
      this.router.navigate(['/'])
      this.todoFilter = new TodoFilter();

    }
    this.todoSer.getAllTodos(this.todoFilter)


  });
}

checkItem: any;
ngOnInit(): void {
  this.groupsList = this.todoSer.groupData;
    this.todoSer.todos$.subscribe(res=> {
      console.log(res)
    })
  }
selectItem(e:MatCheckboxChange,item:Todo, i: number) {
  if(e.checked) {
    const itemIndex = this.selectedItems.findIndex((el:Todo, ix:number)=> i == ix);
  itemIndex < 0  && this.selectedItems.push(item);
} else {
 const itemIndex = this.selectedItems.findIndex((el:Todo, ix:number)=> i == ix);
 this.selectedItems.splice(itemIndex,1);
}
console.log('this.selectedItems', this.selectedItems);
}
todosDone() {
  this.todoSer.patchField(this.selectedItems, 'isCompleted', true, this.todoFilter);
}
todosDelete() {
  this.todoSer.patchField(this.selectedItems, 'isDeleted', true,this.todoFilter);
}
checkFileld(obj:any,val:string): boolean{
  return obj[val];
}
search() {
  console.log('this.todoFilter',this.todoFilter)
this.todoSer.getAllTodos(this.todoFilter)
}
getArrValue(val:any): Todo[] {
return val
}
}
