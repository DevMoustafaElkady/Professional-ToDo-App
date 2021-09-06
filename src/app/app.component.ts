import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  panelOpenState = false;
  title = 'ToDo-List';
  groupsList:any[] = [];
  constructor(public todoSer:TodoService) {
    this.groupsList = this.todoSer.groupData;

  }
}
