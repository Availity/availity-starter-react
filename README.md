# Availity Starter React

> Simple Template Project For React Web Apps on the Availity Portal

Example Project running an ID Card Viewer App.

## https://github.com/Availity/availity-workflow#react

## Usage

### Running

```bash
$ yarn
$ yarn start
```

### Mobx

This template makes use of `mobx` and `mobx-react-lite`. The implementation is modelled after [https://mobx-react.js.org/state-how].

#### Adding another store

- Add a file in `project/app/stores`
  - This should export a function which creates the store. For more information on how `useLocalStore` works, [click here](https://mobx-react.js.org/state-local)
- Add the store to the `StoreProvider` component.
  - This can be done by either modifying the function `useLocalStore` takes in or by creating another local store to pass to the `value` prop.
- Add a hook in `project/app/hooks` to observe the store
  - The hook should take in a function which is a selector. This way we can only observe the data we need for that component, instead of the whole store.

#### FAQ

**Question:** Why use `mobx-react-lite` instead of `mobx-react`?

**Answer:** `mobx-react-lite` was built specifically for function components and hooks. If you need or plan on using Class Components then you will need to replace `mobx-react-lite` with `mobx-react`.

**Q:** Do I need the `StoreProvider`?

**A:** Yes. The intention of the `StoreProvider` is to be out of sight and out of mind. We have the provider to make mocking values easier in tests.

**Q:** Where are the decorators (action, computed, etc.)?

**A:** Forget about them. `useLocalStore` assigns them to the object created by the function passed to it.

```js
const createStore = () => ({
  id: '', // observable
  loading: false, // observable
  setId() {}, // action
  async fetch(), // action
  get isLoggedIn() {}, // computed
});
```

**Q:** How do I use `useAppStore`?

**A:** The hook `useAppStore` accepts one argument. This is a selctor function which returns the data we want to obsererve. In the example below, we use the implicit return of arrow functions to return an object.

```js
const { id, name, getSomething } = useAppStore(store => ({
  id: store.id,
  name: store.validResponse ? store.response.name : '',
  getSomething: () => fetchSomething({ id }),
}));
```

**Q:** What is the purpose of passing a selector function to `useAppStore` instead of returning the whole store?

**A:** Passing a function to `useAppStore` allows our component to only observe specific properties from our store. This means if we have a larger store, but only want to observe one property, say `memberName`, the component will only be notified of changes to the `memberName`.

> Note: If you want to observe the whole store or return it simply use `const appStore = useAppStore(store => store)`

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
