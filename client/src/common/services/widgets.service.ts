import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';

import {AppStore} from '../models/appstore.model';
import {Widget} from "../models/widget.model";

import {Store} from '@ngrx/store';

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class WidgetsService {
  widgets: Observable<Array<Widget>>;

  constructor(private http: Http, private store: Store<AppStore>) {
    console.log('store', store);
    let currentWidgets = store.select<Array<Widget>>('widgets');
    currentWidgets.subscribe(w => { //use subscribe here to log out widgets any time they change
      console.log('widgets: ');
      console.log(w);
    });
    this.widgets = currentWidgets;
  }

  saveWidget(widget: Widget) {
    (widget.id) ? this.updateWidget(widget) : this.createWidget(widget);
  }

  createWidget(widget: Widget) {
    // this.widgets = [...this.widgets, widget];
    // return(...) //no need to return here
    this.http.post(BASE_URL, JSON.stringify(widget), HEADER)
    .map(res => res.json())
    .map(payload => ({ type: 'CREATE_WIDGET', payload }))
    .subscribe(action => this.store.dispatch(action));
    // .do(data => {
    //   this.widgets = [...this.widgets, data];
    //   return data;
    // });
  }

  // removeWidget(widget: Widget){
  //   return this.http.delete(`${BASE_URL}?id=${widget.id}`)
  //   .map(res => res.json())
  //   .do(removed => {
  //     this.widgets = this.widgets.filter(
  //       (currentWidget) => currentWidget.id !== removed.id
  //     );
  //   })
  // }

  deleteWidget(widget: Widget) {
    this.http.delete(`${BASE_URL}${widget.id}`)
      .subscribe(action => this.store.dispatch({ type: 'DELETE_WIDGET', payload: widget }));
  }

  updateWidget(widget: Widget){
    this.http.put(`${BASE_URL}${widget.id}`, JSON.stringify(widget), HEADER)
      .subscribe(action => this.store.dispatch({ type: 'UPDATE_WIDGET', payload: widget }));
    //return this.http.put(`${BASE_URL}?id=${widget.id}`, JSON.stringify(update), HEADER)
    //.map(res => res.json())
    // .do(updated => {
    //   const index = this.widgets.indexOf(updated);
    //   this.widgets = [
    //     ...this.widgets.slice(0, index),
    //     updated,
    //     ...this.widgets.slice(index + 1)
    //   ]
    // })
  }

  loadWidgets() {
    //return(...) no need to return here
    this.http.get(BASE_URL)
      .map(res => res.json())
      .map(payload => ({ type: 'ADD_WIDGETS', payload }))
      .subscribe(action => this.store.dispatch(action));
      //.do(json => this.widgets = [...this.widgets, ...json])
  }
}
