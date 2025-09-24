import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Types
interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalLessons: number;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
  type: 'video' | 'quiz' | 'interactive';
}

// Mock data - in production, this would come from a database
const subjectsData: Record<string, Subject> = {
  math: {
    id: 'math',
    name: 'Mathématiques',
    description: 'Maîtrisez les nombres, les calculs et la géométrie',
    icon: '🔢',
    color: 'bg-blue-500',
    totalLessons: 24,
    modules: [
      {
        id: 'numbers',
        title: 'Les Nombres',
        description: 'Apprendre à compter et reconnaître les chiffres',
        lessons: [
          { id: 1, title: 'Les chiffres de 1 à 10', duration: 15, completed: false, type: 'interactive' },
          { id: 2, title: 'Les chiffres de 11 à 20', duration: 20, completed: false, type: 'video' },
          { id: 3, title: 'Les dizaines', duration: 25, completed: false, type: 'quiz' },
          { id: 4, title: 'Les centaines', duration: 30, completed: false, type: 'interactive' },
        ]
      },
      {
        id: 'addition',
        title: 'L\'Addition',
        description: 'Ajouter des nombres simplement',
        lessons: [
          { id: 5, title: 'Addition jusqu\'à 10', duration: 20, completed: false, type: 'interactive' },
          { id: 6, title: 'Addition jusqu\'à 20', duration: 25, completed: false, type: 'quiz' },
          { id: 7, title: 'Addition avec retenue', duration: 35, completed: false, type: 'video' },
        ]
      }
    ]
  },
  francais: {
    id: 'francais',
    name: 'Français',
    description: 'Développez vos compétences en lecture et écriture',
    icon: '📚',
    color: 'bg-red-500',
    totalLessons: 18,
    modules: [
      {
        id: 'alphabet',
        title: 'L\'Alphabet',
        description: 'Apprendre les lettres et leur prononciation',
        lessons: [
          { id: 1, title: 'Voyelles A, E, I, O, U', duration: 20, completed: false, type: 'interactive' },
          { id: 2, title: 'Consonnes B, C, D', duration: 25, completed: false, type: 'video' },
        ]
      }
    ]
  },
  sciences: {
    id: 'sciences',
    name: 'Sciences',
    description: 'Explorez le monde naturel, la physique et la biologie',
    icon: '🔬',
    color: 'bg-green-500',
    totalLessons: 20,
    modules: []
  },
  histoire: {
    id: 'histoire',
    name: 'Histoire',
    description: 'Découvrez le passé de Madagascar et du monde',
    icon: '🏛️',
    color: 'bg-amber-500',
    totalLessons: 16,
    modules: []
  },
  geographie: {
    id: 'geographie',
    name: 'Géographie',
    description: 'Parcourez le monde, apprenez les continents et pays',
    icon: '🌍',
    color: 'bg-teal-500',
    totalLessons: 14,
    modules: []
  },
  anglais: {
    id: 'anglais',
    name: 'Anglais',
    description: 'Apprenez l\'anglais, langue internationale',
    icon: '🇬🇧',
    color: 'bg-indigo-500',
    totalLessons: 12,
    modules: []
  }
};

const subjectsRoute = new Hono();

// GET /api/subjects - Get all subjects
subjectsRoute.get('/', (c) => {
  const subjects = Object.values(subjectsData);
  return c.json({
    success: true,
    data: subjects,
    total: subjects.length
  });
});

// GET /api/subjects/:id - Get subject by ID
subjectsRoute.get('/:id', (c) => {
  const id = c.req.param('id');
  const subject = subjectsData[id];

  if (!subject) {
    return c.json({
      success: false,
      error: 'Subject not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: subject
  });
});

// GET /api/subjects/:id/modules - Get modules for a subject
subjectsRoute.get('/:id/modules', (c) => {
  const id = c.req.param('id');
  const subject = subjectsData[id];

  if (!subject) {
    return c.json({
      success: false,
      error: 'Subject not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: subject.modules,
    total: subject.modules.length
  });
});

// GET /api/subjects/:id/modules/:moduleId - Get specific module
subjectsRoute.get('/:id/modules/:moduleId', (c) => {
  const id = c.req.param('id');
  const moduleId = c.req.param('moduleId');
  const subject = subjectsData[id];

  if (!subject) {
    return c.json({
      success: false,
      error: 'Subject not found'
    }, 404);
  }

  const module = subject.modules.find(m => m.id === moduleId);
  if (!module) {
    return c.json({
      success: false,
      error: 'Module not found'
    }, 404);
  }

  return c.json({
    success: true,
    data: module
  });
});

export { subjectsRoute };
