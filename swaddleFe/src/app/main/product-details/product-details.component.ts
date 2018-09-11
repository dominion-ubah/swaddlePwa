import { Component, OnInit } from '@angular/core';
import {isArray} from 'rxjs/internal/util/isArray';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, takeWhile, startWith, retry, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public cols: Observable<number>;

  constructor(private observableMedia: ObservableMedia) {
  }

  ngOnInit() {

    // set cols
    const grid = new Map([
      ["xs", 1],
      ["sm", 1],
      ["md", 2],
      ["lg", 2],
      ["xl", 2]
    ]);
    let start: number;
    grid.forEach((cols, mqAlias) => {
      if (this.observableMedia.isActive(mqAlias)) {
        start = cols;
      }
    });
    this.cols = this.observableMedia.asObservable()
        .pipe(
            map(change => {
              console.log(change);
              console.log(grid.get(change.mqAlias));
              return grid.get(change.mqAlias);
            }),
            startWith(start)
        );


  }

}
