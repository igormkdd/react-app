import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/paths';

const logout = () => {
  localStorage.removeItem('token'); 
  window.location.href = RoutePaths.LOGIN;
};

export const Navbar = () => (
  <div style={{ padding: '1rem', background: '#393939', marginBottom: '1rem' }}>
    <Link to={RoutePaths.HOME} style={{ color: 'white', marginRight: '2rem' }}>Home</Link>
    <Link to={RoutePaths.APP} style={{ color: 'white', marginRight: '2rem' }}>Live</Link>
    <Link to={RoutePaths.HISTORY} style={{ color: 'white', marginRight: '2rem' }}>History</Link>
    <Link to={RoutePaths.ROOT} onClick={logout} style={{ color: 'orange', marginRight: '2rem' }}>Logout</Link>
  </div>
);
