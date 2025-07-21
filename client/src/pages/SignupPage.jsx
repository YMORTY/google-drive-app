import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setMessage('Sign up successful! Please check your email for a confirmation link.');
        // Optionally, redirect after a short delay
        // setTimeout(() => navigate('/'), 3000);
      } else {
        // This case might happen if email confirmation is off and user is immediately logged in
        setMessage('Sign up successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <CardHeader className="text-center">
          <CardTitle className="h2">Sign Up</CardTitle>
          <p className="text-muted">
            Already have an account? <Link to="/" className="text-decoration-none">Log in</Link>
          </p>
        </CardHeader>
        <CardContent>
          <div className="d-grid gap-2">
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <Form onSubmit={handleSignUp} className="d-grid gap-3">
              <Form.Group controlId="formBasicFullName">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
