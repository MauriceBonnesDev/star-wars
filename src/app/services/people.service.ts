import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {People, PeopleAkabab, PeopleSwapi, SwapiResponse} from "../interfaces/people";
import { SpeciesSwapi } from "../interfaces/species";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  swapiBaseURL: string = 'https://swapi.dev/api';
  akababBaseURL: string = 'https://akabab.github.io/starwars-api/api';

  constructor(private http: HttpClient) { }

  getPeople(paginationToken: string | null): Observable<SwapiResponse<PeopleSwapi>> {
    if (paginationToken === null) {
      return this.http.get<SwapiResponse<PeopleSwapi>>(`${ this.swapiBaseURL }/people/`);
    } else {
      return this.http.get<SwapiResponse<PeopleSwapi>>(paginationToken);
    }
  }

  getSpecies(species: string): Observable<any> {
    return this.http.get<any>(`${ this.swapiBaseURL}/species/?search=${ species }`);
  }

  getAkababCharacter(id: number): Observable<PeopleAkabab> {
    return this.http.get<PeopleAkabab>(`${ this.akababBaseURL }/id/${ id }.json`)
  }

  getSwapiCharacter(id: number): Observable<PeopleSwapi> {
    return this.http.get<PeopleSwapi>(`${ this.swapiBaseURL }/people/${ id }`)
  }

  searchCharacter(searchTerm: string): Observable<SwapiResponse<PeopleSwapi>> {
    return this.http.get<SwapiResponse<PeopleSwapi>>(`${ this.swapiBaseURL }/people/?search=${ searchTerm }`)
  }
}
