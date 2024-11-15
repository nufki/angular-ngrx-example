import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
      map(data => this.mapToModel(data)),
    );
  }

  private mapToModel(data: any[]): Item[] {
    return data.map(item => ({
      id: item.id,
      name: item.name
    }));
  }
}



