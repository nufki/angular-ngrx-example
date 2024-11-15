import { Component } from '@angular/core';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent {
  items: string[] = [];

  addItem() {
    const newItem = `Item ${this.items.length + 1}`;
    this.items.push(newItem);
  }
}
