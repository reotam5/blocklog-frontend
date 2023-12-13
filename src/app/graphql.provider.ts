import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from '@auth0/auth0-angular';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);
  const authService = inject(AuthService);

  const getTokens = async () => {
    try {
      return await lastValueFrom(
        authService.getAccessTokenSilently({
          authorizationParams: { audience: environment.auth.audience },
        })
      );
    } catch (error) {
      return null;
    }
  };
  const authLink = setContext(async (_, { headers }) => {
    const token = await getTokens();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return {
    link: from([authLink, httpLink.create({ uri: environment.backendUri })]),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
