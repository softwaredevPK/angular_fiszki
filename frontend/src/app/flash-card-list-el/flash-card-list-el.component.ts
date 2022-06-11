import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-flash-card-list-el',
  templateUrl: './flash-card-list-el.component.html',
  styleUrls: ['./flash-card-list-el.component.css']
})
export class FlashCardListElComponent implements OnInit {
  Form: FormGroup;
  editMode: Boolean = false

  @Input() frontText: string = '';
  @Input() backText: string = '';
  @Input() id: string|null = '';
  @Input() passed: boolean = false;
  @Input() repeat_needed: boolean = false;

  @Output () remove: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      front: new FormControl(null),
      back: new FormControl(null),
    });
    this.Form.controls['front'].setValue(this.frontText)
    this.Form.controls['back'].setValue(this.backText)
  }

  deleteFlashcard(id: string|null) {
    this.apiService.deleteFlashCard(id)
      .subscribe((response) => {
        this.remove.emit('')
      })
  }

  editFlashcard(id: string|null) {
    this.apiService.editFlashcard(this.id, this.Form.get('front')?.value, this.Form.get('back')?.value)
      .subscribe((data) => {
        this.editMode = false
      }, (errorResponse) => {
        for (const key in errorResponse.error) {
            this.Form.controls[key].setErrors({error: errorResponse.error[key]})
        }
      }  
      ) 
  }
}
