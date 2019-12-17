import { AuthStateModel, Login, Logout } from './auth.state.model';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null,
    rememberMe: null
  }
})
export class AuthState {

  /**
   *
   * Selectors
   */

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(
    private ngZone: NgZone,
    private authService: AuthService, private router: Router) {}

  /**
   * Actions
   */

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {

    console.log(action);
    return this.authService.logIn(action.payload).pipe(
      tap((result: { token: string }) => {
        
        // Save state
        ctx.setState({
          token: result.token,
          email: action.payload.email
        });

        /**
         * NgZone works for asynchronous route redirection
         */
        this.ngZone.run( () => {
          this.router.navigate(['/dashboard']);
        });

        /**
         * Save token
         */
        this.authService.storeTokens( result.token, action.payload.rememberMe )

        // Save ID user
        //this.authService.saveIdUser();
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    /**
     * Clear storage reducer
     */
    ctx.setState({ token: null, email: null });
    this.authService.logOut();

    /**
     * Redirect to login
     */
    this.ngZone.run( () => {
      this.router.navigate(['/login']);
    });
  }

  // @Action(Logout)
  // logout(ctx: StateContext<AuthStateModel>) {
  //   const state = ctx.getState();
  //   return this.authService.logout(state.token).pipe(
  //     tap(() => {
  //       ctx.setState({
  //         token: null,
  //         username: null
  //       });
  //     })
  //   );
  // }
}
