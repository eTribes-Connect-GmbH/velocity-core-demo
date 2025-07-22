---
title: Pages
section: Core Concepts
---

Pages in Velocity Core are at the heart of your application’s structure. This guide will help you understand how to create new pages, fetch data for them, and structure navigation in your application.

## Creating a New Page

To create a new page in your Velocity Core application:

1. **Add a New File in `src/pages`**:  
   Each file in the `src/pages` folder represents a page of your application containing the code of the respective page.

2. **Use JSX to Define the Page**:  
   Components and pages are written in JSX. All JSX components in Velocity Core can be `async`. You can directly query your database or any other data source in the page component (or its child components) and use that data in the JSX you return. Here's an example:

   ```tsx
   import { queryDatabase } from '~/connections/database.js';

   const MyNewPage = async () => {
     const data = await queryDatabase();
     return (
       <Layout title="My New Page">
         <h1>Welcome to My New Page</h1>
         <p>Here’s some data from the database:</p>
         <ul>
           {data.map(item => (
             <li key={item.id}>{item.name}</li>
           ))}
         </ul>
       </Layout>
     );
   };

   export default MyNewPage;
   ```

## Using a Shared Layout Component

For consistency across your application, you can use a shared `Layout` component and wrap all your pages in it. This component can define a common structure, including the HTML `<head>` section and shared elements like a header and footer.

A comprehensive example of this component is included in the base project (`src/components/Layout.tsx`). Here’s a simplified version to get an idea of how it works (don't use it like this, it is missing some pieces in the `<head>` section that are essential to Velocity Core):

```tsx
const Layout = async ({ title, children }: { title: string; children: JSX.Element }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} | My Application</title>
    </head>
    <body>
      <header>...</header>
      <main>{children}</main>
      <footer>...</footer>
    </body>
  </html>
);

export default Layout;
```

## Registering Pages in the Pages Plugin

After creating a new page in the `src/pages` folder, you need to register it in the `src/plugins/pages.tsx` file. This step is essential to link the page component with a specific route in your application.

Add a line like this in `src/plugins/pages.tsx`:

```tsx
localePrefixedRouter.get('/my-new-page', (_request, reply) => reply.render(<MyNewPage />));
```

In this example:

- `/my-new-page` is the URL path under which the page will be accessible. (This path is relative to the locale prefix, so the final path that users will visit in their browser will actually be e.g. `/en/my-new-page`. See [Internationalization (i18n)](/advanced-guides/i18n) for more details.)
- `<MyNewPage />` is the page component that will render when the route is accessed.
- The `reply.render` function renders the JSX of the page to HTML and sends it to the user.

## Navigating Between Pages

To navigate between pages, use normal `<a>` tags, just like you would in a standard HTML website. Thanks to Hotwire Turbo, these links will have smooth SPA-like navigation.

Here’s an example:

```html
<a href="/en/my-new-page">Go to My New Page</a>
```

## Using Forms to Navigate Between Pages

Hotwire Turbo also enhances forms, allowing you to navigate between pages while submitting data. You can use both `GET` and `POST` methods with forms:

### Form with GET Method

```html
<form method="GET" action="/en/my-new-page">
  <label for="q">Search:</label>
  <input type="text" id="q" name="q" />
  <button type="submit">Submit</button>
</form>
```

### Form with POST Method

```html
<form method="POST" action="/en/my-new-page">
  <label for="firstName">First Name:</label>
  <input type="text" id="firstName" name="firstName" />
  <label for="lastName">Last Name:</label>
  <input type="text" id="lastName" name="lastName" />
  <button type="submit">Submit</button>
</form>
```

If you use a `POST` form, ensure your route registration in `src/plugins/pages.tsx` is updated to support both `GET` and `POST`:

```tsx
localePrefixedRouter.route({
  method: ['GET', 'POST'],
  url: '/my-new-page',
  handler: (_request, reply) => reply.render(<MyNewPage />)
});
```
