# Availity Starter React

> Simple Template Project For React Web Apps on the Availity Portal

## Resources

The following are links to documentation for building an app at Availity

- [Availity GitHub Repositories](https://github.com/Availity)
- [Availity Workflow Tutorial](https://availity.github.io/availity-workflow/)
- [Availity Component Docs](https://availity.github.io/availity-react/)
- [Availity JavaScript SDK Docs](https://availity.github.io/sdk-js/)

## Usage

### Running the App

Install the dependencies and run the app

```bash
yarn
yarn start
```

### Data Fetching

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

const useCurrentUser = () => useQuery('user', () => fetchUser());

const Component = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  return <p>{user ? user.name : 'A user has no name'}</p>;
};
```

> Note: the `useCurrentUser` hook is available in [@availity/hooks](https://github.com/Availity/availity-react/tree/master/packages/hooks)

`react-query` also exposes a `useMutation` hook. This helps with handling loading and error states more easily as there is no `useState` variable to toggle on off.

```js
async function updateUser(variables) {
  return updateUserInfo(variables);
}

const Component = () => {
  const { mutate, isLoading, error } = useMutation(updateUser);

  return <button onClick={() => mutate({ active: false })}>Disable User</button>;
};
```

> Note: the `SearchForm` component has an example of a `useMutation` in action
