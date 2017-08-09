import { Component } from '@angular/core';
import { AuthService } from '../../auth';


@Component({
  selector: 'app',
  styles: [
    require('./app.scss')
  ],
  template: require('./app.html')
})

export class AppComponent {
    //Sidebar
    private _opened: boolean = false;

    constructor(private auth: AuthService) {}



    private openMenu() {
        this._opened = !this._opened;
    }

  signOut(): void {
    this.auth.signOut();
  }
}
