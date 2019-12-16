import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login } from 'src/app/store/auth.state.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data:any = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  }

  @Select(state => state) email$: Observable<any>;
  state:any;
  storeSub: Subscription;

  constructor( private store:Store ) { }

  ngOnInit() {
    this.storeSub = this.email$.subscribe( (state:any) => {
      this.state = {...state};

    });
  }

  onLogin() {
    this.store.dispatch( new Login( this.data ) )
  }

}
