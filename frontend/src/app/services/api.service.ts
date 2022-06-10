import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('token/login', { email, password });
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
}