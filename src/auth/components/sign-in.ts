import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

declare let responsiveVoice: any;

@Component({
  styles: [
    require('./sign-in.scss'),
    require('../../common/anim.scss')
  ],
  template: require('./sign-in.html')
})

export class SignInComponent {
    private speechText= "Welcome to UWI CloudCast literacy tutor";

    constructor(private auth: AuthService, private router: Router) {responsiveVoice.speak(this.speechText,'US English Female',{pitch: 1.32});}

    speak(): void {
        responsiveVoice.speak(this.speechText,'US English Female',{pitch: 1.32});
    }

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
