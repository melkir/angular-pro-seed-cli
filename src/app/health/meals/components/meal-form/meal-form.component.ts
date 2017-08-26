import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Meal } from '../../../shared/interfaces';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">

        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              placeholder="e.g. English Breakfast"
              formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>

        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()">
              <img src="/img/add-white.svg">
              Add food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs">
              <span
                class="meal-form__remove"
                (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createMeal()">
              Create meal
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateMeal()">
              Save
            </button>
            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete meal?</p>
              <button
                class="confirm"
                type="button"
                (click)="removeMeal()">
                Yes
              </button>
              <button
                class="cancel"
                type="button"
                (click)="toggle()">
                No
              </button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>
          </div>
        </div>

      </form>
    </div>
  `
})

export class MealFormComponent implements OnChanges {
  @Output()
  create = new EventEmitter<Meal>();

  @Output()
  update = new EventEmitter<Meal>();

  @Output()
  remove = new EventEmitter<Meal>();

  @Input()
  meal: Meal;

  toggled = false;
  exists = false;

  public form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  ngOnChanges() {
    if (!(this.meal && this.meal.name)) return;

    this.exists = true;
    this.emptyIngredients();

    const value = this.meal;
    this.form.patchValue(value);

    if (value.ingredients) {
      for (const item of value.ingredients) {
        this.ingredients.push(new FormControl(item));
      }
    }
  }

  constructor(private fb: FormBuilder) {
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    );
  }

  createMeal() {
    if (this.form.invalid) return;
    this.create.emit(this.form.value);
  }

  updateMeal() {
    if (this.form.invalid) return;
    this.update.emit(this.form.value);
  }

  removeMeal() {
    this.remove.emit(this.form.value);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  private emptyIngredients() {
    while (this.ingredients.controls.length) this.ingredients.removeAt(0);
  }
}
