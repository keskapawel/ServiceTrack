import { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error) {
    console.log('ERROR: ', error?.message);
  }

  render() {
    const { error } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    const hasError = Boolean(error);

    return !hasError ? (
      children
    ) : (
      <>
        <h2>Something went wrong</h2>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.replace('/')}>Go to homepage</button>
      </>
    );
  }
}

export default ErrorBoundary;
