import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    user: User;

    get isLoggedIn(): boolean {
        const  user  =  JSON.parse(localStorage.getItem('user'));
        return  user  !==  null;
    }

    constructor(public afAuth: AngularFireAuth, public router: Router) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
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
