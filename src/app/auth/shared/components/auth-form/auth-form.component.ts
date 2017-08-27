import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <ng-content select="h1"></ng-content>

        <md-input-container>
          <input
            mdInput
            type="email"
            formControlName="email"
            placeholder="Email address">
          <md-error *ngIf="emailFormat">
            Please enter a valid email address
          </md-error>
        </md-input-container>

        <md-input-container>
          <input
            mdInput
            type="password"
            formControlName="password"
            minlength="4"
            placeholder="Password">
          <md-error *ngIf="passwordInvalid">
            Password is required
          </md-error>
        </md-input-container>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <button md-raised-button color="primary" [disabled]="form.invalid">
            <ng-content select=".action"></ng-content>
          </button>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `
})

export class AuthFormComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: [ '', Validators.email ],
    password: [ '', Validators.required ]
  });

  constructor(private fb: FormBuilder) {

  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted.emit(this.form);
  }

  get passwordInvalid() {
    const control = this.form.get('password');
    return control.hasError('required') && control.touched;
  }

  get emailFormat() {
    const control = this.form.get('email');
    return control.hasError('email') && control.touched;
  }
}
