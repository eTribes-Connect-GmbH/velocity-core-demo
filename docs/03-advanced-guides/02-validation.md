---
title: Form & Input Validation
section: Advanced Guides
---

Form and input validation are essential for ensuring data integrity, improving user experience, and maintaining application security. Validation should occur on both the **client-side** (for immediate feedback) and the **server-side** (for security and data consistency).

## Client-Side Validation

### Native HTML Form Validation

For basic client-side validation, HTML5 offers built-in features that work out-of-the-box. These include attributes such as `required`, `type`, `pattern`, and `minlength`/`maxlength`. Using native form validation is sufficient for most use cases.

```html
<form>
  <label for="firstName">First Name:</label>
  <input type="text" id="firstName" name="firstName" required minlength="2" maxlength="50" />
  <label for="lastName">Last Name:</label>
  <input type="text" id="lastName" name="lastName" required minlength="2" maxlength="50" />
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">Submit</button>
</form>
```

In this example:

- The `type="email"` ensures the input is a valid email format.
- The `required` attribute prevents the form from being submitted if the input is empty.

When the user submits the form, the browser automatically validates it and provides feedback without requiring custom JavaScript.

### Advanced Styling

To enhance the styling of validation states, use the `:user-invalid` pseudo-class, which applies styles to invalid form controls.

Here’s an enhanced version using the `:user-invalid` pseudo-class for custom styling and showing/hiding an error message:

```tsx
const Input = ({ name, label, ...rest }: InputProps) => (
  <>
    <input
      name={name}
      id={name}
      placeholder={label}
      class="peer w-full rounded border border-slate-200 px-3 py-2 placeholder-slate-300 [&:user-invalid]:border-red-500"
      {...rest}
    />
    <div class="mt-1 hidden text-sm text-red-500 peer-[&:user-invalid]:block">{label} is invalid</div>
  </>
);
```

This approach combines native validation with modern styling, giving users instant feedback while maintaining a clean UI.

## Server-Side Validation

While client-side validation provides a great user experience, it is not secure because users can bypass it (e.g., by disabling JavaScript or tampering with requests). **Server-side validation** is essential to:

- Ensure data integrity.
- Prevent malicious input.
- Handle edge cases not covered by client-side validation.

For robust server-side validation, use Fastify's built-in **JSON Schema** validation. JSON Schema allows you to define and enforce strict validation rules for incoming data.

```ts
const requestBodySchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', minLength: 2, maxLength: 50 },
    lastName: { type: 'string', minLength: 2, maxLength: 50 },
    email: { type: 'string', format: 'email' }
  },
  required: ['firstName', 'lastName', 'email']
};
```

In `src/plugins/pages.tsx` you can add the JSON Schema to the route registration:

```tsx
localePrefixedRouter.post('/my-new-page', { schema: { body: requestBodySchema } }, (_request, reply) =>
  reply.render(<MyNewPage />)
);
```
