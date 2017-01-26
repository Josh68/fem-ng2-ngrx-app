import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Item} from '../common/models/item.model';

@Component({
  selector: 'item-detail',
  template: `
  <div class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedItem.id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedItem.id">Create New Item</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form [formGroup]="itemForm"
          (submit)="saved.emit(selectedItem)" novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Name</label>
            <input [(ngModel)]="selectedItem.name" 
              formControlName="itemName"
              name="name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Item Description</label>
            <input [(ngModel)]="selectedItem.description" 
              formControlName="itemDescription"
              name="description"
              placeholder="Enter a description"
              class="mdl-textfield__input" type="text">
          </div>
      </form>
    </div>
    <div class="mdl-card__actions">
        <button type="submit" [disabled]="!itemForm.valid" (click)="cancelled.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
        <button type="submit" [disabled]="!itemForm.valid" (click)="saved.emit(selectedItem)"
          class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
    </div>
  </div>
  `
})
export class ItemDetail {
  originalName: string;
  selectedItem: Item;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  @Input() set item(value: Item){
    console.log('item detail input', value);
    if (value) this.originalName = value.name;
    this.selectedItem = Object.assign({}, value);
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      itemName: [this.selectedItem.name, Validators.required],
      itemDescription: [this.selectedItem.description, Validators.required]
    });
  }
}
