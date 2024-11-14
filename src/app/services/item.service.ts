import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Item} from "../store/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/items';

  // constructor(private apollo: Apollo) {}
  constructor(private http: HttpClient) {}

  fetchItems(): Observable<Item[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
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



