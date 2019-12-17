import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/store/auth.state.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(state => state.email) email$: Observable<string>;

  constructor( private store: Store ) { }

  ngOnInit() { }

  logOut() {
    this.store.dispatch( new Logout() );
  }

}
