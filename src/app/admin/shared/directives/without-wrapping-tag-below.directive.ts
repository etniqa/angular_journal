import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appWithoutWrappingTagBelow]'
})
export class WithoutWrappingTagBelowDirective implements AfterViewInit{

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    const parentElement = this.el.nativeElement.parentElement;
    const element = this.el.nativeElement;
    console.log('parent', parentElement);
    console.log('element childs', element.nativeElement);
    console.log('el', this.el);
    let firstChild = this.el.nativeElement.childNodes[0];
    console.log('child', firstChild);
    // parentElement.removeChild(element);
    // parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
    // parentElement.parentNode.removeChild(parentElement);
  }
}
