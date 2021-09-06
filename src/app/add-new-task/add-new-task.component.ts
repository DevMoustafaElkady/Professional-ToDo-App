import { TodoService } from './../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss']
})
export class AddNewTaskComponent implements OnInit {
  groupsList :any[]= [];

  constructor(public todoSer: TodoService, private router: Router) {


  }

  ngOnInit(): void {
    this.groupsList = this.todoSer.groupData;

  }

  submitForm(form: NgForm) {
    if(form.invalid) {
      return
    }
    try {
      this.todoSer.addNew(form.value);
      this.router.navigate(['/'])
    } catch (error) {
console.log(error)
    }
  }

}
