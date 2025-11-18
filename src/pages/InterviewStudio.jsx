import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Progress } from '../components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Send,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import gsap from 'gsap';

const InterviewStudio = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('setup'); // setup, interview, complete
  const [role, setRole] = useState('frontend');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questionCount, setQuestionCount] = useState('5');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [aiMessage, setAiMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const aiMessageRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (step === 'interview') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [step]);

  useEffect(() => {
    if (step === 'interview' && aiMessage && aiMessageRef.current) {
      // Typewriter effect
      setIsTyping(true);
      let index = 0;
      const message = aiMessage;
      setAiMessage('');
      
      const typeInterval = setInterval(() => {
        if (index < message.length) {
          setAiMessage((prev) => prev + message[index]);
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(typeInterval);
    }
  }, [currentQuestion]);

  const roles = {
    frontend: 'Frontend Engineer',
    backend: 'Backend Engineer',
    fullstack: 'Full Stack Engineer',
    data: 'Data Scientist',
    mobile: 'Mobile Developer',
    devops: 'DevOps Engineer',
  };

  const questions = {
    frontend: [
      "Can you explain the concept of Virtual DOM in React and how it improves performance?",
      "What are React Hooks and why were they introduced?",
      "How would you optimize the performance of a React application?",
      "Explain the difference between controlled and uncontrolled components.",
      "What is your approach to handling state management in large applications?",
    ],
    backend: [
      "How do you design a RESTful API?",
      "Explain the concept of database indexing and when you would use it.",
      "What is your approach to handling authentication and authorization?",
      "How do you ensure the security of an API?",
      "Describe your experience with microservices architecture.",
    ],
  };

  const getQuestions = () => {
    return questions[role] || questions.frontend;
  };

  const startInterview = () => {
    setStep('interview');
    setAiMessage(`Hello ${user?.name}! I'm your AI interviewer today. Let's start with the first question. Take your time and answer thoroughly. Ready?`);
    
    setTimeout(() => {
      const firstQuestion = getQuestions()[0];
      setAiMessage(firstQuestion);
    }, 3000);
  };

  const submitAnswer = () => {
    if (!answer.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    // Mock AI feedback
    const feedback = generateFeedback(answer);
    const newAnswer = {
      question: getQuestions()[currentQuestion],
      answer: answer,
      feedback: feedback,
      score: Math.floor(Math.random() * 30) + 70, // Mock score 70-100
    };

    setAnswers([...answers, newAnswer]);
    setAnswer('');

    if (currentQuestion < parseInt(questionCount) - 1) {
      // Next question
      setIsTyping(true);
      setAiMessage('Great! Let me ask you the next question...');
      
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setAiMessage(getQuestions()[currentQuestion + 1]);
      }, 2000);
    } else {
      // Complete interview
      completeInterview([...answers, newAnswer]);
    }
  };

  const generateFeedback = (ans) => {
    const length = ans.length;
    if (length > 300) {
      return "Excellent detailed answer! You covered the topic comprehensively.";
    } else if (length > 150) {
      return "Good answer with relevant points. Consider adding more specific examples.";
    } else {
      return "Your answer could benefit from more detail and specific examples.";
    }
  };

  const completeInterview = (allAnswers) => {
    const avgScore = Math.round(
      allAnswers.reduce((acc, a) => acc + a.score, 0) / allAnswers.length
    );

    const interview = {
      id: Date.now(),
      role: roles[role],
      difficulty,
      date: new Date().toISOString(),
      questionsAnswered: allAnswers.length,
      score: avgScore,
      duration: Math.floor(timeElapsed / 60),
      answers: allAnswers,
    };

    // Save to localStorage
    const savedInterviews = localStorage.getItem('voke-interviews');
    const interviews = savedInterviews ? JSON.parse(savedInterviews) : [];
    interviews.unshift(interview);
    localStorage.setItem('voke-interviews', JSON.stringify(interviews));

    toast.success('Interview completed!');
    navigate(`/review/${interview.id}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-3xl">Start New Interview</CardTitle>
                <p className="text-muted-foreground">
                  Configure your practice interview session
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Job Role</label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roles).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Difficulty Level</label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Number of Questions</label>
                  <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Questions (~10 min)</SelectItem>
                      <SelectItem value="5">5 Questions (~15 min)</SelectItem>
                      <SelectItem value="10">10 Questions (~30 min)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button size="lg" className="w-full" onClick={startInterview}>
                    Start Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Interview in Progress</h1>
            <p className="text-muted-foreground">{roles[role]} - {difficulty}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
            </div>
            <Badge variant="outline" className="px-4 py-2">
              Question {currentQuestion + 1} / {questionCount}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <Progress
          value={((currentQuestion + 1) / parseInt(questionCount)) * 100}
          className="mb-8 h-2"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Interview Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Interviewer */}
            <Card className="border-primary/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">AI Interviewer</p>
                    <div ref={aiMessageRef} className="text-base leading-relaxed">
                      {aiMessage}
                      {isTyping && (
                        <span className="inline-block w-1 h-5 ml-1 bg-primary animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Answer Area */}
            <Card>
              <CardContent className="p-6">
                <label className="text-sm font-semibold mb-3 block">Your Answer</label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here... Take your time and be thorough."
                  className="min-h-[200px] mb-4 text-base"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsRecording(!isRecording)}
                      className={isRecording ? 'bg-destructive/10 text-destructive' : ''}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={isVideoOn ? 'bg-primary/10 text-primary' : ''}
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button onClick={submitAnswer} size="lg">
                    <Send className="mr-2 w-4 h-4" />
                    Submit Answer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Take your time to think before answering
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Provide specific examples from your experience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Structure your answer clearly (STAR method)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Ask clarifying questions if needed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: parseInt(questionCount) }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        i < currentQuestion
                          ? 'bg-success/10 text-success'
                          : i === currentQuestion
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {i < currentQuestion ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-current" />
                      )}
                      <span className="text-sm font-medium">Question {i + 1}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewStudio;
