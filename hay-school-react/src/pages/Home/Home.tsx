import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Trophy,
  Star,
  Play,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: '6 Matières',
      description: 'Mathématiques, Français, Sciences, Histoire, Géographie, Anglais',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Pour les enfants',
      description: 'Conçu spécialement pour les enfants de 6 à 12 ans',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Trophy,
      title: 'Jeux éducatifs',
      description: 'Apprendre en s\'amusant avec des jeux interactifs',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Star,
      title: 'Suivi des progrès',
      description: 'Visualisez vos avancées et gagnez des récompenses',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const subjects = [
    {
      id: 'math',
      name: 'Mathématiques',
      description: 'Nombres, calculs et géométrie',
      icon: '🔢',
      color: 'bg-blue-500'
    },
    {
      id: 'francais',
      name: 'Français',
      description: 'Lecture, écriture et grammaire',
      icon: '📚',
      color: 'bg-red-500'
    },
    {
      id: 'sciences',
      name: 'Sciences',
      description: 'Nature, physique et biologie',
      icon: '🔬',
      color: 'bg-green-500'
    },
    {
      id: 'histoire',
      name: 'Histoire',
      description: 'Passé et événements importants',
      icon: '🏛️',
      color: 'bg-amber-500'
    },
    {
      id: 'geographie',
      name: 'Géographie',
      description: 'Monde, continents et pays',
      icon: '🌍',
      color: 'bg-teal-500'
    },
    {
      id: 'anglais',
      name: 'Anglais',
      description: 'Langue internationale',
      icon: '🇬🇧',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 p-4 rounded-full">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue sur <span className="text-yellow-300">Hay School</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              La plateforme d'éducation interactive pour les enfants de Madagascar.
              Apprenez en français avec des cours adaptés à votre âge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/categories"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Commencer l'aventure
                <Play className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Hay School ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche moderne de l'éducation conçue pour les enfants malgaches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.bgColor} mb-4`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subjects Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Découvrez nos matières
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explorez un monde de connaissances à travers 6 matières passionnantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className="subject-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center text-2xl`}>
                    {subject.icon}
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {subject.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {subject.description}
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  <span>Explorer</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/categories"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Voir toutes les matières
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer votre aventure d'apprentissage ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Rejoignez des milliers d'enfants qui apprennent avec plaisir sur Hay School
          </p>
          <Link
            to="/categories"
            className="bg-white text-primary-600 hover:bg-gray-50 font-bold text-lg px-8 py-4 rounded-lg inline-flex items-center transition-colors duration-200"
          >
            Commencer maintenant
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
