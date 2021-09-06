import { Todo, groupEnum, groupEnumName, getKeyByvalue } from './../models/todo';
import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
item:Todo = new Todo();
groupEnum = groupEnum;
getKeyByvalue = getKeyByvalue;
groupEnumName = groupEnumName;
  constructor(public todoSer: TodoService,private route: ActivatedRoute) {
    this.route.params.subscribe((res:any) => {
      res && res.id ? this.item = this.todoSer.findByName(res.id) : null;
      console.log('item',this.item)
    })
  }
  ngOnInit(): void {
  }

}
