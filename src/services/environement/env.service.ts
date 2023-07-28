import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public server = 'http://localhost:8000/api/';
  constructor() { }
}
 