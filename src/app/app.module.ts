import { MaterialsModule } from './materials/materials.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DatePipe } from '@angular/common';
import { TasksListComponent } from './tasks-list/tasks-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AddNewTaskComponent,
    TaskDetailsComponent,
    TasksListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [

  ],
  providers: [
DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
