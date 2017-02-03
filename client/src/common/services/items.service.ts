import {Http, Headers} from '@angular/http';
import {Injectable, Inject} from '@angular/core';

import LoadingService from './loading.service.ts';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {AppStore} from '../models/appstore.model';
import {Item} from '../models/item.model';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

import * as _ from 'lodash';

@Injectable()
export class ItemsService {
  items: Observable<Array<Item>>;

  constructor(
      private http: Http,
      private store: Store<AppStore>,
      private loadingService: LoadingService
    ) {
    console.log('store', store);
    this.items = store.select<Array<Item>>('items').publish().refCount().share();
  }

  loadItems() {
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: 'ADD_ITEMS', payload }))
      .subscribe(action => this.store.dispatch(action));
    /*
    // My understanding ... Here's the only subscribe, and once the action is dispatched
    // the state, when updated, will trigger this.items (an observable) to be updated
    // In the component, the async-bound (with a pipe) 'items' property is mapped to itemsService.items
    // so when the observable updates, so will the bound property
    */
  }

  saveItem(item: Item) {
    //this.loadingService.isLoading(true);
    return (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .map(payload => ({ type: 'CREATE_ITEM', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  updateItem(item: Item) {
    this.loadingService.isLoading(true);
    const updated = this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
      .map(res => res.json())
      .do(payload => {
        if (_.isEqual(item, payload)) {
          this.loadingService.isLoading(false);
          return payload;
        }
        console.log(`error: ${payload}`); //really handle error and isLoading
        return false;
      }, error => {
        console.log(`error: ${error}`); //really handle error and isLoading
        return false;
      });
    updated.subscribe(payload => {
        if (payload) {
          this.store.dispatch({ type: 'UPDATE_ITEM', payload });
        }
      });
  }

  deleteItem(item: Item) {
    //this.loadingService.isLoading(true);
    this.http.delete(`${BASE_URL}${item.id}`)
      .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
  }
}
