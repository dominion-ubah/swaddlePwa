import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  styleUrls: ['./virtual-scroll.component.scss']
})
export class VirtualScrollComponent implements OnInit {

  @Input()
  items: any[] = [];

  @Output()
  update: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output()
  change: EventEmitter<ChangeEvent> = new EventEmitter<ChangeEvent>();

  @ViewChild('content', { read: ElementRef })
  protected contentElementRef: ElementRef;

  protected scrollHeight: number;
  protected topPadding: number;

  @Input()
  childWidth: number;

  @Input()
  childHeight: number;

  constructor(private element: ElementRef, private renderer: Renderer2) {   }

  ngOnInit() {
    this.renderer.listen(this.element.nativeElement, 'scroll', this.refresh.bind(this));
  }

  refresh() {
    requestAnimationFrame(this.calculateItems.bind(this));
  }

  // private calculateDimensions() {
  //   // additional parameters required for calculation
  //   let el = this.element.nativeElement;
  //   let content = this.contentElementRef.nativeElement;
  //
  //   let items = this.items || [];
  //   let itemCount = items.length;
  //   let viewWidth = el.clientWidth - this.scrollbarWidth;
  //   let viewHeight = el.clientHeight - this.scrollbarHeight;
  //
  //   let contentDimensions;
  //   if (this.childWidth === undefined || this.childHeight === undefined) {
  //     contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
  //       width: viewWidth,
  //       height: viewHeight
  //     };
  //   }
  //   let childWidth = this.childWidth || contentDimensions.width;
  //   let childHeight = this.childHeight || contentDimensions.height;
  //
  //   let itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));
  //
  //   return {
  //     itemCount: itemCount,
  //     viewWidth: viewWidth,
  //     viewHeight: viewHeight,
  //     childWidth: childWidth,
  //     childHeight: childHeight,
  //     itemsPerRow: itemsPerRow
  //   };
  // }
  //
  // private calculateItems() {
  //   // // calculate, start index, end index, top padding, scroll height and finally viewport items
  //   // let start = scrollTop / scrollHeight * itemCount;
  //   // let end = start + viewHeight / childHeight;
  //   //
  //   // this.scrollHeight = childHeight * itemCount;
  //   // this.topPadding = childHeight * start;
  //   //
  //   // // emit update event
  //   // this.update.emit(this.items.slice(start, end));
  //   //
  //   // // emit change event
  //   // this.change.emit({
  //   //   start: start,
  //   //   end: end
  //   // });
  //
  //   let start = Math.floor(scrollTop / scrollHeight * itemCount / itemsPerRow) * itemsPerRow;
  //   let end = start + viewHeight / childHeight * itemsPerRow;
  //
  //   this.scrollHeight = childHeight * itemCount / itemsPerRow ;
  //   this.topPadding = childHeight * start / itemsPerRow;
  //
  //   // emit update event
  //   this.update.emit(this.items.slice(start, end));
  //
  //   // emit change event
  //   this.change.emit({
  //     start: start,
  //     end: end
  //   });
  // }

  private calculateDimensions() {
    let el = this.element.nativeElement;
    let content = this.contentElementRef.nativeElement;

    let items = this.items || [];
    let itemCount = items.length;
    let viewWidth = el.clientWidth - this.scrollbarWidth;
    let viewHeight = el.clientHeight - this.scrollbarHeight;

    let contentDimensions;
    if (this.childWidth == undefined || this.childHeight == undefined) {
      contentDimensions = content.children[0] ? content.children[0].getBoundingClientRect() : {
        width: viewWidth,
        height: viewHeight
      };
    }
    let childWidth = this.childWidth || contentDimensions.width;
    let childHeight = this.childHeight || contentDimensions.height;

    let itemsPerRow = Math.max(1, Math.floor(viewWidth / childWidth));

    return {
      itemCount: itemCount,
      viewWidth: viewWidth,

      viewHeight: viewHeight,
      childWidth: childWidth,
      childHeight: childHeight,
      itemsPerRow: itemsPerRow
    };
  }

  private calculateItems() {
    let d = this.calculateDimensions();
    let start = Math.floor(d.scrollTop / d.scrollHeight * d.itemCount / d.itemsPerRow) * d.itemsPerRow;
    let end = start + d.viewHeight / d.childHeight * d.itemsPerRow;

    this.scrollHeight = d.childHeight * d.itemCount / d.itemsPerRow ;
    this.topPadding = d.childHeight * start / d.itemsPerRow;

    // emit update event
    this.update.emit(this.items.slice(start, end));

    // emit change event
    this.change.emit({
      start: start,
      end: end
    });
  }
}
