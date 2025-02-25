import { Injectable } from "@angular/core";
import { LoginPayload } from "../../modules/auth/models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../../modules/dashboard/pages/users/models";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../store/auth/auth.actions";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { selectAuthUser } from "../../store/auth/auth.selectors";


@Injectable({ providedIn: "root" })
export class AuthService {


    // private _authUser$ = new BehaviorSubject<User | null>(null);

    authUser$: Observable<User | null>;
    // authUser$ = this._authUser$.asObservable();

    constructor(private httpClient: HttpClient, private router: Router, private store: Store) {
        this.authUser$ = this.store.select(selectAuthUser);
    }

    get isAdmin$(): Observable<boolean> {
        return this.authUser$.pipe(map(user => user?.role === 'ADMIN'))
    }

    login(payload: LoginPayload): void {

        this.httpClient.get<User[]>(environment.baseApiUrl + '/users?email=' + payload.email + '&password=' + payload.password)
            .subscribe({
                next: usersResult => {
                    console.log(usersResult);
                    if (!usersResult[0]) {
                        alert('Invalid email or password');
                        return;
                    }
                    else {
                        localStorage.setItem('authUser', usersResult[0].accessToken);
                        console.log('authUser');

                        this.store.dispatch(AuthActions.setAuthUser({ user: usersResult[0] }));

                        // this._authUser$.next(usersResult[0]);
                        this.router.navigate(['dashboard', 'home']);
                    }
                },
                error: error => {
                    console.error('There was an error!', error);
                    if (error.status === 0) {
                        alert('server json error')
                    }
                }
            });

        // let loginResult = users_data.find(user => user.email === payload.email && user.password === payload.password);

        // if (loginResult) {
        //     localStorage.setItem('authUser', loginResult.accessToken);
        //     console.log('authUser');

        //     this.store.dispatch(AuthActions.setAuthUser({ user: loginResult }));

        //     this._authUser$.next(loginResult);
        //     this.router.navigate(['dashboard', 'home']);
        // } else {
        //     alert('Invalid email or password');
        // }
    }

    logout(): void {
        localStorage.removeItem('authUser');
        this.store.dispatch(AuthActions.unsetAuthUser());
        // this._authUser$.next(null);
        this.router.navigate(['auth', 'login']);
    }

    isAuthenticated(): Observable<boolean> {

        return this.httpClient.get<User[]>(environment.baseApiUrl + '/users?accessToken=' + localStorage.getItem('authUser'))
            .pipe(
                map(result => {
                    const usersResult = result[0];
                    if (usersResult) {
                        this.store.dispatch(AuthActions.setAuthUser({ user: usersResult }));
                    }
                    return !!usersResult;
                })
            );
    }
}

// const token = localStorage.getItem('authUser');
// const accesToken = users_data.find(user => user.accessToken === token)

// if (accesToken)
//     this.store.dispatch(AuthActions.setAuthUser({ user: accesToken }));

// this._authUser$.next(accesToken || null);
// return this.authUser$.pipe(map(user => !!user));