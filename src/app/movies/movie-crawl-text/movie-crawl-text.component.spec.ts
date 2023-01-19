import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCrawlTextComponent } from './movie-crawl-text.component';

describe('MovieCrawlTextComponent', () => {
  let component: MovieCrawlTextComponent;
  let fixture: ComponentFixture<MovieCrawlTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCrawlTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCrawlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
