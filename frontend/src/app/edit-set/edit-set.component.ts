import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-set',
  templateUrl: './edit-set.component.html',
  styleUrls: ['./edit-set.component.css']
})
export class EditSetComponent implements OnInit {
  Form: FormGroup;
  name: string = ''
  id: string|null


  constructor(private apiService: ApiService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      name: new FormControl(null),
    });
    this.id = this.route.snapshot.paramMap.get('id')
    this.getName()
  }

  submitForm() {
    this.apiService.editSet(this.id, this.Form.get('name')?.value,)
      .subscribe((response) => {
        this.router.navigate(['sets'])
      }, (errorResponse) => {
        for (const key in errorResponse.error) {
            this.Form.controls[key].setErrors({error: errorResponse.error[key]})
          }
        }  
    )
  }

  getName() {
    this.apiService.getSet(this.id)
      .subscribe((data) => {
        this.Form.controls['name'].setValue(data['name'])
      })
  }

}
