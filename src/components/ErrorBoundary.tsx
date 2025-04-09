import { Component, ErrorInfo, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorId?: string;
  // errorInfo?: ErrorInfo;
}

const MODE = import.meta.env.VITE_APP_MODE;
// Function to generate a unique ID for error logging
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = generateUniqueId();

    // logErrorToService({
    //   id: errorId,
    //   error,
    //   errorInfo,
    //   userInfo: getUserContext(),
    // });

    this.setState({
      hasError: true,
      errorId: errorId,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center h-screen w-full p-6">
            <Card className="w-full max-w-md shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>Something went wrong</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert
                  variant="destructive"
                  className="mb-4"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {MODE === 'development'
                      ? this.state.error?.message ||
                        'An unexpected error occurred'
                      : `Something went wrong (Error ID: ${this.state.errorId})`}
                  </AlertDescription>
                </Alert>
                <div className="text-sm text-muted-foreground">
                  Please try refreshing the page or contact support if the issue
                  persists.
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    this.setState({ hasError: false, error: null })
                  }
                >
                  Try Again
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
