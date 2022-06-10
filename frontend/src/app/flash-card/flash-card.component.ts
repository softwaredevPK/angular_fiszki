import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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

  constructor() {
   }

  ngOnInit(): void {
  }

  checkIfReversed(){
    console.log('check if reversed')
    this.isReversed ? this.isReversed = !this.isReversed :"";
  }

  learned(id: BigInteger) {
    console.log(id)
  }
  toBeRepeated(id: BigInteger) {
    console.log(id)
  }


}
