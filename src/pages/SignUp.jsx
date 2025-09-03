import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingElements from '../components/FloatingElements';
import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your full name.';
    if (!formData.username) newErrors.username = 'A username is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    else if (!/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) newErrors.password = 'Password must contain at least one uppercase letter and one number.';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.securityQuestion) newErrors.securityQuestion = 'A security question is required.';
    if (!formData.securityAnswer) newErrors.securityAnswer = 'A security answer is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/signup', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer
      });
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Sign up successful! Redirecting to home...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        toast.error(res.data.message || 'Sign up failed.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sign up failed.');
    }
  };


  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
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
                Create Your Account
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300"
              >
                Join us and start your analytics journey
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
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  className={`h-12 border-2 px-2 ${errors.name && (touched.name || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.name && (touched.name || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your username"
                  className={`h-12 border-2 px-2 ${errors.username && (touched.username || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.username && (touched.username || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`h-12 border-2 px-2 ${errors.email && (touched.email || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.email && (touched.email || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`h-12 border-2 px-2 ${errors.password && (touched.password || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
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
                {errors.password && (touched.password || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Confirm your password"
                    className={`h-12 border-2 px-2 ${errors.confirmPassword && (touched.confirmPassword || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (touched.confirmPassword || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityQuestion" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Security Question
                </Label>
                <Input
                  id="securityQuestion"
                  name="securityQuestion"
                  type="text"
                  value={formData.securityQuestion}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter a security question"
                  className={`h-12 border-2 px-2 ${errors.securityQuestion && (touched.securityQuestion || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.securityQuestion && (touched.securityQuestion || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.securityQuestion}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="securityAnswer" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Security Answer
                </Label>
                <Input
                  id="securityAnswer"
                  name="securityAnswer"
                  type="text"
                  value={formData.securityAnswer}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter your security answer"
                  className={`h-12 border-2 px-2 ${errors.securityAnswer && (touched.securityAnswer || Object.keys(errors).length > 0) ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.securityAnswer && (touched.securityAnswer || Object.keys(errors).length > 0) && (
                  <p className="text-red-500 text-xs mt-1">{errors.securityAnswer}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 text-white font-medium rounded-lg"
              >
                Sign Up
              </Button>
            </motion.form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/signin"
                  className="text-excellytics-green-600 hover:text-excellytics-green-700 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
