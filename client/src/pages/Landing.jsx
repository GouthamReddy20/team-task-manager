
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { Button } from '../components/ui/button';
import {
  CheckSquare,
  LayoutDashboard,
  Shield,
  ArrowRight,
  Globe,
  X,
} from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState(false);

  const [isChoiceModalOpen, setIsChoiceModalOpen] =
    useState(false);

  const [authView, setAuthView] = useState('login');

  const [isScrolled, setIsScrolled] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  const openAuth = (view) => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>

            <span
              className={`font-bold text-xl tracking-tight ${
                isScrolled
                  ? 'text-slate-900'
                  : 'text-white'
              }`}
            >
              TaskFlow
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">

            <a
              href="#features"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:text-primary'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Features
            </a>

            <a
              href="#about"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? 'text-slate-700 hover:text-primary'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              About
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => openAuth('login')}
              className={`text-sm font-medium transition-colors hidden sm:block ${
                isScrolled
                  ? 'text-slate-700 hover:text-primary'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Login
            </button>

            <Button
              onClick={() => openAuth('signup')}
              className="shadow-md"
            >
              Signup
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-900/70"></div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/60 to-slate-900/80"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            Streamline Team Collaboration &
            <span className="block text-blue-400">
              Task Management
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-slate-200 mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            Manage projects, assign tasks,
            monitor progress, and empower your
            team with a modern productivity
            platform designed for efficient
            collaboration.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">

            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all"
              onClick={() =>
                setIsChoiceModalOpen(true)
              }
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900"
              onClick={() =>
                document
                  .getElementById('features')
                  .scrollIntoView({
                    behavior: 'smooth',
                  })
              }
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-24 bg-white relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to manage
              efficiently
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              Modern tools built for productive
              teams and seamless collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Dashboard */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">

              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Smart Dashboards
              </h3>

              <p className="text-slate-600">
                Monitor team progress, KPIs,
                project timelines, and recent
                activity in one centralized
                dashboard.
              </p>
            </div>

            {/* Tasks */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">

              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckSquare className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Task Management
              </h3>

              <p className="text-slate-600">
                Create, assign, update, and track
                tasks efficiently with role-based
                workflows and status management.
              </p>
            </div>

            {/* Roles */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all group">

              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Role-Based Access
              </h3>

              <p className="text-slate-600">
                Separate admin and member access
                securely with controlled project
                and task management permissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="py-24 bg-slate-900 text-white relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Built for Modern Teams
          </h2>

          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            TaskFlow helps teams simplify
            project collaboration, task
            assignment, and workflow management
            through a clean, lightweight, and
            powerful SaaS-style platform.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5 relative z-10">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Start Managing Your Team Today
          </h2>

          <p className="text-lg text-slate-600 mb-10">
            Organize projects, improve
            collaboration, and track productivity
            with TaskFlow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Button
              size="lg"
              className="h-14 px-10 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() =>
                setIsChoiceModalOpen(true)
              }
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg bg-white"
              onClick={() => openAuth('login')}
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-primary" />

            <span className="font-bold text-xl text-slate-900">
              TaskFlow
            </span>
          </div>

          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} TaskFlow.
            All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <Globe className="h-5 w-5" />
          </div>
        </div>
      </footer>

      {/* Choice Modal */}
      {isChoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">

            {/* Close */}
            <button
              onClick={() =>
                setIsChoiceModalOpen(false)
              }
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex justify-center mb-5">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckSquare className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Welcome to TaskFlow
            </h2>

            <p className="text-slate-500 mb-6">
              Choose how you would like to
              continue
            </p>

            <div className="flex flex-col gap-4">

              <Button
                className="w-full h-11"
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  openAuth('login');
                }}
              >
                Login
              </Button>

              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => {
                  setIsChoiceModalOpen(false);
                  openAuth('signup');
                }}
              >
                Signup
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() =>
          setIsAuthModalOpen(false)
        }
        initialView={authView}
      />
    </div>
  );
};

export default Landing;