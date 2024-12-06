// src/components/Auth.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure the path is correct based on your folder structure
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional: for user-friendly notifications

function Auth() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signIn({
        email,
        password,
      });

      if (error) {
        toast.error(error.message); // Display error message
      } else {
        toast.success('Login successful!');
        navigate('/'); // Redirect to HomePage after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Log In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <div>
            <Link to="/reset-password" style={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: 'url("https://worldkings.org/Userfiles/Upload/images/Aswan%202.jpg")', // Same background as HomePage
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    fontFamily: 'Arial, sans-serif',
    color: 'white',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white', // White background for the form to ensure readability
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#333', // Dark text for contrast against the white form background
  },
  input: {
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#C2B280',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E', // Greyed out when disabled
    cursor: 'not-allowed',
  },
  forgotPasswordLink: {
    color: '#C2B280',
    textDecoration: 'none',
    fontSize: '14px',
    textAlign: 'right',
    display: 'block',
  },
};

export default Auth;
