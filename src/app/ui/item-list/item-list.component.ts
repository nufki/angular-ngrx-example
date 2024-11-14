import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {selectAllItems} from "../../store/item.selectors";
import {ItemActions} from "../../store/item.actions";
import {Item} from "../../store/item.model";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]> | undefined;

  constructor(private readonly store: Store) {
    this.items$  = this.store.select(selectAllItems);
  }

  ngOnInit() {
    this.store.dispatch(ItemActions.loadItems());
  }

  onReverseOrder() {
    this.store.dispatch(ItemActions.reverseOrder());  // Dispatch the reverse order action
  }
}


