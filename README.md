# Availity Starter React

> Simple Template Project For React Web Apps on the Availity Portal

Example Project running an ID Card Viewer App.

## https://github.com/Availity/availity-workflow#react

## Usage

### Running

Install the dependencies and run the app

```bash
yarn
yarn start
```

### react-query

This template uses `React Context` and `react-query` to handle state and data fetching. You can find more information about `React Context` [here](https://reactjs.org/docs/hooks-reference.html#usecontext) and `react-query` [here](https://react-query.tanstack.com/)

#### Why this combo?

Most web apps, especially at Availity, require fetching data. `react-query` provides many tools to allow for a better developer and user experience. It has easy to use loading states, error handling, and caching. We use `Context` as the state manager. `Context` does have potential scaling performance concerns, but these can normally be minimized with good design, data flow, and use of `react-query` caching.

#### Quick Guide on `react-query`

The main concept to focus on when using `react-query` and its cache are the use of `keys`.

Every time this hook is called it will check if there is data available for the key `user`

```js
async function fetchUser() {
  return AvUsersApi.me();
}

const query = useQuery('user', () => fetchUser());
```

> Note: this hook is available in `@availity/hooks`

`react-query` also exposes a `useMutation` hook. This helps with handling loading and error states more easily as there is no `useState` variable to toggle on off.

```js
async function updateUser(variables) {
  return updateUser(variables);
}

const { mutate, isLoading, error } = useMutation(updateUser);

<button onClick={() => mutate({ active: false })}>Disable User</button>;
```

> Note: the `SearchForm` component has an example of a `useMutation` in action

### Dev Tools

This template uses the following tools to aid in the development process.

- [husky](https://github.com/typicode/husky#readme)
- [commitlint](https://github.com/conventional-changelog/commitlint#readme)
- [lint-staged](https://github.com/okonet/lint-staged#readme)

### Committing Code to Git

Use conventional commits messages following [Angular commit message style](https://github.com/angular/angular/blob/master/CONTRIBUTING.md). This project has pre-commit hook (using [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)) and that should enforce the Angular commit conventions.

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

Give detailed descriptions in your commit messages.
