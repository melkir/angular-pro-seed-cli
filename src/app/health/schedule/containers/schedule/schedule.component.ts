import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService, MealsService, WorkoutsService } from '../../../shared/services';
import { ScheduleItem, Workout, Meal } from '../../../shared/interfaces';

import { Store } from '../../../../store';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">

      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </schedule-assign>
    </div>
  `
})

export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectionSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}