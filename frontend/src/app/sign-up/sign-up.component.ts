// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  SignupForm: FormGroup;
  main_error: boolean = false
  main_error_msg: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.SignupForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }


  submitForm() {
    this.authService
    .register(this.SignupForm.get('email')?.value, this.SignupForm.get('password')?.value)
    .subscribe((response) => {
      this.router.navigate(['log-in'])
    }, (response) => {
      for (const [k, v] of Object.entries(response.error)) {
        if (k == 'non_field_errors'){
        }
        else {
          this.SignupForm.controls[k].setErrors(v[0])
        }  
      }
    }
    );
  }

}
