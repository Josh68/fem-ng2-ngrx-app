/**
 * Created by schneij on 2/3/2017.
 */
import {NgModule}       from '@angular/core';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Items} from './items.component';
import {ItemsList}    from './items-list.component';
import {ItemDetails}  from './item-details.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ItemsList,
    ItemDetails,
    Items
  ]
})
export class ItemsModule {
}
