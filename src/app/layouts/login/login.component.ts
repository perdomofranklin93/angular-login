import { Component, OnInit, OnDestroy,  ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login } from 'src/app/store/auth.state.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  data: any = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };

  /**
   * Forms
   */
  formLogin: FormGroup;

  /**
   * Reducer auth
   */
  @Select(state => state) email$: Observable<any>;
  state: any;
  storeSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private chr: ChangeDetectorRef ) { }

  ngOnInit() {

    /**
     * Init form
     */
    this.formLogin = this.formBuilder.group({
      email: new FormControl(this.data.email, [Validators.required, Validators.required]),
      password: new FormControl(this.data.password, [Validators.required]),
      rememberMe: new FormControl(false, [Validators.required])
    });

    /**
     * Show the reducer values
     */
    this.storeSub = this.email$.subscribe( (state: any) => {
      this.state = {...state};
      this.chr.detectChanges();
    });
  }

  onLogin() {
    if ( this.formLogin.valid ) {
      this.store.dispatch( new Login( this.formLogin.value ) );
    }
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if ( this.storeSub ) {
      this.storeSub.unsubscribe();
    }
  }
}
