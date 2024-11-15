import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Item} from "../+state/item.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  fetchItems(): Observable<Item[]> {
    return this.http.get<any[]>(environment.itemAPIUrl).pipe(
      map(data => this.mapToModelArray(data))
    );
  }

  private mapToModelArray(data: any[]): Item[] {
    return data.map(item => this.mapToModelSingle(item));
  }

  private mapToModelSingle(item: any): Item {
    return {
      id: item.id,
      name: item.name,
      description: item.description
    } as Item;
  }
  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(environment.itemAPIUrl, item).pipe(
      tap(response => console.log('Server response for addItem:', response)),
      map(response => this.mapToModelSingle(response))
    );
  }
}



