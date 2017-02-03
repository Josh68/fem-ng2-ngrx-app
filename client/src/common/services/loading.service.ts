/**
 * Created by schneij on 1/30/2017.
 */

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export default class LoadingService {
  loading$: Subject<boolean> = new Subject<boolean>();

  isLoading(loading: boolean): void {
    this.loading$.next(loading);
  }
}

