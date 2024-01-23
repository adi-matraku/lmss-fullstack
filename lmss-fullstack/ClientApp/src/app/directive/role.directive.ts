import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthStore} from "../core/services/auth.store";
import {map, pluck, take} from "rxjs";

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  // @Input() appRole: string[] = [];
  //
  // roleArray: string[] = []

  @Input() set appRole(roles: any[]) {
    this.authStore.user$.pipe(
      take(1),
      pluck('role'),
      map(role => {
        if (roles.includes(role)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          return true;
        }
        this.viewContainer.clear();
        return false;
      })
    ).subscribe();
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authStore: AuthStore) {
  }

  ngOnInit() {
  }

  //   const role = this.authStore.state.user?.role
  //
  //   role?.forEach((el)=> {
  //     this.roleArray.push(el)
  //   })
  //   // console.log(this.roleArray);
  //   // console.log(this.appRole)
  //
  //   // console.log(this.roleArray?.includes('member') && !this.roleArray?.includes('librarian'));
  //   const intersection = intersect(this.appRole, role)
  //   // console.log(this.appRole, role)
  //
  //   // console.log(intersection)
  //
  //   if(intersection.length > 0) {
  //     // console.log('authorized');
  //   } else {
  //     console.log('not authorized')
  //     this.elementRef.nativeElement.remove();
  //   }
  //
  // }
}
