import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import {
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Download,
  Share2,
} from 'lucide-react';
import { toast } from 'sonner';

const ReviewReport = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    // Load interview from localStorage
    const savedInterviews = localStorage.getItem('voke-interviews');
    if (savedInterviews) {
      const interviews = JSON.parse(savedInterviews);
      const found = interviews.find((i) => i.id === parseInt(id));
      if (found) {
        setInterview(found);
      } else {
        toast.error('Interview not found');
        navigate('/dashboard');
      }
    }
  }, [id, isAuthenticated, navigate]);

  if (!interview) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const scoreColor =
    interview.score >= 80
      ? 'text-success'
      : interview.score >= 60
      ? 'text-warning'
      : 'text-destructive';

  const strengths = [
    'Clear and structured communication',
    'Strong technical knowledge',
    'Good use of examples',
  ];

  const improvements = [
    'Add more specific technical details',
    'Include real-world scenarios',
    'Practice brevity in explanations',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <Card className="mb-8 border-primary/20 shadow-xl">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Overall Score */}
              <div className="md:col-span-1 flex flex-col items-center justify-center text-center">
                <Award className={`w-16 h-16 ${scoreColor} mb-4`} />
                <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
                <p className={`text-5xl font-bold ${scoreColor}`}>{interview.score}%</p>
              </div>

              <Separator orientation="vertical" className="hidden md:block" />

              {/* Interview Details */}
              <div className="md:col-span-3 grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Role</p>
                  <p className="text-lg font-semibold">{interview.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Questions Answered</p>
                  <p className="text-lg font-semibold">{interview.questionsAnswered}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <p className="text-lg font-semibold">{interview.duration} min</p>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <p className="text-sm text-muted-foreground mb-2">Date</p>
                  <p className="text-lg font-semibold">
                    {new Date(interview.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Question-by-Question Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Question-by-Question Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {interview.answers.map((answer, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Q{index + 1}</Badge>
                          <Badge
                            variant="secondary"
                            className={
                              answer.score >= 80
                                ? 'bg-success/10 text-success'
                                : answer.score >= 60
                                ? 'bg-warning/10 text-warning'
                                : 'bg-destructive/10 text-destructive'
                            }
                          >
                            {answer.score}%
                          </Badge>
                        </div>
                        <p className="font-semibold mb-2">{answer.question}</p>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-1">Your Answer:</p>
                      <p className="text-sm">{answer.answer}</p>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                      <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        AI Feedback:
                      </p>
                      <p className="text-sm text-muted-foreground">{answer.feedback}</p>
                    </div>

                    {index < interview.answers.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Strengths & Improvements */}
          <div className="space-y-6">
            {/* Strengths */}
            <Card className="border-success/20 bg-success/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="border-warning/20 bg-warning/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-warning" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommended Resources */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <a
                    href="#"
                    className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-semibold mb-1">
                      Advanced React Patterns
                    </p>
                    <p className="text-xs text-muted-foreground">Practice guide</p>
                  </a>
                  <a
                    href="#"
                    className="block p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                  >
                    <p className="text-sm font-semibold mb-1">
                      System Design Fundamentals
                    </p>
                    <p className="text-xs text-muted-foreground">Video course</p>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-border/50">
              <CardContent className="p-6">
                <Button
                  className="w-full mb-3"
                  onClick={() => navigate('/interview')}
                >
                  Practice Again
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/questions')}
                >
                  Browse Questions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewReport;
