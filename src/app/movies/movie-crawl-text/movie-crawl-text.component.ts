import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription, switchMap, tap} from "rxjs";
import {PeopleService} from "../../services/people.service";

@Component({
  selector: 'app-movie-crawl-text',
  templateUrl: './movie-crawl-text.component.html',
  styleUrls: ['./movie-crawl-text.component.scss']
})
export class MovieCrawlTextComponent implements OnInit {
  episode: number = 0;
  title: string = '';
  description: string = '';

  paramsSubscription: Subscription | null = null;

  constructor(private movieService: PeopleService,
              private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.getMovieData();
  }

  getMovieData() {
    this.paramsSubscription = this.route.params.pipe(
      tap((params) => console.log(params)),
      switchMap(params => this.movieService.getMovieData(params['id']))
    ).subscribe(movie => {
        this.episode = movie.episode_id;
        this.title = movie.title;
        this.description = movie.opening_crawl;
      }

    )
  }

}
