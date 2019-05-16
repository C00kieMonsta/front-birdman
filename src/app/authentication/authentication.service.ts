import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

import { GlobalState } from '../store/global-state.reducers';
import { SetCurrentUser } from '../store/user-admin-store/user-admin.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user: User;

    get isLoggedIn(): boolean {
        const  user  =  JSON.parse(localStorage.getItem('user'));
        return  user  !==  null;
    }

    constructor(
        public afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        public router: Router,
        private store: Store<GlobalState>,
    ) {
        this.afAuth.authState.subscribe((user: User) => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.store.dispatch(new SetCurrentUser(user));
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    async  login(email: string, password: string) {
        try {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(u => {
                if (u.user.emailVerified) {
                    this.router.navigate(['/'], {replaceUrl: true});
                } else {
                    alert('Did you verify your email?');
                    this.router.navigate(['/info'], {replaceUrl: true});
                }
            }).catch((err) => {
                alert('Wrong credentials');
            });
        } catch (e) {
            alert('Error!' + e.message);
        }
    }

    async  signUp(email: string, password: string) {
        try {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(u => {
                this.firestore.collection('users').doc(u.user.uid).set({ email });
                u.user.sendEmailVerification();
                if (u.user.emailVerified) {
                    this.router.navigate(['/'], {replaceUrl: true});
                } else {
                    this.router.navigate(['/info'], {replaceUrl: true});
                }
            }).catch((err) => {
                alert('Soemthing went wrong!');
            });
        } catch (e) {
            alert('Error!' + e.message);
        }
    }

    async logout() {
        await this.afAuth.auth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['welcome']);
    }

}
