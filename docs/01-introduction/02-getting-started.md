Welcome to Velocity Core! This guide will help you set up your development environment and create your first web application using this lightweight framework. Let’s dive in!

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager, comes with Node.js)
- A code editor (like **Visual Studio Code**)
- Basic knowledge of HTML, CSS, and JavaScript

## Installation

1. **Create a New Project Directory**

   Open your terminal and create a new directory for your project:

   ```bash
   mkdir my-velocity-app
   cd my-velocity-app
   ```

2. **Initialize a New Velocity Core Project**

   Use npm to initialize a new Velocity Core project:

   ```bash
   npm init -y
   ```

3. **Install Velocity Core**

   Now, install the Velocity Core package:

   ```bash
   npm install velocity-core
   ```

4. **Set Up Your Project Structure**

   Create the following directory structure:

   ```
   my-velocity-app/
   ├── src/
   │   ├── components/
   │   ├── pages/
   │   └── index.js
   ├── public/
   │   └── index.html
   └── package.json
   ```

## Creating Your First Web Page

1. **Set Up Your HTML File**

   Open `public/index.html` in your code editor and add the following basic HTML structure:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>My Velocity App</title>
   </head>
   <body>
       <div id="app"></div>
       <script src="../dist/bundle.js"></script>
   </body>
   </html>
   ```

2. **Create Your First Component**

   Open `src/components/Home.js` and create a simple React component:

   ```javascript
   import React from 'react';

   const Home = () => {
       return (
           <div>
               <h1>Welcome to My Velocity App!</h1>
               <p>This is a lightweight application using Velocity Core.</p>
           </div>
       );
   };

   export default Home;
   ```

3. **Set Up the Entry Point**

   Open `src/index.js` and configure the entry point for your application:

   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom';
   import Home from './components/Home';

   ReactDOM.render(<Home />, document.getElementById('app'));
   ```

## Building and Running Your Application

1. **Add Build Scripts**

   Open `package.json` and add the following scripts to handle building and starting the application:

   ```json
   "scripts": {
       "build": "velocity build",
       "start": "velocity serve"
   }
   ```

2. **Build Your Application**

   In the terminal, run the build command:

   ```bash
   npm run build
   ```

3. **Start the Development Server**

   Start the development server to view your application:

   ```bash
   npm run start
   ```

   Open your web browser and navigate to `http://localhost:3000`. You should see your home page displaying the welcome message.

## Next Steps

Congratulations! You’ve successfully set up your first application using Velocity Core. Here are some suggestions for what to do next:

- **Explore More Components:** Create more components in the `src/components/` directory and render them in your main application.
- **Add Routing:** Integrate routing to navigate between different pages using Velocity Core’s built-in routing capabilities.
- **Styling:** Enhance your application’s look by adding CSS styles in a dedicated `styles.css` file.

## Resources

For more information on Velocity Core, check out the following resources:

- [Velocity Core Documentation](https://velocitycore.dev/docs)
- [Community Forum](https://velocitycore.dev/community)

Thank you for choosing Velocity Core for your web development needs. Happy coding!