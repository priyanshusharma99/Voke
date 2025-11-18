import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Mic,
  Video,
  Brain,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Zap,
  Target,
  Shield,
  Clock,
  Award,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
      });

      gsap.from('.hero-image', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
      });

      // Feature cards animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Interview Practice
                </Badge>
                <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Master Your Next
                  <span className="block mt-2 gradient-text">Interview</span>
                </h1>
                <p className="hero-subtitle text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Practice with our AI interviewer, get real-time feedback, and ace your
                  dream job interview. All in your browser, completely private.
                </p>
              </div>

              <div className="hero-cta flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 group"
                  onClick={() => navigate('/signup')}
                >
                  Start Practicing Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold px-8"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent"
                      />
                    ))}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">1,000+ users</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right content - Hero Image/Illustration */}
            <div className="hero-image relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop"
                  alt="Professional interview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              {/* Floating cards */}
              <Card className="absolute -bottom-6 -left-6 p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Interview Score</p>
                    <p className="text-2xl font-bold text-success">95%</p>
                  </div>
                </div>
              </Card>

              <Card className="absolute -top-6 -right-6 p-4 shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI Feedback</p>
                    <p className="text-xs text-muted-foreground">Real-time</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Practice with cutting-edge AI technology designed to help you perform your best
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="feature-card group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              How VOKE Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-6 shadow-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-muted-foreground/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Card className="max-w-4xl mx-auto border-primary/20 shadow-2xl">
            <CardContent className="p-12 text-center">
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Ace Your Interview?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have improved their interview skills with
                VOKE. Start practicing today, completely free.
              </p>
              <Button
                size="lg"
                className="text-base font-semibold px-8"
                onClick={() => navigate('/signup')}
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <Mic className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">VOKE</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 VOKE. All interviews are stored locally in your browser.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Interview',
    description:
      'Practice with our intelligent AI interviewer that adapts to your responses and provides realistic follow-up questions.',
  },
  {
    icon: Mic,
    title: 'Voice & Text Input',
    description:
      'Answer questions using voice (speech-to-text) or type your responses. Practice the way you prefer.',
  },
  {
    icon: Video,
    title: 'Record & Review',
    description:
      'Record your interview sessions with webcam and audio to review your performance and body language.',
  },
  {
    icon: TrendingUp,
    title: 'Instant Feedback',
    description:
      'Get detailed feedback on your answers, including strengths, areas for improvement, and scoring.',
  },
  {
    icon: Shield,
    title: '100% Private',
    description:
      'All your interview data is stored locally in your browser. No data leaves your device.',
  },
  {
    icon: Target,
    title: 'Role-Specific Questions',
    description:
      'Practice with curated questions for Frontend, Backend, Data Science, and more roles.',
  },
];

const steps = [
  {
    title: 'Choose Your Role',
    description: 'Select the job role and difficulty level for your practice interview.',
  },
  {
    title: 'Start Interview',
    description: 'Answer questions from our AI interviewer using voice or text input.',
  },
  {
    title: 'Get Feedback',
    description: 'Review detailed reports with scores, insights, and improvement tips.',
  },
];

export default LandingPage;
