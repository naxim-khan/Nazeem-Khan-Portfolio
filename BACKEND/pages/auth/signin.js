'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // clear previous error
    try {
      // Attempt to sign in using the credentials provider
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      });

      if (!result.error) {
        // Successful sign-in
        router.push('/');
      } else {
        // Handle sign-in error
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Sign-in failed. Please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            className="input" 
            placeholder="Enter email" 
            required 
            aria-label="Email" 
          />
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            className="input" 
            placeholder="Enter password" 
            required 
            aria-label="Password" 
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
