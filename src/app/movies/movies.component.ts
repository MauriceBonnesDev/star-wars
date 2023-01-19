import { Component } from '@angular/core';
import {PeopleService} from "../services/people.service";
import {PageEvent} from "@angular/material/paginator";
import {map} from "rxjs";
import {Planet} from "../interfaces/planets";
import {Movie} from "../interfaces/movies";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  movies: any[] = [];
  displayedColumns = ['Title', 'Episode', 'Director', 'Producer'];
  moviesLength:number = 6;
  pageIndex: number = 0;
  loadingStatus = '';

  constructor(private moviesService: PeopleService) {}

  ngOnInit(): void {
    this.loadMoviesData();
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
  }

  loadMoviesData() {
    this.movies = [];
    this.loadingStatus = 'loading';
    this.moviesService.getAllMovies().pipe(
      map(movieSwapi => {
        return movieSwapi.results.map(movie => {
            let m: Movie = {
              Title: movie.title,
              Episode: movie.episode_id,
              Director: movie.director,
              Producer: movie.producer
            }
            return m;
          }
        )
      }),
    ).subscribe(movies => {
      console.log(movies);
      this.movies = movies;

      if (this.movies.length === 0) {
        this.loadingStatus = 'none'
      } else {
        this.loadingStatus = 'table'
      }
    })
  }
}
