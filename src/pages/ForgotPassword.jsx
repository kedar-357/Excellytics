import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingElements from '../components/FloatingElements';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState('email'); // 'email' → 'security' → 'reset' → 'success'
  const [securityQuestion, setSecurityQuestion] = useState('');

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const handleEmailSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/check-user', { email });
      const { hasSecurityQuestion, question } = res.data;

      if (hasSecurityQuestion) {
        setSecurityQuestion(question);
        setStep('security');
      } else {
        const resetRes = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/reset-password', { email });
        toast.success(resetRes.data.message || 'If this email exists, a reset link has been sent.');
        setStep('success');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to process request.');
    }
  };

  const handleSecuritySubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/verify-answer', {
        email,
        answer: securityAnswer,
      });

      toast.success(res.data.message || 'Security answer verified!');
      setStep('reset');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Security answer incorrect.');
    }
  };

  const handlePasswordReset = async e => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const res = await axios.post('https://excel-backend-oil4.onrender.com/api/auth/reset-password', {
        emailOrUsername: email,
        securityAnswer,
        newPassword,
        confirmNewPassword,
      });

      toast.success(res.data.msg || 'Password reset successful');
      setStep('success');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Password reset failed');
    }
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setSecurityAnswer('');
    setNewPassword('');
    setConfirmNewPassword('');
    setSecurityQuestion('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <FloatingElements />

      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Excellytics</span>
              </motion.div>

              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {step === 'email' && 'Forgot Password?'}
                {step === 'security' && 'Security Question'}
                {step === 'reset' && 'Reset Password'}
                {step === 'success' && 'Check Your Email'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {step === 'email' && 'Enter your email address to verify your identity.'}
                {step === 'security' && 'Answer your security question to proceed.'}
                {step === 'reset' && 'Enter your new password below.'}
                {step === 'success' && 'Your password was reset successfully.'}
              </p>
            </div>

            {/* Step: Email */}
            {step === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="h-12"
                  />
                </div>
                <Button type="submit" className="w-full h-12">
                  Continue
                </Button>
              </form>
            )}

            {/* Step: Security Question */}
            {step === 'security' && (
              <form onSubmit={handleSecuritySubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Security Question</Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    {securityQuestion}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityAnswer">Your Answer</Label>
                  <Input
                    id="securityAnswer"
                    type="text"
                    value={securityAnswer}
                    onChange={e => setSecurityAnswer(e.target.value)}
                    required
                    placeholder="Enter your answer"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={resetForm} className="flex-1 h-12">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 h-12">
                    Verify
                  </Button>
                </div>
              </form>
            )}

            {/* Step: Reset Password */}
            {step === 'reset' && (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">Confirm Password</Label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    required
                    placeholder="Confirm new password"
                  />
                </div>

                <Button type="submit" className="w-full h-12">
                  Reset Password
                </Button>
              </form>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Your password has been successfully reset.{' '}
                  <button onClick={resetForm} className="text-green-600 hover:underline dark:text-green-400">
                    Reset another account
                  </button>
                </p>
              </div>
            )}

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <Link to="/signin" className="text-gray-600 dark:text-gray-300 hover:underline">
                ← Back to Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
