import { AuthStateModel, Login } from './auth.state.model';
import { Store, State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Route, Router } from '@angular/router';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    email: null
  }
})
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService, private router: Router) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.logIn(action.payload).pipe(
      tap((result: { token: string }) => {
        ctx.setState({
          token: result.token,
          email: action.payload.email
        })

        this.router.navigate(['/dashboard']);
      })
    );
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
