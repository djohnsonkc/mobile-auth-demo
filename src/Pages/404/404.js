import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.homeLink}>Go back to the homepage</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
  }
//   title: {
//     fontSize: '6rem',
//     margin: '0',
//   },
//   message: {
//     fontSize: '1.5rem',
//     margin: '20px 0',
//   },
//   homeLink: {
//     fontSize: '1.2rem',
//     color: '#007bff',
//     textDecoration: 'none',
//     marginTop: '20px',
//   }
};

export default NotFoundPage;
