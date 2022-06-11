import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface dataObject {
  front: string;
  back: string;
  passed: boolean;
  repeat_needed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('token/login', {email: email, password: password});
  }

  register(email: string, password: string) {
    return this.http.post('users/', {email: email, password: password});
  }

  logout() {
    return this.http.post('token/logout', {});
  }

  getRandomFlashcard(learnedOnly: Boolean = false, toBeRepeatedOnly: Boolean = false) {
    let extra_url = ''
	if (learnedOnly) {
		extra_url += '?passed=true'
	}
	else if (toBeRepeatedOnly) {
		extra_url += '?repeat_needed=true'
	}
    return this.http.get('flashcards/random/' + extra_url,)
  }

  getFlashCards(id: string|null, learnedOnly: Boolean = false, toBeRepeatedOnly: Boolean = false) {
    let extra_url = ''
    if (learnedOnly) {
      extra_url += '?passed=true'
    }
    else if (toBeRepeatedOnly) {
      extra_url += '?repeat_needed=true'
    }
    return this.http.get(`sets/${id}/` + extra_url)
    }

  deleteFlashCard(id: string|null) {
    return this.http.delete(`flashcards/${id}/`)
  }

  editFlashcard(id: string|null, front?: string, back?: string, passed?: boolean, repeat_needed?: boolean) {
    let data: dataObject = {} as dataObject
    if (front){
      data.front = front
    }
    if (back){
      data.back = back
    }
    if (passed){
      data.passed = passed
    }
    if (repeat_needed){
      data.repeat_needed = repeat_needed
    }
    return this.http.patch(`flashcards/${id}/`, data)
  }

  addFlashcard(set_id: string|null, front: string, back: string) {
    return this.http.post(`flashcards/`, {front, back, set: set_id})
  }

  createSet(name: string) {
    return this.http.post(`sets/`, {name: name})
  }

  editSet(id: string|null, name: string) {
    return this.http.patch(`sets/${id}/`, {name})
  }

  getSet(id: string|null) {
    return this.http.get(`sets/${id}/`)
  }

  getSets() {
    return this.http.get(`sets/`)
  }

  deleteSet(id: string|null) {
    return this.http.delete(`sets/${id}/`)
  }
  
}
