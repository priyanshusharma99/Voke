import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search, Star, Filter, BookOpen, Code, Database, Brain } from 'lucide-react';

const QuestionBank = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('voke-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [isAuthenticated, navigate]);

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('voke-favorites', JSON.stringify(newFavorites));
  };

  const questions = [
    {
      id: 1,
      question: 'Explain the concept of Virtual DOM in React',
      category: 'Frontend',
      difficulty: 'intermediate',
      tags: ['React', 'JavaScript', 'Performance'],
      icon: Code,
    },
    {
      id: 2,
      question: 'How do React Hooks work and what problems do they solve?',
      category: 'Frontend',
      difficulty: 'intermediate',
      tags: ['React', 'Hooks'],
      icon: Code,
    },
    {
      id: 3,
      question: 'Design a RESTful API for a social media platform',
      category: 'Backend',
      difficulty: 'advanced',
      tags: ['API Design', 'REST', 'Architecture'],
      icon: Database,
    },
    {
      id: 4,
      question: 'Explain database indexing and when to use it',
      category: 'Backend',
      difficulty: 'intermediate',
      tags: ['Database', 'Performance', 'SQL'],
      icon: Database,
    },
    {
      id: 5,
      question: 'Describe a time when you had to learn a new technology quickly',
      category: 'Behavioral',
      difficulty: 'beginner',
      tags: ['Soft Skills', 'Learning'],
      icon: Brain,
    },
    {
      id: 6,
      question: 'How do you handle conflicts in a team?',
      category: 'Behavioral',
      difficulty: 'beginner',
      tags: ['Soft Skills', 'Teamwork'],
      icon: Brain,
    },
    {
      id: 7,
      question: 'Implement a function to debounce user input',
      category: 'Algorithms',
      difficulty: 'intermediate',
      tags: ['JavaScript', 'Performance', 'Algorithms'],
      icon: Code,
    },
    {
      id: 8,
      question: 'Explain Big O notation and time complexity',
      category: 'Algorithms',
      difficulty: 'intermediate',
      tags: ['Algorithms', 'Theory'],
      icon: BookOpen,
    },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = ['all', 'Frontend', 'Backend', 'Algorithms', 'Behavioral'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const difficultyColors = {
    beginner: 'bg-success/10 text-success border-success/20',
    intermediate: 'bg-warning/10 text-warning border-warning/20',
    advanced: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Question Bank</h1>
          <p className="text-lg text-muted-foreground">
            Browse and practice with curated interview questions
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-border/50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredQuestions.length} of {questions.length} questions
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid gap-4">
          {filteredQuestions.map((question) => (
            <Card
              key={question.id}
              className="border-border/50 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <question.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold leading-snug">
                        {question.question}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(question.id)}
                        className="flex-shrink-0"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            favorites.includes(question.id)
                              ? 'fill-accent text-accent'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge variant="outline">{question.category}</Badge>
                      <Badge
                        variant="outline"
                        className={difficultyColors[question.difficulty]}
                      >
                        {question.difficulty}
                      </Badge>
                      {question.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="outline" size="sm">
                      Practice This Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold mb-2">No questions found</p>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setDifficultyFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
