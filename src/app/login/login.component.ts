import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Login } from '../store/auth.state.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  data: any = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };

  /**
   * Forms
   */
  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit() {

    /**
     * Init form
     */
    this.formLogin = this.formBuilder.group({
      email: new FormControl(this.data.email, [Validators.required, Validators.required]),
      password: new FormControl(this.data.password, [Validators.required]),
      rememberMe: new FormControl(false, [Validators.required])
    });
  }

  onLogin() {
    if ( this.formLogin.valid ) {
      this.store.dispatch( new Login( this.formLogin.value ) );
    }
  }
}
