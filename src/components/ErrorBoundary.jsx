import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log('UI Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='rounded-2xl bg-red-100 p-6 text-center text-red-700'>
          Something went wrong in the UI.
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
