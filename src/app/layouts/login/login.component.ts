import { Component, OnInit, OnDestroy,  ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login } from 'src/app/store/auth.state.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  data:any = {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  }

  @Select(state => state) email$: Observable<any>;

  state:any;
  storeSub: Subscription;

  constructor( private store:Store, private chr: ChangeDetectorRef ) { }

  ngOnInit() {
    this.storeSub = this.email$.subscribe( (state:any) => {
      this.state = {...state};
      this.chr.detectChanges();
    });
  }

  onLogin() { 
    this.store.dispatch( new Login( this.data ) ) 
  }
  
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if( this.storeSub ) {
      this.storeSub.unsubscribe();
    }
  }


}
