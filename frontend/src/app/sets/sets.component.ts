import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';


interface currentInterface {
  id: string;
  name: string;
}


@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SetsComponent implements OnInit {
  sets: currentInterface[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSets()
  }

  getSets() {
    this.apiService.getSets()
    .subscribe((data) => {
      this.sets = data as currentInterface[]
    })
  }

  deleteSet(id: string, index: number) {
    this.apiService.deleteSet(id)
      .subscribe((data) => {
        this.sets.splice(index, 1)
      })
  }

  stop(event: Event) {
    event.stopPropagation();
  }

}
