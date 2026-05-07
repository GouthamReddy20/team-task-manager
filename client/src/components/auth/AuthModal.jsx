import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

import {
  X,
  CheckSquare,
  Shield,
  User as UserIcon,
} from 'lucide-react';

export const AuthModal = ({
  isOpen,
  onClose,
  initialView = 'login',
}) => {

  // Sync login/signup view properly
  const [view, setView] =
    useState(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  const [isLoading, setIsLoading] =
    useState(false);

  // Form fields
  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('MEMBER');

  const [adminSecret, setAdminSecret] =
    useState('');

  const { login, signup } = useAuth();

  const navigate = useNavigate();

  if (!isOpen) return null;

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      let success = false;

      if (view === 'login') {
        success = await login(
          email,
          password,
          role
        );
      } else {
        success = await signup(
          name,
          email,
          password,
          role,
          adminSecret
        );
      }

      if (success) {

        // Reset form
        setName('');
        setEmail('');
        setPassword('');
        setRole('MEMBER');
        setAdminSecret('');

        onClose();

        navigate('/dashboard');
      }
    } catch {
      // handled in context
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle login/signup
  const toggleView = () => {
    setView(
      view === 'login'
        ? 'signup'
        : 'login'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">

      <div className="relative w-full max-w-md max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">

            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <CheckSquare className="h-8 w-8 text-primary" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">

              {view === 'login'
                ? 'Welcome Back'
                : 'Create Your Account'}
            </h2>

            <p className="text-sm text-slate-500 mt-2">

              {view === 'login'
                ? 'Log in to continue managing your team'
                : 'Create an account to get started'}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Name */}
            {view === 'signup' && (
              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Full Name
                </label>

                <Input
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Email
              </label>

              <Input
                required
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2">

              <label className="text-sm font-medium">
                Password
              </label>

              <Input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>

            {/* Role */}
            <div className="space-y-4 pt-2">

              <label className="text-sm font-medium">
                Role
              </label>

              <div className="grid grid-cols-2 gap-4">

                {/* Member */}
                <div
                  className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer transition-colors ${
                    role === 'MEMBER'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() =>
                    setRole('MEMBER')
                  }
                >
                  <UserIcon className="h-4 w-4" />

                  <span className="text-sm font-medium">
                    Member
                  </span>
                </div>

                {/* Admin */}
                <div
                  className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer transition-colors ${
                    role === 'ADMIN'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() =>
                    setRole('ADMIN')
                  }
                >
                  <Shield className="h-4 w-4" />

                  <span className="text-sm font-medium">
                    Admin
                  </span>
                </div>
              </div>

              {/* Admin Secret */}
              {role === 'ADMIN' &&
                view === 'signup' && (
                  <div className="space-y-2 animate-in slide-in-from-top-2">

                    <label className="text-sm font-medium text-slate-700">
                      Admin Secret Key
                    </label>

                    <Input
                      required
                      type="password"
                      placeholder="Enter admin secret key"
                      value={adminSecret}
                      onChange={(e) =>
                        setAdminSecret(
                          e.target.value
                        )
                      }
                      className="border-primary/50 focus-visible:ring-primary/20"
                    />
                  </div>
                )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-6 h-11"
              disabled={isLoading}
            >

              {isLoading
                ? view === 'login'
                  ? 'Signing in...'
                  : 'Creating account...'
                : view === 'login'
                ? 'Sign In'
                : 'Create Account'}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center text-sm text-slate-500">

            {view === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}

            <button
              type="button"
              onClick={toggleView}
              className="text-primary hover:underline font-semibold"
            >

              {view === 'login'
                ? 'Sign up'
                : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};