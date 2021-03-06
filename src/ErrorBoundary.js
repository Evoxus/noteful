import React, {Component} from 'react';
import Header from './Header/Header';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <main>
            <Header />
            <h1>Something went wrong.</h1>
          </main>
        );
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;