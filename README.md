# Availity Starter React

> Template project for React web apps on the Availity Portal, using JavaScript and [@availity/workflow](https://github.com/Availity/availity-workflow) (webpack).

This starter is plain JavaScript (`.js` and `.jsx`) on purpose, so you can see that Availity apps don't need TypeScript. `tsconfig.json` sets `checkJs: true`, so `yarn typecheck` still checks your code. Add types with JSDoc comments; `project/app/hooks/useSubmitRequest.js` shows an example. If you want TypeScript, use [availity-starter-typescript](https://github.com/Availity/availity-starter-typescript).

## Getting Started

Requires Node.js 22 or 24 and Yarn 4.

```bash
yarn            # install dependencies
yarn start      # start the dev server at http://localhost:3000
```

Open `http://localhost:3000/#/?spaceId=48C607A70B5A46A3864A34E2BDDDEA04` to load the sample space. The page shows "Signed in as Jane Smith", which comes from the mock `users/me` response.

## What's Included

This starter is a small, working Availity app. It covers the features most apps need, so you can replace the sample content with your own.

- **App shell:** Element `ThemeProvider`, `QueryClientProvider`, a hash router, `Spaces` (reads `spaceId` from the URL), `PageHeader`, and a footer.
- **Request form:** react-hook-form with Yup validation. Submitting runs a `useMutation` and passes the result to the response page through router state.
- **Response page:** shows the submission details.
- **Current user:** `useCurrentUser` calls `avUserApi.me()` inside `useQuery`. The `CurrentUser` component shows the name, a loading state, or an error.
- **Error boundary:** catches render errors and offers a "Try Again" button.
- **Mock API:** the dev server serves mock responses for `users/me` and the spaces query, so the app runs without a backend.
- **Tests:** Vitest and Testing Library cover the app shell, validation, navigation, the hook, and the components.

## Scripts

| Script                  | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `yarn start`            | Start the development server                      |
| `yarn build`            | Build for development                             |
| `yarn build:production` | Build for production                              |
| `yarn build:staging`    | Build for staging                                 |
| `yarn test`             | Run tests once                                    |
| `yarn test:watch`       | Run tests in watch mode                           |
| `yarn test:coverage`    | Run tests with coverage                           |
| `yarn lint`             | Lint source files with ESLint                     |
| `yarn format`           | Format files with Prettier                        |
| `yarn format:check`     | Check formatting without changing                 |
| `yarn typecheck`        | Type-check JavaScript with JSDoc (`tsc --noEmit`) |

## Project Structure

```
project/
├── app/
│   ├── index.jsx            # Entry: providers (Theme, QueryClient, Router)
│   ├── App.jsx              # Root component: Spaces, PageHeader, routes
│   ├── App.test.jsx         # App-level tests
│   ├── Request/               # Request form page and its tests
│   ├── Response/              # Response page and its tests
│   ├── components/            # Shared components (CurrentUser, ErrorBoundary, Footer)
│   └── hooks/                 # Custom hooks (useCurrentUser, useSubmitRequest)
├── config/
│   ├── workflow.js            # Workflow configuration (title, dev server, coverage)
│   └── routes.json            # Mock server route mappings
└── data/
    ├── me.json                # Mock response for users/me
    └── spaces.json            # Mock response for the spaces query
```

To add a feature, create a folder under `project/app/` with an `index` file that re-exports the page, plus its tests. Then add a route in `App.jsx`.

## Patterns

### Data fetching: reads and writes

Use `useQuery` for reads and `useMutation` for writes. `useCurrentUser` is a read:

```js
export const useCurrentUser = () =>
  useQuery({
    queryKey: ['currentUser'],
    queryFn: () => avUserApi.me(),
  });
```

`useSubmitRequest` is a write. Its body is a placeholder: replace it with a real `@availity/api-axios` call. The form calls `mutateAsync` and waits for the result before it navigates.

### Forms

Forms use react-hook-form with `yupResolver`. Define the schema next to the form, and use `register` for plain inputs. See `Request/Request.jsx`.

### Mock data

`project/config/routes.json` maps an API path to a file in `project/data/`. The mock server (ekko) serves that file. To mock a new endpoint, add the path and the JSON file. The path must match the one the SDK calls. For example, `avUserApi` calls `cloud/web/appl/user-management/legacy/sdk/platform/v1/users/me`.

### Routing and Spaces

Routing uses `HashRouter`, which the Availity Portal needs for embedded apps. Don't switch to `BrowserRouter` without talking to the platform team first, because the gateway would need changes. `Spaces` reads `spaceId` from the URL.

## Configuration

| File                         | Purpose                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `project/config/workflow.js` | App title, dev server, and coverage. Uses the webpack `@availity/workflow` config type. |
| `project/config/routes.json` | Mock server routes                                                                      |
| `eslint.config.js`           | ESLint flat config (`eslint-config-availity`)                                           |
| `tsconfig.json`              | Type-checking only. `checkJs` is on, so JSDoc types are checked.                        |
| `package.json`               | Scripts, dependencies, Prettier config                                                  |

## Resources

- [Availity Docs Hub](https://availity.github.io/)
- [Availity Element (component library)](https://availity.github.io/element/)
- [Availity Workflow](https://availity.github.io/availity-workflow/)
- [Availity JavaScript SDK](https://availity.github.io/sdk-js/)
- [TanStack Query](https://tanstack.com/query)
- [React Router](https://reactrouter.com/)
