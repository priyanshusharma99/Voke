import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
                <p className="text-lg text-muted-foreground">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Go Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate('/')}
                  className="gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
