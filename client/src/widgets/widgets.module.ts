/**
 * Created by schneij on 2/3/2017.
 */
import {NgModule}       from '@angular/core';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {CommonModule} from '@angular/common'; //necessary for all *ngXX directives
import {Widgets} from './widgets.component';
import {WidgetsList}    from './widgets-list.component';
import {WidgetDetails}  from './widget-details.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    WidgetsList,
    WidgetDetails,
    Widgets
  ]
})
export class WidgetsModule {
}
