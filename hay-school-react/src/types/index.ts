// Core types for Hay School platform

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  grade: number;
  avatar?: string;
  preferences: {
    favoriteSubject: string;
    learningStyle: 'visual' | 'auditory' | 'kinesthetic';
    difficulty: 'easy' | 'medium' | 'hard';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  modules: SubjectModule[];
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export interface SubjectModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
  isLocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'interactive' | 'reading';
  content: string;
  duration: number; // in minutes
  isCompleted: boolean;
  score?: number;
  resources?: Resource[];
}

export interface Quiz {
  id: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  attempts: number;
  bestScore?: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Resource {
  id: string;
  type: 'video' | 'audio' | 'document' | 'image';
  title: string;
  url: string;
  duration?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Progress {
  subjectId: string;
  completedLessons: number;
  totalLessons: number;
  currentStreak: number;
  bestStreak: number;
  totalTimeSpent: number; // in minutes
  averageScore: number;
  lastActivity: Date;
}

export interface ChatbotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  subject?: string;
  lesson?: string;
}

export interface AppSettings {
  language: 'fr' | 'mg' | 'en';
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  offlineMode: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface ProfileFormData {
  name: string;
  age: number;
  grade: number;
  favoriteSubject: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic';
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

// Game/Interactive types
export interface GameState {
  score: number;
  level: number;
  lives: number;
  timeRemaining: number;
  isGameOver: boolean;
  achievements: string[];
}

// Offline types
export interface OfflineContent {
  id: string;
  type: 'lesson' | 'quiz' | 'resource';
  data: any;
  downloadedAt: Date;
  lastAccessed?: Date;
}
