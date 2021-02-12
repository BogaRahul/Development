import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-movie-component',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input()
  movie: any;

  constructor() { }

  ngOnInit(): void {
  }

}
