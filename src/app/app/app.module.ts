import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// containers
import { AppComponent } from './containers';

// feature modules
import { AuthModule } from '../auth/auth.module';
import { HealthModule } from '../health/health.module';

// components
import { AppHeaderComponent, AppNavComponent } from './components';
import { Store } from '../store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule
  ],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
