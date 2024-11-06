// signup.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 400 && data.error === 'User already exists') {
        setError('User already exists. Please use a different email.');
      } else if (data.error) {
        setError('An error occurred during signup. Please try again.');
      } else {
        // Redirect to sign-in page on successful signup
        router.push('/auth/signin');
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign Up Create Admin</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="input"
            placeholder="Enter email address"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="input"
            placeholder="Enter password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="input"
            placeholder="Confirm password"
            required
          />
          <button className="login-button" type="submit">
            Sign Up
          </button>
          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
