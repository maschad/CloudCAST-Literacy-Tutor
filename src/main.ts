import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// AppModule
import { AppModule } from './app';

// common styles
import './common/styles.scss';
import './common/anim.scss';

//#TODO: Create an application ID
export const APPLICATION_ID = 'ID';
export const RECOGNIZER_ID = 'ID';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule);
