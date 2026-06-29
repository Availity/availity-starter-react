# Availity Starter React

> Template project for React web apps on the Availity Portal using [@availity/workflow](https://github.com/Availity/availity-workflow)

## Requirements

- Node.js 22+
- Yarn 4+

## Getting Started

```bash
yarn
yarn start
```

## Scripts

| Script                  | Description                  |
| ----------------------- | ---------------------------- |
| `yarn start`            | Start the development server |
| `yarn build`            | Build for development        |
| `yarn build:production` | Build for production         |
| `yarn test`             | Run tests (Vitest)           |
| `yarn test:watch`       | Run tests in watch mode      |
| `yarn test:coverage`    | Run tests with coverage      |
| `yarn lint`             | Lint source files (ESLint)   |
| `yarn format`           | Format files (Prettier)      |

## Project Structure

```
project/
├── app/
│   ├── index.jsx          # App entry point
│   ├── App.jsx            # Root component with routing
│   ├── components/        # Shared components
│   ├── context/           # React Context providers
│   └── hooks/             # Custom hooks
└── config/
    └── workflow.js        # Workflow configuration
```

## Configuration

| File                         | Purpose                                       |
| ---------------------------- | --------------------------------------------- |
| `project/config/workflow.js` | Dev server, webpack, and build configuration  |
| `eslint.config.js`           | ESLint flat config                            |
| `tsconfig.json`              | TypeScript configuration (type-checking only) |

This project uses ESM (`"type": "module"` in package.json). All config files use `import`/`export` syntax.

## Tech Stack

- **Build/Dev**: [@availity/workflow](https://github.com/Availity/availity-workflow) (webpack + esbuild)
- **Components**: [@availity/element](https://availity.github.io/element/) (MUI-based design system)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting**: [eslint-config-availity](https://github.com/Availity/eslint-config-availity) (flat config)

## Data Fetching

This template uses React Context for state and `@tanstack/react-query` for server state and data fetching.

### react-query Example

```jsx
import { useQuery } from '@tanstack/react-query';
import AvUsersApi from '@availity/api-axios';

const useCurrentUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => AvUsersApi.me(),
  });

const Component = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return <p>{user ? user.name : 'A user has no name'}</p>;
};
```

> The `useCurrentUser` hook is available in [@availity/hooks](https://github.com/Availity/availity-react/tree/master/packages/hooks)

### Mutations

```jsx
import { useMutation } from '@tanstack/react-query';

const Component = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (variables) => updateUserInfo(variables),
  });

  return <button onClick={() => mutate({ active: false })}>Disable User</button>;
};
```

## Resources

- [Availity Docs Hub](https://availity.github.io/)
- [Availity Workflow Docs](https://availity.github.io/availity-workflow/)
- [Availity Element (Component Library)](https://availity.github.io/element/)
- [Availity React Packages](https://availity.github.io/availity-react/)
- [Availity JavaScript SDK](https://availity.github.io/sdk-js/)
- [TanStack Query Docs](https://tanstack.com/query)
