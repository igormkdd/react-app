import { Link } from 'react-router-dom';

export const Navbar = () => (
  <div style={{ padding: '1rem', background: '#393939', marginBottom: '1rem' }}>
    <Link to="/" style={{ color: 'white', marginRight: '2rem' }}>Live</Link>
    <Link to="/history" style={{ color: 'white' }}>History</Link>
  </div>
);
