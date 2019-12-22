import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Logout } from 'src/app/store/auth.state.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * Reducer auth
   */
  @Select(state => state) email$: Observable<any>;
  state: any;
  storeSub: Subscription;

  constructor( private store: Store,
  private chr: ChangeDetectorRef ) { }

  ngOnInit() {
    /**
     * Show the reducer values
     */
    this.storeSub = this.email$.subscribe( (state: any) => {
      this.state = {...state};
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
