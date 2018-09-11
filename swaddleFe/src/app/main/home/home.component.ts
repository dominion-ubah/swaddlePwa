import { Component, OnInit } from '@angular/core';
import {PicService} from '../../shared/pic.service';
import {isArray} from 'rxjs/internal/util/isArray';
import { ObservableMedia } from '@angular/flex-layout';

import { Observable } from 'rxjs';
import { map, takeWhile, startWith, retry, catchError } from 'rxjs/operators';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

import { ChangeEvent } from '@angular2-virtual-scroll';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pics;
  public cols: Observable<number>;
  public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches)
      );
  @Input()
  items: ListItem[];

  protected buffer: ListItem[] = [];
  protected loading: boolean;

  protected onListChange(event: ChangeEvent) {
    if (event.end !== this.buffer.length) return;
    this.loading = true;
    this.fetchNextChunk(this.buffer.length, 10).then(chunk => {
      this.buffer = this.buffer.concat(chunk);
      this.loading = false;
    }, () => this.loading = false);
  }

  protected fetchNextChunk(skip: number, limit: number): Promise<ListItem[]> {
    return new Promise((resolve, reject) => {
      // ....
    });
  };

  // fixedSizeData = Array(10000).fill(30);

  constructor(
      private observableMedia: ObservableMedia,
      private _picService: PicService,
      private  _breakpointObserver: BreakpointObserver ) { }

  ngOnInit() {

    // set cols
    const grid = new Map([
      ["xs", 1],
      ["sm", 2],
      ["md", 4],
      ["lg", 4],
      ["xl", 5]
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


    // pic service
    this._picService.getPics().subscribe(
    data => {
        this.pics = (isArray(data)) ? data.slice(0, 240) : [];
    },
    error => {

    },
    () => {
      console.log(this.pics);
    });
  }

  rowHeightSetter(){
    if (this.isHandset$) {
      return '5:7';
    } else {
      return '5:1';
    }
  }


}
