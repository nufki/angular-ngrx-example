import {Component} from '@angular/core';
import {TaskListComponent} from "./ui/task-list/task-list.component";
import {TaskManagerComponent} from "./task-manager/task-manager.component";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    TaskListComponent,
    TaskManagerComponent,
    RouterOutlet
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ngrx-example';

}
