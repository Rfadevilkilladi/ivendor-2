import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { authAPI } from '@/lib/api'

export default function DemoLogin({ onLogin }) {
  const [mode, setMode] = useState('demo') // 'demo' or 'register'
  const [userType, setUserType] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const demoUsers = {
    student: {
      user_type: 'student',
      name: 'Demo Student',
      email: 'student@example.com',
      password: 'password123',
      avatar_url: null,
      total_points: 1250
    },
    admin: {
      user_type: 'admin',
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      avatar_url: null
    },
    alumni: {
      user_type: 'alumni',
      name: 'Alumni Mentor',
      email: 'alumni@example.com',
      password: 'password123',
      avatar_url: null
    },
    company: {
      user_type: 'company',
      name: 'Company Partner',
      email: 'company@example.com',
      password: 'password123',
      avatar_url: null
    }
  }

  const handleDemoLogin = async () => {
    try {
      setLoading(true)
      const demoUser = demoUsers[userType]
      
      // Try to login with demo credentials
      const response = await authAPI.login(demoUser.email, demoUser.password)
      localStorage.setItem('auth_token', response.token)
      onLogin(response.user)
      toast.success(`Logged in as ${userType}`)
    } catch (error) {
      // If demo user doesn't exist, create them first
      if (error?.error?.includes('Invalid')) {
        handleDemoRegister(userType)
      } else {
        toast.error(error?.error || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDemoRegister = async (type) => {
    try {
      setLoading(true)
      const demoUser = demoUsers[type]
      const response = await authAPI.register({
        name: demoUser.name,
        email: demoUser.email,
        password: demoUser.password,
        user_type: type
      })
      localStorage.setItem('auth_token', response.token)
      onLogin(response.user)
      toast.success(`Registered and logged in as ${type}`)
    } catch (error) {
      // If user already exists, just login
      if (error?.error?.includes('already')) {
        handleDemoLogin()
      } else {
        toast.error(error?.error || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!name || !email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.register({
        name,
        email,
        password,
        user_type: userType
      })
      localStorage.setItem('auth_token', response.token)
      onLogin(response.user)
      toast.success('Account created successfully')
    } catch (error) {
      toast.error(error?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      localStorage.setItem('auth_token', response.token)
      onLogin(response.user)
      toast.success('Login successful')
    } catch (error) {
      toast.error(error?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/40">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">I-Vender</h1>
          <p className="text-slate-500">Innovation Platform</p>
        </div>

        {mode === 'demo' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Demo User Type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="alumni">Alumni Mentor</option>
                <option value="company">Company Partner</option>
              </select>
            </div>

            <Button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
            >
              {loading ? 'Loading...' : `Sign In as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">or</span>
              </div>
            </div>

            <Button
              onClick={() => setMode('register')}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              variant="outline"
            >
              Create Account
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Demo accounts have pre-filled credentials. Create a real account to use custom credentials.
            </p>
          </div>
        ) : mode === 'register' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                User Type
              </label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni Mentor</option>
                <option value="company">Company Partner</option>
              </select>
            </div>

            <Button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </Button>

            <Button
              onClick={() => setMode('demo')}
              className="w-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              variant="outline"
            >
              Back to Demo
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
