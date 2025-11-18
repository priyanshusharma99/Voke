import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Play,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
  BarChart3,
  Target,
  Calendar,
} from 'lucide-react';
import gsap from 'gsap';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    // Load interviews from localStorage
    const savedInterviews = localStorage.getItem('voke-interviews');
    if (savedInterviews) {
      setInterviews(JSON.parse(savedInterviews));
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dashboard-card', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: Award,
      label: 'Interviews Completed',
      value: interviews.length,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: interviews.length > 0
        ? Math.round(interviews.reduce((acc, i) => acc + i.score, 0) / interviews.length)
        : 0,
      suffix: '%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Clock,
      label: 'Total Practice Time',
      value: interviews.reduce((acc, i) => acc + (i.duration || 0), 0),
      suffix: ' min',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  const recommendedTopics = [
    { name: 'React Hooks', progress: 60, category: 'Frontend' },
    { name: 'System Design', progress: 30, category: 'Architecture' },
    { name: 'Behavioral Questions', progress: 80, category: 'Soft Skills' },
    { name: 'Data Structures', progress: 45, category: 'Algorithms' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div ref={dashboardRef} className="container mx-auto px-4 pt-24 pb-16">
        {/* Welcome Section */}
        <div className="dashboard-card mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to practice your interview skills today?
              </p>
            </div>
            <Button
              size="lg"
              className="w-fit group"
              onClick={() => navigate('/interview')}
            >
              <Play className="mr-2 w-5 h-5" />
              Start New Interview
              <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="dashboard-card border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold">
                      {stat.value}{stat.suffix}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Interviews */}
          <Card className="dashboard-card lg:col-span-2 border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Interviews</CardTitle>
                  <CardDescription>Your latest practice sessions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/questions')}>
                  View All
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {interviews.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    No interviews yet. Start your first practice session!
                  </p>
                  <Button onClick={() => navigate('/interview')}>
                    Start Interview
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {interviews.slice(0, 5).map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/review/${interview.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{interview.role}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(interview.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{interview.questionsAnswered} questions</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={`${
                            interview.score >= 80
                              ? 'bg-success/10 text-success'
                              : interview.score >= 60
                              ? 'bg-warning/10 text-warning'
                              : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {interview.score}%
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recommended Topics */}
          <Card className="dashboard-card border-border/50">
            <CardHeader>
              <CardTitle>Recommended Topics</CardTitle>
              <CardDescription>Focus areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recommendedTopics.map((topic, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold">{topic.name}</p>
                        <p className="text-xs text-muted-foreground">{topic.category}</p>
                      </div>
                      <span className="text-sm font-semibold">{topic.progress}%</span>
                    </div>
                    <Progress value={topic.progress} className="h-2" />
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => navigate('/questions')}
              >
                Browse All Topics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
