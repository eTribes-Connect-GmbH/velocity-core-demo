---
title: Authentication
section: Advanced Guides
---

Authentication is a fundamental aspect of web application security, ensuring that only authorized users can access specific features and data. In Velocity Core, we provide flexible and robust authentication options, allowing developers to implement custom authentication solutions or integrate with established protocols like OAuth 2.0 and OpenID Connect (OIDC).

## OAuth 2.0 / OpenID Connect

The base project comes pre-configured with a demo **OAuth 2.0 / OpenID Connect** (OIDC) integration using **Auth0**. This setup provides a secure and scalable authentication solution out of the box. If you prefer to use a different OIDC provider, you can modify the integration. The flexibility of the system allows you to maintain the same core functionality while customizing for your provider's specific requirements.

## Custom Authentication

If you prefer, building a custom authentication solution is also an option. Although it requires more effort, this approach allows you to create functionality precisely tailored to your needs.

## Login and Logout

To authenticate users using the OIDC integration, redirect them to the login route:

```tsx
<a href={addLocalePrefix('/auth/login')}>Login</a>
```

To log out users, redirect them to the logout route. Make sure to disable Turbo for this link to prevent prefetching, which could unintentionally log out the user:

```tsx
<a href={addLocalePrefix('/auth/logout')} data-turbo="false">
  Logout
</a>
```

## User Information

Once a user is authenticated, their information is stored in the request object, which is accessible through the context. The base project provides a convenient shorthand utility, `useUser()`, to retrieve the current user information.

```tsx
import { useUser } from '~/context.js';

const UserInfo = () => {
  const user = useUser();
  return <p>User email: {user?.email}</p>;
};
```

This component will display the authenticated user's email or render nothing if the user is not logged in.

## Implementing a Route Guard

To protect certain routes and ensure only authenticated users can access them, implement a route guard. This checks if the user is authenticated and redirects to the login page if not.

```tsx
import { useUser } from '~/context.js';
import { Redirect } from '~/components/Redirect.js';

const UserInfo = () => {
  const user = useUser();
  if (!user) {
    return <Redirect path={addLocalePrefix('/auth/login')} />;
  }
  return <p>User email: {user.email}</p>;
};
```

In this example, unauthenticated users are redirected to the login page.
