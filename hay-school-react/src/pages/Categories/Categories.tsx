import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Clock, Star } from 'lucide-react';

const Categories = () => {
  const subjects = [
    {
      id: 'math',
      name: 'Mathématiques',
      description: 'Maîtrisez les nombres, les calculs et la géométrie avec des exercices ludiques.',
      icon: '🔢',
      color: 'bg-blue-500',
      lessons: 24,
      difficulty: 'Tous niveaux',
      progress: 0
    },
    {
      id: 'francais',
      name: 'Français',
      description: 'Développez vos compétences en lecture, écriture et grammaire française.',
      icon: '📚',
      color: 'bg-red-500',
      lessons: 18,
      difficulty: 'Tous niveaux',
      progress: 0
    },
    {
      id: 'sciences',
      name: 'Sciences',
      description: 'Explorez le monde naturel, la physique et la biologie de façon amusante.',
      icon: '🔬',
      color: 'bg-green-500',
      lessons: 20,
      difficulty: 'Tous niveaux',
      progress: 0
    },
    {
      id: 'histoire',
      name: 'Histoire',
      description: 'Découvrez le passé de Madagascar et du monde à travers des récits captivants.',
      icon: '🏛️',
      color: 'bg-amber-500',
      lessons: 16,
      difficulty: 'Tous niveaux',
      progress: 0
    },
    {
      id: 'geographie',
      name: 'Géographie',
      description: 'Parcourez le monde, apprenez les continents, pays et cultures.',
      icon: '🌍',
      color: 'bg-teal-500',
      lessons: 14,
      difficulty: 'Tous niveaux',
      progress: 0
    },
    {
      id: 'anglais',
      name: 'Anglais',
      description: 'Apprenez l\'anglais, langue internationale, avec des méthodes modernes.',
      icon: '🇬🇧',
      color: 'bg-indigo-500',
      lessons: 12,
      difficulty: 'Tous niveaux',
      progress: 0
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nos Matières
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez un monde de connaissances à travers nos 6 matières principales.
            Chaque matière est conçue pour être engageante et adaptée aux enfants.
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={`/subject/${subject.id}`}
              className="subject-card group"
            >
              {/* Subject Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-xl ${subject.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {subject.icon}
                </div>
                <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>

              {/* Subject Info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {subject.description}
                </p>

                {/* Subject Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{subject.lessons} leçons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{subject.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>

                {/* Progress Bar (for future use) */}
                {subject.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progression</span>
                      <span className="text-primary-600 font-medium">{subject.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Prêt à commencer l'aventure ?
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Choisissez une matière qui vous intéresse et commencez votre voyage d'apprentissage.
            Chaque leçon est conçue pour être amusante et éducative !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Créer un profil
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Explorer sans compte
            </button>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Apprentissage progressif
            </h3>
            <p className="text-gray-600">
              Commencez par les bases et progressez à votre rythme avec des exercices adaptés.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Récompenses et badges
            </h3>
            <p className="text-gray-600">
              Gagnez des badges et des récompenses pour chaque accomplissement réalisé.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Accessible partout
            </h3>
            <p className="text-gray-600">
              Apprenez où vous voulez, quand vous voulez, même sans connexion internet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
