import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, eventId: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.withScope(scope => {
          scope.setExtras(errorInfo);
          const eventId = Sentry.captureException(error);
          this.setState({eventId})
      });
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
            );
        } else {
            //when there's not an error, render children untouched
            return this.props.children;
        } 
    }
}
export default ErrorBoundary;
