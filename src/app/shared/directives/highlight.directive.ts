import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight = 'yellow';
  @Input() bolder = false;
  @Output() colorUpdated = new EventEmitter();

  constructor(
    private elementRef: ElementRef
  ) {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appHighlight']) {
      this.updateColor();
    }

    if (changes['bolder']) {
      this.updateFontWeight();
    }
  }

  updateColor() {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight || 'yellow';
    this.colorUpdated.emit();
  }

  updateFontWeight() {
    this.elementRef.nativeElement.style.fontWeight = this.bolder ? 'bolder' : 'unset';
  }

}

