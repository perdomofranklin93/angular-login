import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Logout, AuthStateModel } from 'src/app/store/auth.state.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * Reducer auth
   */
  @Select(state => state) data$: Observable<any>;
  email: any;
  token: any;
  storeSub: Subscription;

  constructor( private store: Store,
               private chr: ChangeDetectorRef ) { }

  ngOnInit() {
    /**
     * Show the reducer values
     */
    this.storeSub = this.data$.subscribe( (state: any) => {
      this.email = state.auth.email;
      this.token = state.auth.token;
      this.chr.detectChanges();
    });
  }

  logOut() {
    this.store.dispatch( new Logout() );
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this.storeSub ) {
      this.storeSub.unsubscribe();
    }
  }

}
