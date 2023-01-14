import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { People } from "../interfaces/people";
import { PeopleService } from "../services/people.service";
import {map, startWith, Observable, switchMap, debounceTime, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator, PageEvent } from "@angular/material/paginator";
import {PeopleAddDialogComponent} from "./people-add-dialog/people-add-dialog.component";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: People[] = [];
  displayedColumns = ['name', 'gender'];
  previousPageToken: string | null = null;
  nextPageToken: string | null = null;
  pageIndex: number = 0;
  faMagnifyingGlass = faMagnifyingGlass;
  faTimes = faTimes;
  isSearching = false;
  isLoading = false;
  loadingStatus = '';
  peopleDisplayed: People[] = [];
  selectionId: number = 0;
  dialogOpen = false;

  searchControl = new FormControl();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private peopleService: PeopleService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadPeopleData(null);
    this.searchCharacter();
  }

  searchCharacter() {
    this.searchControl.valueChanges.pipe(
      tap(() => this.isSearching = true),
      // startWith(''),
      debounceTime(300),
      switchMap((searchTerm:string) => this.peopleService.searchCharacter(searchTerm)),
      map(peopleSwapi => {
        return peopleSwapi.results.map( character => {
            let char: People = {id: Number(character.url.slice(character.url.indexOf('/', 25) + 1, character.url.lastIndexOf('/'))), name: character.name, gender: character.gender, height: Number(character.height), mass: Number(character.mass), species: character.species[0], birthYear: character.birth_year};
            return char;
          }
        )
      })
    ).subscribe(people => {
      this.people = people;
      this.isSearching = false;
      if (this.people.length === 0) {
        this.loadingStatus = 'none';
      } else {
        this.loadingStatus = 'table';
      }
    })
  }

  loadPeopleData(paginationToken: string | null) {
    this.people = [];
    this.loadingStatus = 'loading';
    this.peopleService.getPeople(paginationToken).pipe(
      map(peopleSwapi => {
        this.previousPageToken = peopleSwapi.previous;
        this.nextPageToken = peopleSwapi.next;
        return peopleSwapi.results.map(character => {
            console.log(character.url.slice(character.url.indexOf('/', 25) + 1, character.url.lastIndexOf('/')));
            let char: People = {id: Number(character.url.slice(character.url.indexOf('/', 25) + 1, character.url.lastIndexOf('/'))), name: character.name, gender: character.gender, height: Number(character.height), mass: Number(character.mass), species: character.species[0], birthYear: character.birth_year};
            return char;
          }
        )
      }),
    ).subscribe(people => {
      console.log(people);
      this.people = people;
      this.isLoading = false;
      if (this.people.length === 0) {
        this.loadingStatus = 'none'
      } else {
        this.loadingStatus = 'table'
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    if (e.pageIndex > this.pageIndex) {
      this.loadPeopleData(this.nextPageToken);
    } else {
      this.loadPeopleData(this.previousPageToken);
    }
    this.pageIndex = e.pageIndex;
  }

  openAdd(): void {

  }

  deleteInput() {
    this.searchControl.setValue('');
  }
}
