import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {selectAllItems, selectItemLoading} from "../../+state/item.selectors";
import {ItemActions} from "../../+state/item.actions";
import {Item} from "../../+state/item.model";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]> | undefined;
  loading$: Observable<boolean> | undefined;
  newItemName: string = '';
  newItemDescription: string = '';

  constructor(private readonly store: Store) {
    this.items$  = this.store.select(selectAllItems);
    this.loading$ = this.store.select(selectItemLoading)
  }

  ngOnInit() {
    this.store.dispatch(ItemActions.loadItems());
  }

  onReverseOrder() {
    this.store.dispatch(ItemActions.reverseOrder());  // Dispatch the reverse order action
  }

  onAddItem() {
    if (this.newItemName.trim() && this.newItemDescription.trim()) {
      this.store.dispatch(ItemActions.addItem({
        item: {
          name: this.newItemName.trim(),
          description: this.newItemDescription.trim()
        }
      }));
      this.newItemName = '';
      this.newItemDescription = '';
    }
  }

}


