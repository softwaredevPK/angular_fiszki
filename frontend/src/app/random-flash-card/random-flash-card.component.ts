import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


interface currentInterface {
  front: string;
  back: string;
  id: BigInteger
}

@Component({
  selector: 'app-random-flash-card',
  templateUrl: './random-flash-card.component.html',
  styleUrls: ['./random-flash-card.component.css']
})
export class RandomFlashCardComponent implements OnInit {

  current: currentInterface = {} as currentInterface
  learnedOnly: Boolean = false
  toBeRepeatedOnly: Boolean = false


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getRandom()
  }

  getCurrent() {
    return 'tttest'
  }

  getRandom() {
    console.log('started')
    this.apiService.getRandomFlashcard(this.learnedOnly, this.toBeRepeatedOnly).subscribe(
      (response) => {
        this.current = response as currentInterface
      })
    }

  learnChanged() {
    this.learnedOnly = true
    this.toBeRepeatedOnly = false
    this.getRandom()
  }

  repeatedChanged() {
    this.learnedOnly = false
    this.toBeRepeatedOnly = true
    this.getRandom()
  }

  allChanged(){
    this.learnedOnly = false
    this.toBeRepeatedOnly = false
    this.getRandom()
  }

}
