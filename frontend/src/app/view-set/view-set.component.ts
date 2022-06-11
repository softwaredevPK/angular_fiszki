import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface flashcardInterface {
  front: string;
  back: string;
  id: BigInteger;
  passed: boolean;
  repeat_needed: boolean;
}

@Component({
  selector: 'app-view-set',
  templateUrl: './view-set.component.html',
  styleUrls: ['./view-set.component.css']
})
export class ViewSetComponent implements OnInit {

  Form: FormGroup;
  current: flashcardInterface = {} as flashcardInterface
  name: string = ''
  id: string|null
  flashcards: flashcardInterface[] = []
  newFlashcard: boolean = false


  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Form = new FormGroup({
      front: new FormControl(null),
      back: new FormControl(null),
    });
    this.id = this.route.snapshot.paramMap.get('id')
    this.getFlashCards();
  }

  addFlashcard() {
    this.apiService.addFlashcard(this.id, this.Form.get('front')?.value, this.Form.get('back')?.value)        
    .subscribe((data) => {
      this.newFlashcard = false
      this.flashcards.push(data as flashcardInterface)
      this.Form.controls['front'].setValue('')
      this.Form.controls['back'].setValue('')
    }, (errorResponse) => {
      for (const key in errorResponse.error) {
          this.Form.controls[key].setErrors({error: errorResponse.error[key]})
      }
    }  
    ) 
  }

  getFlashCards() {
    this.apiService.getFlashCards(this.id)
    .subscribe(
      (response) => {
        this.name = response['name']
        this.flashcards = response['flashcards']
        if (this.flashcards.length !== 0) {
          this.current = this.flashcards[0]
        }
        else {
          this.current = {}  as flashcardInterface
        }
      })
    }

  removeFlashcard(index: number) {
    this.flashcards.splice(index,1)
  }

  get_passed(){
    return this.flashcards.filter(el => el.passed).length
  }

  get_repeat_needed() {
    return this.flashcards.filter(el => el.repeat_needed).length
  }
}
