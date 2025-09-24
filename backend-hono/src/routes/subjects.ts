import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const router = new Hono();

// Subject data (in-memory for now - can be replaced with database)
const subjects = [
  {
    id: 'math',
    name: 'Mathématiques',
    description: 'Apprendre les nombres, l\'addition, la soustraction et la géométrie',
    icon: '🔢',
    modules: [
      { id: 'numbers', name: 'Les Nombres', level: 1 },
      { id: 'addition', name: 'Addition', level: 1 },
      { id: 'subtraction', name: 'Soustraction', level: 2 },
      { id: 'geometry', name: 'Géométrie', level: 2 },
    ],
  },
  {
    id: 'french',
    name: 'Français',
    description: 'Apprendre à lire, écrire et comprendre le français',
    icon: '📚',
    modules: [
      { id: 'alphabet', name: 'Alphabet', level: 1 },
      { id: 'reading', name: 'Lecture', level: 1 },
      { id: 'writing', name: 'Écriture', level: 2 },
      { id: 'grammar', name: 'Grammaire', level: 2 },
    ],
  },
  {
    id: 'science',
    name: 'Sciences',
    description: 'Explorer le monde naturel et les sciences',
    icon: '🔬',
    modules: [
      { id: 'nature', name: 'Monde Naturel', level: 1 },
      { id: 'physics', name: 'Physique', level: 2 },
      { id: 'biology', name: 'Biologie', level: 2 },
      { id: 'experiments', name: 'Expériences', level: 3 },
    ],
  },
  {
    id: 'history',
    name: 'Histoire',
    description: 'Découvrir l\'histoire de Madagascar et du monde',
    icon: '🏛️',
    modules: [
      { id: 'madagascar', name: 'Histoire de Madagascar', level: 1 },
      { id: 'figures', name: 'Grandes Figures', level: 2 },
      { id: 'events', name: 'Événements Importants', level: 2 },
      { id: 'timeline', name: 'Chronologie', level: 3 },
    ],
  },
  {
    id: 'geography',
    name: 'Géographie',
    description: 'Explorer les continents, les pays et Madagascar',
    icon: '🌍',
    modules: [
      { id: 'continents', name: 'Continents', level: 1 },
      { id: 'countries', name: 'Pays', level: 1 },
      { id: 'madagascar', name: 'Madagascar', level: 2 },
      { id: 'maps', name: 'Cartes', level: 2 },
    ],
  },
  {
    id: 'english',
    name: 'Anglais',
    description: 'Apprendre l\'anglais de base et la communication',
    icon: '🇬🇧',
    modules: [
      { id: 'basics', name: 'Vocabulaire de Base', level: 1 },
      { id: 'phrases', name: 'Phrases Essentielles', level: 1 },
      { id: 'communication', name: 'Communication', level: 2 },
      { id: 'culture', name: 'Culture Anglophone', level: 2 },
    ],
  },
];

// Get all subjects
router.get('/', (c) => {
  return c.json({ subjects });
});

// Get subject by ID
router.get('/:id', (c) => {
  const id = c.req.param('id');
  const subject = subjects.find(s => s.id === id);

  if (!subject) {
    return c.json({ error: 'Subject not found' }, 404);
  }

  return c.json({ subject });
});

// Get modules for a subject
router.get('/:id/modules', (c) => {
  const id = c.req.param('id');
  const subject = subjects.find(s => s.id === id);

  if (!subject) {
    return c.json({ error: 'Subject not found' }, 404);
  }

  return c.json({ modules: subject.modules });
});

export default router;
