import {Component} from '@angular/core';
import {TaskListComponent} from "./ui/item-list/task-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    TaskListComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ngrx-example';

}
