import {Observable} from "rxjs/Observable";
import {Store} from '@ngrx/store';
import {Component} from '@angular/core'
import {WidgetsService} from '../common/services/widgets.service';
import {GadgetService} from '../common/services/gadget.service';
import {WidgetsList} from './widgets-list.component';
import {WidgetDetails} from './widget-details.component';
import {AppStore} from "../common/models/appstore.model";
import {Widget} from "../common/models/widget.model";
import {Gadget} from "../common/models/gadget.model";

@Component({
  selector: 'widgets',
  template: `
    <div class="mdl-grid items">
      <div class="mdl-cell mdl-cell--6-col">
        <widgets-list [widgets]="widgets | async"
        (selected)="selectWidget($event)" (deleted)="deleteWidget($event)"></widgets-list>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <widget-detail [widget]="selectedWidget | async" (saved)="saveWidget($event)" 
        (cancelled)="resetWidget($event)"></widget-detail>
      </div>
    </div>
  `,
  styles: [`
    .widgets {
      padding: 20px;
    }
  `],
  providers: [WidgetsService, GadgetService]
})
export class Widgets {
  widgets: Observable<Array<Widget>>;
  selectedWidget: Observable<Widget>;
  gadget: Observable<Gadget>;

  constructor(private _widgetsService: WidgetsService,
              private _gadgetService: GadgetService,
              private _store: Store<AppStore>) {
    this.selectedWidget = _store.select<Widget>('selectedWidget');
    this.widgets = _widgetsService.widgets;
    this.selectedWidget.subscribe(selWidget => console.log('selected widget', selWidget));

    this.gadget = _gadgetService.gadget;

    _widgetsService.loadWidgets();
  }

  resetWidget(): void {
    let emptyWidget: Widget = {id: null, name: '', price: null};
    this._store.dispatch({type: 'SELECT_WIDGET', payload: emptyWidget});
  }

  selectWidget(widget: Widget): void {
    this._store.dispatch({type: 'SELECT_WIDGET', payload: widget});
  }

  saveWidget(widget: Widget): void {
    console.log('widget', widget);
    this._widgetsService.saveWidget(widget);

    // Generally, we would want to wait for the result of `widgetsService.saveWidget`
    // before resetting the current item.
    this.resetWidget();
  }

  deleteWidget(widget: Widget): void {
    this._widgetsService.deleteWidget(widget);

    // Generally, we would want to wait for the result of `widgetsService.deleteWidget`
    // before resetting the current item.
    this.resetWidget();
  }
}
