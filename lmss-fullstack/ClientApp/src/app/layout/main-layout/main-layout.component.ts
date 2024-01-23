import {Component, HostListener, OnInit} from '@angular/core';
import {MegaMenuItem} from "primeng/api";
import {AuthService} from "../../pages/auth/services/auth.service";
import {AuthStore} from "../../core/services/auth.store";
import {tap} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(-25rem)',
        opacity: 0,
        width: 0,
        height: '700px',
      })),
      state('out', style({
        opacity: 1,
        // width: '25rem',
        transform: 'translateX(0)',
      })),
      transition('in => out', animate('100ms ease-out')),
      transition('out => in', animate('150ms ease-in'))
    ]),
  ]
})
export class MainLayoutComponent implements OnInit{

  avatar!: string;

  lang!: string;

  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    this.scrWidth < 712 ? this.menuState = 'in' : this.menuState = 'out'
  }

  menuState: string = 'out';

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  items!: MegaMenuItem[]

  nameChanges$ = this.authStore.name$.pipe(
    tap((name) => {
      console.log(name);
      this.items = this.getItems()
      }
    )
  );

  ngOnInit() {

    // this.authService.me().subscribe((res)=> {
    //   console.log(res)
    //
    //   console.log(res.avatars[0]?.privateUrl);
    //
    //   this.avatar = res.avatars[0]?.privateUrl
    // })
  }

  constructor(private authService: AuthService, private authStore: AuthStore) {
    this.getScreenSize();
  }

  onProfileLogout() {
    this.authService.logout();
  }

  private getItems(): MegaMenuItem[] {
    return [
      {
        label: this.authStore.getName(),
        items: [
          [
            {
              items: [
                {label: 'Edit Profile', routerLink: '/edit-profile'},
                {label: 'Logout', command: () => this.onProfileLogout()}]
            }
          ]
        ]
      }
    ];
  }

  changeLang(lang: any) {

    console.log(lang.target.value);

    let value = lang.target.value

    localStorage.setItem('lang', value)
    window.location.reload()
  }
}
