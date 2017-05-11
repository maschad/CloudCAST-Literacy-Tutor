import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

declare var responsiveVoice: any;

@Component({
  styles: [
    require('./sign-in.scss'),
    require('../../common/anim.css')
  ],
  template: `
   <div class="anim_cont">
        <div class="chat_bubble tri-right btm-left-in"><p>Welcome to lit tutor</p></div>
        <div class="va"></div>
    </div>
    <div class="g-row sign-in">
      <div class="g-col">
        <h1 class="sign-in__heading">Sign in</h1>
        <button class="sign-in__button" (click)="signInAnonymously()" type="button">Anonymously</button>
        <!--<button class="sign-in__button" (click)="signInWithGithub()" type="button">GitHub</button>-->
        <button class="sign-in__button" (click)="signInWithGoogle()" type="button">Google</button>
        <button class="sign-in__button" (click)="signInWithTwitter()" type="button">Twitter</button>
        <button class="sign-in__button" (click)="signInWithFacebook()" type="button">Facebook</button>
      </div>
    </div>
  `
})

export class SignInComponent {
  constructor(private auth: AuthService, private router: Router) {responsiveVoice.speak('Welcome to literacy tutor','US English Female',{pitch: 1.32});}

  signInAnonymously(): void {
    this.auth.signInAnonymously()
      .then(() => this.postSignIn());
  }

  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  signInWithFacebook(): void {
    this.auth.signInWithFacebook()
      .then(() => this.postSignIn());
  }

  private postSignIn(): void {
    this.router.navigate(['/reading']);
  }
}
