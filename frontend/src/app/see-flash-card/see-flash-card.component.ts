import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';


interface currentInterface {
  front: string;
  back: string;
  id: BigInteger
}


@Component({
  selector: 'app-see-flash-card',
  templateUrl: './see-flash-card.component.html',
  styleUrls: ['./see-flash-card.component.css']
})
export class SeeFlashCardComponent implements OnInit {

  id: string | null
  current: currentInterface = {} as currentInterface
  flashcards: currentInterface[] = []
  current_id: number = 0
  learnedOnly: Boolean = false
  toBeRepeatedOnly: Boolean = false
  setName: string = ''

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getFlashCards()
  }

  nextFlashcard() {
    this.current_id += 1
    this.current = this.flashcards[this.current_id]
  }

  getFlashCards() {
    this.apiService.getFlashCards(this.id ,this.learnedOnly, this.toBeRepeatedOnly).subscribe(
      (response) => {
        this.current_id = 0
        this.setName = response['name']
        this.flashcards = response['flashcards']
        if (this.flashcards.length !== 0) {
          this.current = this.flashcards[0]
        }
        else {
          this.current = {}  as currentInterface
        }
      })
    }

  learnChanged() {
    this.learnedOnly = true
    this.toBeRepeatedOnly = false
    this.getFlashCards()
  }

  repeatedChanged() {
    this.learnedOnly = false
    this.toBeRepeatedOnly = true
    this.getFlashCards()
  }

  allChanged(){
    this.learnedOnly = false
    this.toBeRepeatedOnly = false
    this.getFlashCards()
  }

}
