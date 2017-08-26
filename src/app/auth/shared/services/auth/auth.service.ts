import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User as FirebaseUser } from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Store } from '../../../../store';
import { User } from '../../interfaces/user.interface';

@Injectable()
export class AuthService {
  auth$ = this.af.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    });

  constructor(private af: AngularFireAuth, private store: Store) {
  }

  get authState(): Observable<FirebaseUser> {
    return this.af.authState;
  }

  get user() {
    return this.af.auth.currentUser;
  }

  createUser(email: string, password: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
