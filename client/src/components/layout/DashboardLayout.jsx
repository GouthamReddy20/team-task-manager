import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  User,
  LogOut,
  Menu,
} from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },

    {
      name: 'Projects',
      path: '/dashboard/projects',
      icon: FolderKanban,
    },

    {
      name: 'Tasks',
      path: '/dashboard/tasks',
      icon: CheckSquare,
    },
  ];

  if (user?.role === 'ADMIN') {
    navItems.push({
      name: 'User Management',
      path: '/dashboard/users',
      icon: Users,
    });
  }

  navItems.push({
    name: 'Profile',
    path: '/dashboard/profile',
    icon: User,
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r shadow-sm">

        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">

          <div className="flex items-center gap-3">

            <div className="bg-primary p-2 rounded-lg">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                TaskFlow
              </h1>

              <p className="text-xs text-slate-500">
                Team Management
              </p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-5 py-5 border-b">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                navigate('/dashboard/profile')
              }
              className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg hover:bg-primary/20 transition"
            >
              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}
            </button>

            <div>
              <h3 className="font-semibold text-slate-900">
                {user?.name}
              </h3>

              <Badge
                variant={
                  user?.role === 'ADMIN'
                    ? 'ADMIN'
                    : 'MEMBER'
                }
              >
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

          {navItems.map((item) => (
           <NavLink
  key={item.name}
  to={item.path}
  end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />

              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t p-4">

          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />

            Logout
          </Button>
        </div>
      </aside>

      {/* Main Layout */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shadow-sm">

          <div className="flex items-center gap-4">

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() =>
                setIsSidebarOpen(
                  !isSidebarOpen
                )
              }
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Welcome back,
                <span className="text-primary ml-1">
                  {user?.name}
                </span>
              </h2>

              <p className="text-sm text-slate-500">
                Manage your workflow efficiently
              </p>
            </div>
          </div>

          {/* Avatar */}
          <button
            onClick={() =>
              navigate('/dashboard/profile')
            }
            className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold hover:bg-primary/20 transition"
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </button>
        </header>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">

            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() =>
                setIsSidebarOpen(false)
              }
            />

            {/* Sidebar */}
            <aside className="relative w-72 bg-white flex flex-col shadow-xl">

              {/* Header */}
              <div className="flex h-16 items-center border-b px-5">

                <div className="flex items-center gap-3">

                  <div className="bg-primary p-2 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-white" />
                  </div>

                  <h1 className="text-xl font-bold text-slate-900">
                    TaskFlow
                  </h1>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-4 space-y-2">

                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() =>
                      setIsSidebarOpen(false)
                    }
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />

                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Logout */}
              <div className="border-t p-4">

                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />

                  Logout
                </Button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

