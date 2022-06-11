// @ts-nocheck
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  encapsulation: ViewEncapsulation.None
  
})
export class LogInComponent implements OnInit {

  Form: FormGroup;

  main_error: boolean = false
  main_error_msg: string = ''

  ngOnInit() {
    this.Form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    this.authService
      .login(this.Form.get('email')?.value, this.Form.get('password')?.value)        
      .subscribe((data) => {
        this.router.navigate(['dashboard'])
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