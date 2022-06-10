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
    this.id = this.route.snapshot.paramMap.get('id')
    this.Form = new FormGroup({
      front: new FormControl(null),
      back: new FormControl(null),
    });
  }

  submitForm() {}

  deleteFlashcard(id: string|null) {
    this.apiService.deleteFlashCard(id)
      .subscribe((response) => {
        this.remove.emit('')
      })
  }

  editFlashcard(id: string|null) {
    this.apiService.editFlashcard(this.id, this.Form.get('front')?.value, this.Form.get('back')?.value)
    this.editMode = false
  }
}
