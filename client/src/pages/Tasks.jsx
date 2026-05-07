import { useState, useEffect } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

import toast from 'react-hot-toast';

import {
  CheckSquare,
  Plus,
  Filter,
} from 'lucide-react';

const Tasks = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] =
    useState('');

  // Form state (Admin only)
  const [showForm, setShowForm] =
    useState(false);

  const [title, setTitle] = useState('');

  const [description, setDescription] =
    useState('');

  const [projectId, setProjectId] =
    useState('');

  const [assignedTo, setAssignedTo] =
    useState('');

  const [dueDate, setDueDate] =
    useState('');

  // Fetch data
  const fetchData = async () => {
    try {
      const tasksRes = await api.get('/tasks', {
        params: { status: statusFilter },
      });

      setTasks(tasksRes.data);

      // Admin-only data
      if (user?.role === 'ADMIN') {
        const projectsRes =
          await api.get('/projects');

        setProjects(projectsRes.data);

        const usersRes =
          await api.get('/users');

        const membersOnly =
          usersRes.data.filter(
            (u) => u.role === 'MEMBER'
          );

        setUsers(membersOnly);
      }
    } catch {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  // Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post('/tasks', {
        title,
        description,
        projectId,
        dueDate,
        assignedTo:
          assignedTo || null,
      });

      toast.success(
        'Task created successfully'
      );

      setShowForm(false);

      setTitle('');
      setDescription('');
      setProjectId('');
      setAssignedTo('');
      setDueDate('');

      fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to create task'
      );
    }
  };

  // Update Status
  const handleUpdateStatus = async (
    taskId,
    newStatus
  ) => {
    try {
      await api.put(
        `/tasks/${taskId}/status`,
        {
          status: newStatus,
        }
      );

      toast.success('Status updated');

      fetchData();
    } catch {
      toast.error(
        'Failed to update status'
      );
    }
  };

  // Delete Task
  const handleDeleteTask = async (
    taskId
  ) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this task?'
      )
    )
      return;

    try {
      await api.delete(`/tasks/${taskId}`);

      toast.success('Task deleted');

      fetchData();
    } catch {
      toast.error(
        'Failed to delete task'
      );
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Tasks
          </h2>

          <p className="text-muted-foreground">
            Manage and track task
            progress efficiently.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Filter */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border text-sm shadow-sm">

            <Filter className="h-4 w-4 text-muted-foreground" />

            <select
              className="bg-transparent border-none outline-none focus:ring-0"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="">
                All Statuses
              </option>

              <option value="TODO">
                To Do
              </option>

              <option value="IN_PROGRESS">
                In Progress
              </option>

              <option value="DONE">
                Done
              </option>
            </select>
          </div>

          {/* Create */}
          {user?.role === 'ADMIN' && (
            <Button
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              <Plus className="mr-2 h-4 w-4" />

              {showForm
                ? 'Cancel'
                : 'New Task'}
            </Button>
          )}
        </div>
      </div>

      {/* Create Form */}
      {showForm &&
        user?.role === 'ADMIN' && (
          <Card className="bg-white shadow-sm border">

            <CardHeader>
              <CardTitle className="text-xl">
                Create New Task
              </CardTitle>
            </CardHeader>

            <CardContent>

              <form
                onSubmit={handleCreateTask}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >

                {/* Title */}
                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Title
                  </label>

                  <Input
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                {/* Project */}
                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Project
                  </label>

                  <select
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={projectId}
                    onChange={(e) =>
                      setProjectId(
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select a project
                    </option>

                    {projects.map((p) => (
                      <option
                        key={p.id}
                        value={p.id}
                      >
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">

                  <label className="text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Due Date */}
                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Due Date
                  </label>

                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Assign Member */}
                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Assign Member
                  </label>

                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={assignedTo}
                    onChange={(e) =>
                      setAssignedTo(
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select a member
                    </option>

                    {users.map((member) => (
                      <option
                        key={member.id}
                        value={member.id}
                      >
                        {member.name} (
                        {member.email})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="md:col-span-2 w-fit"
                >
                  Create Task
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 text-center bg-white rounded-xl border border-dashed">

          <div className="rounded-full bg-primary/10 p-5 mb-5">
            <CheckSquare className="h-10 w-10 text-primary" />
          </div>

          <h3 className="text-xl font-semibold">
            No tasks found
          </h3>

          <p className="text-sm text-muted-foreground max-w-sm mt-2">
            There are no tasks matching
            your current filters or
            assignment.
          </p>
        </div>
      ) : (

        /* Tasks Grid */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {tasks.map((task) => (
            <Card
              key={task.id}
              className="flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >

              <CardHeader>

                <div className="flex justify-between items-start gap-2">

                  <CardTitle className="text-lg">
                    {task.title}
                  </CardTitle>

                  <Badge
                    variant={task.status}
                  >
                    {task.status.replace(
                      '_',
                      ' '
                    )}
                  </Badge>
                </div>

                <div className="text-xs text-primary font-medium">
                  {
                    task.project?.title
                  }
                </div>

                <div className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {task.description ||
                    'No description'}
                </div>
              </CardHeader>

              <CardContent>

                <div className="flex flex-col gap-4">

                  {/* Assigned */}
                  <div className="text-xs text-muted-foreground">
                    Assigned to:{' '}
                    {task.user
                      ? task.user.name
                      : 'Unassigned'}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 border-t pt-4 mt-2">

                    {/* Status */}
                    <select
                      className="flex-1 rounded-md border border-input bg-background px-2 py-2 text-xs"
                      value={task.status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          task.id,
                          e.target.value
                        )
                      }
                    >
                      <option value="TODO">
                        To Do
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="DONE">
                        Done
                      </option>
                    </select>

                    {/* Delete */}
                    {user?.role ===
                      'ADMIN' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDeleteTask(
                            task.id
                          )
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;