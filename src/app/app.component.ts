import {Component} from '@angular/core';
import {ItemListComponent} from "./ui/item-list/item-list.component";


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    ItemListComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ngrx-example';

}
