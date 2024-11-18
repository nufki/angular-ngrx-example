import {Routes} from '@angular/router';
import {TaskDetailsComponent} from "./task-details/task-details.component";
import {TaskManagerComponent} from "./task-manager/task-manager.component";

export const routes: Routes = [
  {path: 'tasks', component: TaskManagerComponent},
  {path: 'tasks/:id', component: TaskDetailsComponent},
  {path: '', redirectTo: '/tasks', pathMatch: 'full'},
];
