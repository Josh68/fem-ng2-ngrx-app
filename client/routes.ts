import { Items } from './src/items/items.component';
import { Widgets } from './src/widgets/widgets.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: Items,
    data: {title: 'Items'}
  },
  {
    path: 'items',
    component: Items,
    data: {title: 'Items'}
  },
  {
    path: 'widgets',
    component: Widgets,
    data: {title: 'Widgets'}
  },
  {
    path: '*',
    component: Items,
    data: {title: 'Items'}
  }
];
