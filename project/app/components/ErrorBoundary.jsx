import { Component } from 'react';
import { Alert, Button, Stack } from '@availity/element';

/** @import { ReactNode } from 'react' */

/** @typedef {{ hasError: boolean, error: Error | null }} State */

/** @extends {Component<{ children?: ReactNode }, State>} */
export class ErrorBoundary extends Component {
  /** @param {{ children?: ReactNode }} props */
  constructor(props) {
    super(props);
    /** @type {State} */
    this.state = { hasError: false, error: null };
  }

  /** @param {Error} error */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    if (hasError) {
      return (
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Alert severity="error">Something went wrong: {error?.message}</Alert>
          <Button onClick={() => this.setState({ hasError: false, error: null })}>Try Again</Button>
        </Stack>
      );
    }
    return children;
  }
}
