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
