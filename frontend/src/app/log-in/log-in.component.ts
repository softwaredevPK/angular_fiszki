// @ts-nocheck
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class LogInComponent implements OnInit {

  SignupForm: FormGroup;

  main_error: boolean = false
  main_error_msg: string = ''

  ngOnInit() {
    this.SignupForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  

  constructor(private authService: AuthService, private router: Router) { 
  }

  submitForm() {
    console.log(this.SignupForm.get('password')?.value)
    this.authService
      
      .login(this.SignupForm.get('email')?.value, this.SignupForm.get('password')?.value)
      .subscribe((response) => {
        this.router.navigate(['dashboard'])
      }, (response) => {
        for (const [k, v] of Object.entries(response.error)) {
          this.SignupForm.controls[k].setErrors(v[0])
        }
      }
      );
  }
}
