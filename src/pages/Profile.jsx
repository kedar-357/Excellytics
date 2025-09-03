import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', username: '', email: '' });
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://excel-backend-oil4.onrender.com/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
        setForm({ username: data.username, email: data.email });
      } catch (err) {
        toast.error('Failed to load profile');
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://excel-backend-oil4.onrender.com/api/projects', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        // ignore
      }
    };
    fetchProfile();
    fetchProjects();
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://excel-backend-oil4.onrender.com/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const data = await res.json();
      setProfile(data.user);
      setEdit(false);
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl mb-6 flex items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium px-3 py-2 rounded-lg hover:bg-green-50 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
      </div>
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <Label>Name</Label>
            <Input value={profile.name} disabled className="bg-gray-100 dark:bg-gray-700 pl-3" />
          </div>
          <div>
            <Label>Username</Label>
            <Input name="username" value={form.username} onChange={handleChange} disabled={!edit} required className={`pl-3 ${edit ? '' : 'bg-gray-100 dark:bg-gray-700'}`} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" value={form.email} onChange={handleChange} disabled={!edit} required className={`pl-3 ${edit ? '' : 'bg-gray-100 dark:bg-gray-700'}`} />
          </div>
          <div className="flex gap-3 justify-end">
            {!edit ? (
              <Button type="button" onClick={() => setEdit(true)} className="bg-green-600 text-white">Edit</Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setEdit(false); setForm({ username: profile.username, email: profile.email }); }}>Cancel</Button>
                <Button type="submit" className="bg-green-600 text-white">Save</Button>
              </>
            )}
          </div>
        </form>
      </div>
      <div className="w-full max-w-xl mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Content Overview</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-green-700 dark:text-green-300">{projects.length}</span>
            <span className="text-gray-700 dark:text-gray-300 mt-2">Projects</span>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-blue-700 dark:text-blue-300">{projects.filter(p => p.chartType).length}</span>
            <span className="text-gray-700 dark:text-gray-300 mt-2">Charts Created</span>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Recent Projects</h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {projects.slice(0, 5).map(p => (
              <li key={p._id || p.id} className="py-2 flex flex-col">
                <span className="font-medium text-gray-900 dark:text-white">{p.projectName || p.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{p.chartType} • {p.originalFileName}</span>
              </li>
            ))}
            {projects.length === 0 && <li className="text-gray-500">No projects yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile; 