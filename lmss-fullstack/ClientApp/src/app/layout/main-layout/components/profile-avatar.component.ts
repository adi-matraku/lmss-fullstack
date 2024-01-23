import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileAvatarComponent implements OnInit {

  name: string | null = '';

  local: string = 'C:\\Users\\Adi\\Desktop\\Adi\\backend-mongodb\\config\\storage\\user\\avatars\\profile\\6231ba8f7b57d90cc07b261c\\preview.png'

  @Input() avatarUrl!: string;

  @Input() set displayedName(name: string | null) {
    this.name = name;
    this.createInititals();
  }

  public showInitials = false;
  public initials!: string;
  public circleColor!: string;

  private colors = [
    '#EB7181', // red
    '#468547', // green
    '#FFD558', // yellow
    '#3670B2', // blue
  ];

  constructor() {
  }

  ngOnInit() {
    this.showInitials = true;
    this.createInititals();

    const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    this.circleColor = this.colors[randomIndex];
  }

  private createInititals(): void {
    let initials = '';
    const words = this.name?.split(' ');

    if (words) {
      for (const initial of words) {
        initials += initial.charAt(0).toUpperCase();
      }
      this.initials = initials;
    }
  }

}
