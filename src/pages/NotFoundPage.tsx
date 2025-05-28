import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/paths';

const NotFoundPage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '6rem' }}>
            <h1>404 - Page Not Found</h1>
            <br />
            <p>The page does not exist</p>
            <Link to={RoutePaths.HOME}>Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;
