import { Injectable } from '@angular/core';
import {People} from "../interfaces/people";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  createdPeople: People[] = [];
  peopleLength: number = 83;

  constructor() { }
}
