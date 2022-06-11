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

  Form: FormGroup;
  main_error: boolean = false
  main_error_msg: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  submitForm() {
    this.authService
      .register(this.Form.get('email')?.value, this.Form.get('password')?.value)        
      .subscribe((data) => {
        this.router.navigate(['log-in'])
      }, (errorResponse) => {
        for (const key in errorResponse.error) {
          if (key == 'non_field_errors') {
            this.main_error = true
            this.main_error_msg = errorResponse.error[key][0]
          }
          else {
            this.Form.controls[key].setErrors({error: errorResponse.error[key]})
          }
        }
      }  
      ) 
    }  
}
