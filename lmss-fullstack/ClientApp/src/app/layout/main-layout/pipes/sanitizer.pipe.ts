import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(private dom: DomSanitizer) {
  }

  transform(value: string): SafeUrl {
    return this.dom.bypassSecurityTrustUrl(value)
  }

}
