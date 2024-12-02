---
title: Context
section: Core Concepts
---

In web development, **context** refers to a mechanism that allows you to share data or functionality across different parts of your application without having to pass props explicitly at every level. This pattern helps manage and distribute data and functions globally, ensuring a clean and maintainable codebase.

Velocity Core adopts this powerful concept. The context feature in Velocity Core enables your JSX components to access server-side objects and contextually relevant data, making it easy to build dynamic components.

## Accessing Context

In Velocity Core, the main way to access the context is through the `useContext()` utility. This function provides access to the Fastify response and reply objects and anything else you want to store in the context. The context is available globally during a request lifecycle and can be utilized directly within any of your JSX components, even deeply nested ones.

## Request and Reply

There are shorthand utilities for accessing the request and reply objects directly.

`useRequest()` can be used to retrieve path parameters, query parameters, the request body, cookies, or other headers. `useReply()` can be used to set response headers or send a redirect.

### Accessing Path Parameters

To access dynamic path parameters, you can write:

```ts
const { params } = useRequest<{ Params: { id: string } }>();
const id = params.id;
```

Make sure to include a corresponding placeholder in the route registration of the page:

```tsx
localePrefixedRouter.get('/my-new-page/:id', (_request, reply) => reply.render(<MyNewPage />));
```

### Accessing Query Parameters

To access query parameters, you can write:

```ts
const { query } = useRequest<{ Querystring: { q: string } }>();
const searchTerm = query.q;
```

### Accessing the Request Body

For accessing form data in a POST request:

```ts
const { body } = useRequest<{ Body: { firstName: string; lastName: string } }>();
const firstName = body.firstName;
const lastName = body.lastName;
```

### Redirecting

You can use the `useReply()` utility to redirect the user to another page:

```tsx
useReply().redirect('/en/my-new-page');
```

Although, it is easier to use the `<Redirect />` component (in `src/components/Redirect.tsx`) instead:

```tsx
return <Redirect path="/en/my-new-page" />;
```

## Internationalization

Additionally, the context provides the `useI18n()` helper for translations, localized date and number formatting, and locale-prefixed navigation. See [Internationalization (i18n)](/advanced-guides/i18n) for more details.

## Authentication

Furthermore, user information can be stored on the request object that is made accessible through the context. Use the `useUser()` utility to retrieve the currently authenticated user. For more details, see [Authentication](/advanced-guides/auth).

## Extending the Context

The context in Velocity Core can be extended to include additional shared data or utilities. For instance, if you need to manage and access theming information, you can create a `useTheme()` function that provides the current theme context to your components.

```ts
export const useTheme = () => useRequest().cookies.theme;
```
