---
title: Getting Started
section: Introduction
---

Welcome to Velocity Core! This guide will help you set up your development environment and create your first web application using this lightweight stack. Let’s dive in!

## Prerequisites

Before you begin, ensure you have the following tools and knowledge:

1. **Node.js and npm**:  
   Velocity Core relies on Node.js, a JavaScript runtime, and npm (Node Package Manager) for managing dependencies. If you don’t have Node.js installed, you can download it from the [official website](https://nodejs.org/). npm is bundled with Node.js, so installing Node.js will also install npm.

2. **Code Editor**:  
   You’ll need a code editor to work with your project files. We recommend using [VS Code](https://code.visualstudio.com/), but any editor that supports JavaScript/TypeScript will work.

3. **Basic Knowledge of HTML, CSS, TypeScript, and JSX**:  
   Velocity Core is built on familiar web technologies like HTML, CSS, TypeScript, and JSX. A basic understanding of these technologies will help you navigate and modify your project with ease.

## Creating a New Project

Once the prerequisites are in place, you can quickly set up a new Velocity Core project using the following command:

```sh
npm create velocity-app
```

This command will prompt you for the name of your project and about further configuration options. Once you’ve answered the questions, the tool will automatically generate a directory containing all the basic setup for a Velocity Core application, including essential files and configuration.

Next to the core components of Velocity Core, the base project also includes **TailwindCSS** for styling, **@formatjs/intl** for internationalization (i18n), and an **Auth0** OAuth 2.0 / OpenID Connect integration for authentication.

## Running the Project

To start your Velocity Core application:

1. **Navigate to your project directory**:

   Use the following command to change into the project directory you just created:

   ```sh
   cd my-app
   ```

2. **Start the development server**:

   Run the following command to start the application in development mode:

   ```sh
   npm run dev
   ```

3. **View the application**:

   After starting the server, open your browser and go to [http://localhost:8888](http://localhost:8888). By default, a Basic Auth integration is enabled with the credentials `admin`/`admin`. After entering these credentials, you should see your new Velocity Core app up and running!

   The dev mode includes live reloading, so as you make changes to your code, the page in the browser will update automatically without manual refresh.

## Overview of Important Folders

The generated project follows a recommended folder structure that organizes your application for optimal clarity and efficiency. While this structure is highly encouraged for most use cases, it’s not set in stone—you’re free to adapt it to suit the needs of your project. Here's an overview of the key folders:

- **`src/components`**:  
  This is where your **server-side JSX components** live. These components are responsible for rendering dynamic HTML on the server, which is sent to the client.

- **`src/pages`**:  
  This folder contains your **application’s pages**. Each file represents a route in your application, making it easy to structure and organize the overall navigation.

- **`src/assets`**:  
  This folder holds all your **frontend assets**:
  - **`src/assets/components`**: This is where the **web components** used for client-side interactivity are defined. These encapsulated components add dynamic behavior and functionality to your app without needing a full client-side framework.
  - **`src/assets/icons`**: Store your application’s icons here.
  - **`src/assets/images`**: This folder doesn’t exist in the generated project, but this is where you would store any images for your application.
