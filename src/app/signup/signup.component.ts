import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}
  public errors: { email?: string; password?: string };
  public submitted: boolean = false;
  public user: { name: string; email: string; password: string };
  public Auth: { createUser: (p) => {} };

  $ctrl = this;
  // form.email.$error.email

  public newSignup: { name: string; email: string; password: string } = {
    name: '',
    email: '',
    password: '',
  };

  public onRegister(f): void {
    console.log(f);
    console.log(this.newSignup);

    // We have data in this.newSignup

    // TODO: call off to DataService to create user
  }

  ngOnInit(): void {
    this.errors = {};
  }
}
