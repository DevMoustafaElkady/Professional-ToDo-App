import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
redirectTo: '/home' , pathMatch: 'full',
data: {title: 'All'}
},
  /* {
    path: 'home',
    component: AddNewComponent,
    data: {title: 'All'}
  }, */
  {
    path: 'taskslist',
    component: TasksListComponent,
    data: {title: 'All'}
  },
  {
    path: 'addtask',
    component: AddNewTaskComponent,
    pathMatch: 'full'
  },
  {
    path: ':pageType',
    component: TasksListComponent,
  },

  {
    path: 'taskdetails/:auther',
    component: TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
