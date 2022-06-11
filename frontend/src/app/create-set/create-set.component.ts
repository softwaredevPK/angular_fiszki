import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-set',
  templateUrl: './create-set.component.html',
  styleUrls: ['./create-set.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateSetComponent implements OnInit {
  Form: FormGroup;


  constructor(private apiService: ApiService,  private router: Router) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      name: new FormControl(null),
    });
  }

  submitForm() {
    this.apiService.createSet(this.Form.get('name')?.value,)
      .subscribe((response) => {
        this.router.navigate(['sets'])
      }, (errorResponse) => {
        for (const key in errorResponse.error) {
            this.Form.controls[key].setErrors({error: errorResponse.error[key]})
          }
        }  
    )
  }
}
