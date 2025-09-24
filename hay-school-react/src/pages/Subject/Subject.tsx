import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  BookOpen,
  CheckCircle,
  Clock,
  Star,
  Trophy
} from 'lucide-react';
import { useState } from 'react';

const Subject = () => {
  const { subjectId } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Mock data - in a real app, this would come from an API
  const subjectData = {
    math: {
      name: 'Mathématiques',
      description: 'Maîtrisez les nombres, les calculs et la géométrie',
      icon: '🔢',
      color: 'bg-blue-500',
      progress: 15,
      totalLessons: 24,
      completedLessons: 4,
      modules: [
        {
          id: 'numbers',
          title: 'Les Nombres',
          description: 'Apprendre à compter et reconnaître les chiffres',
          lessons: [
            { id: 1, title: 'Les chiffres de 1 à 10', duration: 15, completed: true },
            { id: 2, title: 'Les chiffres de 11 à 20', duration: 20, completed: true },
            { id: 3, title: 'Les dizaines', duration: 25, completed: true },
            { id: 4, title: 'Les centaines', duration: 30, completed: true },
          ]
        },
        {
          id: 'addition',
          title: 'L\'Addition',
          description: 'Ajouter des nombres simplement',
          lessons: [
            { id: 5, title: 'Addition jusqu\'à 10', duration: 20, completed: false },
            { id: 6, title: 'Addition jusqu\'à 20', duration: 25, completed: false },
            { id: 7, title: 'Addition avec retenue', duration: 35, completed: false },
          ]
        }
      ]
    },
    francais: {
      name: 'Français',
      description: 'Développez vos compétences en lecture et écriture',
      icon: '📚',
      color: 'bg-red-500',
      progress: 0,
      totalLessons: 18,
      completedLessons: 0,
      modules: [
        {
          id: 'alphabet',
          title: 'L\'Alphabet',
          description: 'Apprendre les lettres et leur prononciation',
          lessons: [
            { id: 1, title: 'Voyelles A, E, I, O, U', duration: 20, completed: false },
            { id: 2, title: 'Consonnes B, C, D', duration: 25, completed: false },
          ]
        }
      ]
    }
  };

  const subject = subjectData[subjectId as keyof typeof subjectData];

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Matière non trouvée
          </h1>
          <Link to="/categories" className="btn-primary">
            Retour aux matières
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/categories"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux matières
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-16 h-16 rounded-xl ${subject.color} flex items-center justify-center text-3xl shadow-lg`}>
              {subject.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {subject.name}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {subject.description}
              </p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Votre progression
              </h2>
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600">
                  {subject.completedLessons} / {subject.totalLessons} leçons terminées
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progression globale</span>
                <span className="text-primary-600 font-medium">{subject.progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${subject.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-8">
          {subject.modules.map((module, moduleIndex) => (
            <div key={module.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {module.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      {module.lessons.filter(l => l.completed).length} / {module.lessons.length} terminées
                    </div>
                    <div className="w-24 progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(module.lessons.filter(l => l.completed).length / module.lessons.length) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          lesson.completed
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{lesson.duration} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <BookOpen className="h-4 w-4" />
                              <span>Leçon {lesson.id}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {lesson.completed && (
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">100%</span>
                          </div>
                        )}
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        {subject.modules.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Leçons en préparation
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Nous travaillons actuellement sur le contenu de cette matière.
              Revenez bientôt pour découvrir les leçons !
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Actions rapides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="btn-primary flex items-center justify-center space-x-2 py-4">
              <Play className="h-5 w-5" />
              <span>Continuer la leçon</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 py-4">
              <Trophy className="h-5 w-5" />
              <span>Voir mes badges</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 py-4">
              <Star className="h-5 w-5" />
              <span>Test de niveau</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
