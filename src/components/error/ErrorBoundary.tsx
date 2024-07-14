'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { ErrorImg } from './ErrorImg';

interface ErrorBoundaryState {
  error: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: false,
  };

  componentDidCatch(err: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="w-[90vw] h-[90vh] flex justify-center items-center flex-col">
          <ErrorImg />
          <p className="text-lg font-bold text-yellow">
            Curse My Metal Body, I Wasn&#x27;t Fast Enough!
          </p>
          <p className="text-lg font-bold text-yellow">
            Something went wrong. Please try again later.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
