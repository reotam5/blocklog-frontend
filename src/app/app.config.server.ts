import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { AuthConfigService, AuthService } from '@auth0/auth0-angular';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: AuthService,
      useValue: {},
    },
    { provide: AuthConfigService, useValue: {} as any },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
