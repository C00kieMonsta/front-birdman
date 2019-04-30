import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Store } from '@ngrx/store';
import { GlobalState } from '../store/global-state.reducers';
import { SetCurrentUser } from '../store/user-admin-store/user-admin.actions';
import { AngularFirestore } from '@angular/fire/firestore';

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
                this.store.dispatch(new SetCurrentUser(user))
            } else {
                localStorage.setItem('user', null);
            }
        });
    }

    async  login(email: string, password: string) {
        try {
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(u => {
                this.router.navigate(['/'], {replaceUrl: true});
            });
        } catch (e) {
            alert("Error!" + e.message);
        }
    }

    async  signUp(email: string, password: string) {
        try {
            this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(u => {
                this.firestore.collection('users').doc(u.user.uid).set({ email });
                this.router.navigate(['/'], {replaceUrl: true});
            });
        } catch (e) {
            alert("Error!" + e.message);
        }
    }

    async logout() {
        await this.afAuth.auth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['welcome']);
    }

}
