# Converted Angular v20 - Full Conversion (Enhanced)

This project is a full conversion of your React+Vite app into an Angular v20 standalone-components app with added features:

- Angular standalone components
- Routing preserved from React app
- Auth (mocked), Cart management, Product listing (mock), Order placement (mock)
- Reactive forms for login/register/checkout
- Services replacing React Context
- Simple CSS and structure that mirrors original project

## How to use
1. Create a new Angular workspace using `ng new` and copy the `src` folder content here OR install Angular CLI globally and run this project inside a workspace.
2. Run `npm install`
3. Run `ng serve` or `npm start`

## Important notes
- UI uses plain HTML/CSS. The original used MUI; to match the design exactly, port the MUI components to Angular Material or custom components.
- Replace mock ProductService and AuthService logic with real API calls and update `src/environments/environment.ts`.
- This repo preserves the structure of components/pages/context from the original React project to make review and further manual adjustments easier.
