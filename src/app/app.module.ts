import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, DashboardModule, StoreModule.forRoot(rootReducer, {}), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })],
  providers: [provideAnimationsAsync(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule { }
