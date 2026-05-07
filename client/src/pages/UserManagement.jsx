import { useState, useEffect } from 'react';

import api from '../lib/api';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

import { Badge } from '../components/ui/badge';

import {
  Users,
  Mail,
  Shield,
  CalendarDays,
} from 'lucide-react';

import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get(
          '/users'
        );

        setUsers(data);
      } catch {
        toast.error(
          'Failed to fetch users'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          User Management
        </h2>

        <p className="text-muted-foreground">
          Manage and monitor team members.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-sm text-muted-foreground">
                Total Users
              </p>

              <h3 className="text-3xl font-bold mt-1">
                {users.length}
              </h3>
            </div>

            <div className="bg-primary/10 p-3 rounded-xl">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-sm text-muted-foreground">
                Admins
              </p>

              <h3 className="text-3xl font-bold mt-1">
                {
                  users.filter(
                    (u) =>
                      u.role === 'ADMIN'
                  ).length
                }
              </h3>
            </div>

            <div className="bg-red-100 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">

            <div>
              <p className="text-sm text-muted-foreground">
                Members
              </p>

              <h3 className="text-3xl font-bold mt-1">
                {
                  users.filter(
                    (u) =>
                      u.role === 'MEMBER'
                  ).length
                }
              </h3>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="shadow-sm">

        <CardHeader>
          <CardTitle className="flex items-center gap-2">

            <Users className="h-5 w-5" />

            Team Directory
          </CardTitle>
        </CardHeader>

        <CardContent>

          {users.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs">

                  <tr>
                    <th className="px-6 py-4 text-left font-medium">
                      User
                    </th>

                    <th className="px-6 py-4 text-left font-medium">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left font-medium">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left font-medium">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      {/* User */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">

                            {u.name
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>

                          <div>
                            <div className="font-medium text-slate-900">
                              {u.name}
                            </div>

                            <div className="text-xs text-muted-foreground">
                              ID: {u.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-600">

                        <div className="flex items-center gap-2">

                          <Mail className="h-4 w-4" />

                          {u.email}
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">

                        <Badge
                          variant={
                            u.role === 'ADMIN'
                              ? 'ADMIN'
                              : 'MEMBER'
                          }
                        >
                          <Shield className="mr-1 h-3 w-3" />

                          {u.role}
                        </Badge>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 text-slate-500">

                        <div className="flex items-center gap-2">

                          <CalendarDays className="h-4 w-4" />

                          {new Date(
                            u.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;

