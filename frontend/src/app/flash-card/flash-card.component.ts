import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {take, publish} from 'rxjs/operators'

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.css']
})
export class FlashCardComponent implements OnInit {

  @Input() frontText: string = '';
  @Input() backText: string = '';
  @Input() id: string = '';
  @Input() showLearned: boolean = false;
  @Input() showRepeat: boolean = false;

  @Output () next: EventEmitter<any> = new EventEmitter();
  @Output () all: EventEmitter<any>  = new EventEmitter();
  @Output () toBeRepeatedOnly: EventEmitter<any> = new EventEmitter();
  @Output () learnedOnly: EventEmitter<any> = new EventEmitter();
  isReversed: Boolean = false;

  constructor(private apiService: ApiService,) {
   }

  ngOnInit(): void {
  }

  checkIfReversed(){
    this.isReversed ? this.isReversed = !this.isReversed :"";
  }

  learned(id: BigInteger) {
    this.apiService.editFlashcard(this.id, undefined, undefined, true)
    .subscribe((response) => {
      this.next.emit('')
    }
    )
    
  }
  toBeRepeated(id: BigInteger) {
    this.apiService.editFlashcard(this.id, undefined, undefined, undefined, true)
      .subscribe((response) => {
        this.next.emit('')
      }
      )
  }


}
