import {Component, OnInit, OnDestroy} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Store} from '@ngrx/store';
import {ItemsService} from '../common/services/items.service';
import LoadingService from '../common/services/loading.service';
import {AppStore} from '../common/models/appstore.model';
import {Item} from '../common/models/item.model';
import {ItemsList} from './items-list.component';
import {ItemDetails} from './item-details.component';

import {Gadget} from '../common/models/gadget.model';
import {GadgetService} from '../common/services/gadget.service';

import * as _ from 'lodash';

@Component({
  selector: 'items',
  template: `
  <div class="mdl-grid items">
    <div class="mdl-cell mdl-cell--6-col">
      <items-list [items]="items | async"
        (selected)="selectItem($event)" (deleted)="deleteItem($event)">
      </items-list>
    </div>
    <div class="mdl-cell mdl-cell--6-col">
      <item-detail
        (saved)="saveItem($event)" (cancelled)="resetItem($event)"
        [item]="selectedItem | async">Select an Item</item-detail>
    </div>
  </div>
  `,
  styles: [`
    .items {
      padding: 20px;
    }
  `],
  providers: [ItemsService, GadgetService, LoadingService],
  entryComponents: [ItemsList, ItemDetails]
})
export class Items implements OnInit, OnDestroy {
  public items: Observable<Array<Item>>;
  public selectedItem: Observable<Item>;
  public gadget: Observable<Gadget>;
  private loadingServiceSubscription: Subscription

  constructor(
    private itemsService: ItemsService,
    private loadingService: LoadingService,
    private gadgetService: GadgetService,
    private store: Store<AppStore>
  ) {
    this.items = itemsService.items;
    this.selectedItem = store.select<Item>('selectedItem');
    //this.selectedItem.subscribe(selItem => console.log('selected item', selItem));

    this.gadget = gadgetService.gadget;

    itemsService.loadItems();
    //this.items.connect();
  }

  resetItem() {
    let emptyItem: Item = {id: null, name: '', description: ''};
    this.store.dispatch({type: 'SELECT_ITEM', payload: emptyItem});
  }

  selectItem(item: Item) {
    this.store.dispatch({type: 'SELECT_ITEM', payload: item});
  }

  saveItem(item: Item) {
    // const onSave = this.items.subscribe(items => { //monitor the save action on state
    //   console.log('check identical: ', _.isEqual(items, this.items));
    //   const updateSuccess = items.filter(i => _.isEqual(i, item)).length > 0; //check that the saved item is there
    //   console.log(`updateSuccess: ${updateSuccess}`);
    //   if (updateSuccess) { //if save succeeded
    //     afterSuccess.call(this); //reset the form and cancel the temporary observer subscribe
    //   }
    // });
    //
    // function afterSuccess() {
    //   this.resetItem();
    //   onsaveUnsubscribe();
    // }
    //
    // function onsaveUnsubscribe() { //check not already unsubscribed and unsubscribe
    //   if (onSave.unsubscribe) {
    //     onSave.unsubscribe();
    //   }
    // }

    this.itemsService.saveItem(item); //perform the save

    // setTimeout(onsaveUnsubscribe, 10000); //cleanup if needed
  }

  deleteItem(item: Item) {
    this.itemsService.deleteItem(item);

    // Generally, we would want to wait for the result of `itemsService.deleteItem`
    // before resetting the current item.
    // this.resetItem();
  }

  ngOnInit() {
    this.loadingServiceSubscription = this.loadingService.loading$
      .subscribe(loading => {
        if (!loading) {
          this.resetItem();
        }
      });
  }

  ngOnDestroy() {
    this.loadingServiceSubscription.unsubscribe();
  }
}
