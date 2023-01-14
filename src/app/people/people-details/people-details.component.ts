import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Subscription, switchMap, tap} from "rxjs";
import {PeopleService} from "../../services/people.service";
import {People} from "../../interfaces/people";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss']
})
export class PeopleDetailsComponent implements OnInit, OnDestroy {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  paramsSubscription: Subscription | null = null;
  character: People = {name: '', gender: '', height: 0, mass: 0, species: '', birthYear: ''};
  isLoaded = false;
  description: string = '';
  constructor(private route: ActivatedRoute, private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.isLoaded = false;
    this.paramsSubscription = this.route.params.pipe(
      switchMap(params => this.peopleService.getAkababCharacter(params['id'])),
      tap(char => this.character.species = char.species),
      tap(char => this.character.image = char.image),
      tap(char => this.character.id = char.id),
      switchMap(char => this.peopleService.getSwapiCharacter(char.id)),
      map(char => {
        this.character.mass = Number(char.mass);
        this.character.height = Number(char.height);
        this.character.gender = char.gender;
        this.character.name = char.name;
        this.character.birthYear = char.birth_year;
      }),
      switchMap(() => this.peopleService.getSpecies(this.character.species)
      )
    ).subscribe( species => {
        const {average_height, average_lifespan, classification, language, name} = species.results[0];
        this.description = `${ this.character.name } was born in year ${ this.character.birthYear } and belongs to the species ${ name }.
                            ${ average_height === 'n/a' ? `The average height of a ${ classification } is not defined.`:
                            `They have an average height of ${ Number(average_height) / 100 }m and can be classified as a
                            ${ classification }.`}  Usually they reach an age of ${ average_lifespan } years.
                            ${ language === 'n/a' ? `They do not have a native language.` : `Their native language is ${ language }.`}`;
        this.isLoaded = true;
      }

    )
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}
