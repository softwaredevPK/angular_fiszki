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

  Form: FormGroup;

  main_error: boolean = false
  main_error_msg: string = ''

  ngOnInit() {
    this.Form = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }
  

  constructor(private authService: AuthService, private router: Router) { 
  }

  submitForm() {
    this.authService
      .login(this.Form.get('email')?.value, this.Form.get('password')?.value)
      .subscribe((response) => {
        this.router.navigate(['dashboard'])
      }, (response) => {
        for (const [k, v] of Object.entries(response.error)) {
          if (k == 'non_field_errors'){

          }
          else {
            this.Form.controls[k].setErrors(v[0])
          }  
        }
      }
      );
  }
}

