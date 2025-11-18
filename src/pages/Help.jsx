import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  HelpCircle,
  Keyboard,
  Shield,
  BookOpen,
  Video,
  Mic,
  MessageSquare,
} from 'lucide-react';

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How does VOKE work?',
      answer:
        'VOKE is an AI-powered mock interview platform that runs entirely in your browser. You select a role and difficulty, answer questions using text or voice input, and receive instant AI-generated feedback on your performance. All data is stored locally for privacy.',
    },
    {
      question: 'Is my data safe and private?',
      answer:
        'Yes! All your interview data, answers, and recordings are stored locally in your browser using localStorage and IndexedDB. Nothing is sent to external servers. Your data never leaves your device.',
    },
    {
      question: 'Can I use voice input for answers?',
      answer:
        'Yes, VOKE supports speech-to-text using the Web Speech API. Click the microphone button to enable voice input. Note that this feature requires a modern browser with speech recognition support.',
    },
    {
      question: 'Can I record my interview sessions?',
      answer:
        'Yes, you can enable video and audio recording during your interview. Your recordings are stored locally and can be reviewed later to analyze your body language and communication style.',
    },
    {
      question: 'How is my performance scored?',
      answer:
        'The AI interviewer evaluates your answers based on multiple factors including relevance, depth, structure, and use of examples. Scores are given per question and aggregated for an overall interview score.',
    },
    {
      question: 'Can I customize the questions?',
      answer:
        'Yes! You can browse the Question Bank and add custom questions. You can also filter questions by category, difficulty, and tags to focus on specific topics.',
    },
    {
      question: 'What roles does VOKE support?',
      answer:
        'VOKE currently supports Frontend Engineer, Backend Engineer, Full Stack Engineer, Data Scientist, Mobile Developer, and DevOps Engineer roles. Each role has curated questions specific to that field.',
    },
    {
      question: 'Can I export my interview reports?',
      answer:
        'Yes, you can export your interview reports as PDF or share them via a link. The reports include your scores, answers, AI feedback, and improvement suggestions.',
    },
  ];

  const shortcuts = [
    { keys: ['Enter'], description: 'Submit answer (when typing)' },
    { keys: ['Ctrl', 'K'], description: 'Quick search' },
    { keys: ['Esc'], description: 'Close dialogs' },
    { keys: ['Tab'], description: 'Navigate between fields' },
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'AI Interviewer',
      description: 'Practice with an intelligent AI that asks follow-up questions and provides realistic interview experience.',
    },
    {
      icon: Mic,
      title: 'Voice Input',
      description: 'Use speech-to-text to answer questions naturally, just like in a real interview.',
    },
    {
      icon: Video,
      title: 'Video Recording',
      description: 'Record your sessions to review your body language and presentation skills.',
    },
    {
      icon: Shield,
      title: '100% Private',
      description: 'All data stays in your browser. No servers, no tracking, complete privacy.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">Help & Tutorials</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about using VOKE
            </p>
          </div>

          {/* Features Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="font-semibold">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Keyboard Shortcuts</h2>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {shortcuts.map((shortcut, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{shortcut.description}</span>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, i) => (
                            <React.Fragment key={i}>
                              <kbd className="px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-md">
                                {key}
                              </kbd>
                              {i < shortcut.keys.length - 1 && (
                                <span className="text-muted-foreground">+</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      {index < shortcuts.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Data Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                VOKE is built with privacy as a core principle. Here's what you need to know:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All data is stored locally in your browser using localStorage and IndexedDB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>No data is sent to external servers or third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Audio and video recordings stay on your device</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>You can delete all your data at any time from your Profile settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Clearing browser data will remove all VOKE information</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
