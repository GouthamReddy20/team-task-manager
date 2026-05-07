import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your account settings and profile details.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="text-2xl">{user?.name}</CardTitle>
              <CardDescription>View your profile information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium text-slate-500">
                <Mail className="mr-2 h-4 w-4" /> Email Address
              </div>
              <div className="font-medium">{user?.email}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium text-slate-500">
                <Shield className="mr-2 h-4 w-4" /> Role
              </div>
              <div>
                <Badge variant={user?.role === 'ADMIN' ? 'ADMIN' : 'MEMBER'}>
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium text-slate-500">
                <User className="mr-2 h-4 w-4" /> Account ID
              </div>
              <div className="text-sm font-medium font-mono text-slate-600 bg-slate-100 p-1.5 rounded w-fit">
                {user?.id}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm font-medium text-slate-500">
                <Calendar className="mr-2 h-4 w-4" /> Member Since
              </div>
              <div className="font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
