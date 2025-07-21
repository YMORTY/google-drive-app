import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Container, Row, Col, Form } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { scopes: 'https://www.googleapis.com/auth/drive', access_type: 'offline' } });
  };

  const handleLoginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error.message);
    } else if (data.user) {
      // Successfully logged in, redirect to dashboard
      navigate('/dashboard');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <CardHeader className="text-center">
          <CardTitle className="h2">Log in</CardTitle>
          <p className="text-muted">
            Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
          </p>
        </CardHeader>
        <CardContent>
          <div className="d-grid gap-2">
            <Button onClick={handleLoginWithGoogle} variant="outline-secondary" className="w-100">
              Continue with Google
            </Button>
            <Button onClick={handleLoginWithGitHub} variant="outline-secondary" className="w-100">
              Continue with GitHub
            </Button>

            <div className="position-relative my-3">
              <hr className="text-muted" />
              <div className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted text-uppercase fs-6">
                Or continue with email
              </div>
            </div>

            <Form onSubmit={handleLoginWithEmail} className="d-grid gap-3">
              <Form.Group controlId="formBasicEmail">
                <Input
                  type="email"
                  placeholder="Email address or user name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="link" className="position-absolute end-0 top-50 translate-middle-y text-decoration-none">
                  Hide
                </Button>
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Check
                  type="checkbox"
                  id="remember-me"
                  label="Remember me"
                  className="text-muted"
                />
                <a href="#" className="text-decoration-none">
                  Forgot your password?
                </a>
              </div>
              <Button type="submit" className="w-100">
                Log in
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
