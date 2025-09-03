import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingElements from '../components/FloatingElements';
import { toast } from 'sonner';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.emailOrUsername) newErrors.emailOrUsername = 'Email or Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    const { emailOrUsername, password } = formData;
    try {
      const res = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/login', {
        emailOrUsername,
        password
      });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Sign in successful! Redirecting to home...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast.error(res.data.msg || 'Sign in failed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Sign in failed.');
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingElements />
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-40 dark:opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center space-x-2 mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Excellytics</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Welcome Back
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300"
              >
                Sign in to your account to continue
              </motion.p>
            </div>


            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email or Username
                </Label>
                <div className="relative">
                  <Input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    value={formData.emailOrUsername}
                    onChange={handleInputChange}
                    placeholder="Enter your email or username"
                    required
                    className={`h-12 border-2 px-2 ${errors.emailOrUsername ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                </div>
                {errors.emailOrUsername && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailOrUsername}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className={`h-12 border-2 px-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-excellytics-green-600 hover:text-excellytics-green-700 transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 text-white font-medium rounded-lg"
              >
                Sign In
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-excellytics-green-600 hover:text-excellytics-green-700 transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
