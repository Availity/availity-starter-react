# Availity Starter React

> Template project for React web apps on the Availity Portal using [@availity/workflow](https://github.com/Availity/availity-workflow)

## Requirements

- Node.js 22+ or 24+
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
| `yarn build:staging`    | Build for staging            |
| `yarn test`             | Run tests (Vitest)           |
| `yarn test:watch`       | Run tests in watch mode      |
| `yarn test:coverage`    | Run tests with coverage      |
| `yarn lint`             | Lint source files (ESLint)   |
| `yarn format`           | Format files (Prettier)      |
| `yarn format:check`     | Check formatting             |
| `yarn typecheck`        | Type-check with TypeScript   |

## Project Structure

```
project/
├── app/
│   ├── index.jsx          # App entry point
│   ├── App.jsx            # Root component with routing
│   ├── components/        # Shared components (SearchForm, MemberCard, etc.)
│   ├── context/           # React Context providers
│   └── api/               # API and data-fetching utilities
├── config/
│   ├── workflow.js        # Workflow configuration
│   └── routes.json        # Mock server route mappings
└── data/
    └── spaces.json        # Mock spaces data
```

## Configuration

| File                         | Purpose                                      |
| ---------------------------- | -------------------------------------------- |
| `project/config/workflow.js` | Dev server, webpack, and build configuration |
| `eslint.config.js`           | ESLint flat config                           |

This project uses ESM (`"type": "module"` in package.json). All config files use `import`/`export` syntax.

## Tech Stack

- **Build/Dev**: [@availity/workflow](https://github.com/Availity/availity-workflow) (webpack + esbuild)
- **Components**: [@availity/element](https://availity.github.io/element/) (MUI-based design system)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Forms**: [react-hook-form](https://react-hook-form.com/) + [yup](https://github.com/jquense/yup)
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- **Linting**: [eslint-config-availity](https://github.com/Availity/eslint-config-availity) (flat config)

## Data Fetching

This template uses React Context for state and `@tanstack/react-query` for server state and data fetching.

### react-query Example

```jsx
import { useQuery } from '@tanstack/react-query';
import { avUserApi } from '@availity/api-axios';

const useCurrentUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => avUserApi.me(),
  });

const Component = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return <p>{user ? user.firstName : 'A user has no name'}</p>;
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
