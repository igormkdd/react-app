import { useEffect } from 'react';
import { Content } from 'carbon-components-react';
import '../styles/App.css';
import { Navbar } from '../components/Navbar';
import { HeaderLogo } from '../components/HeaderLogo';
import { Footer } from '../components/Footer';
import { RoutePaths } from '../routes/paths';

export default function Home() {

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = RoutePaths.LOGIN;
		}
	}, []);

	// useEffect(() => {
	// 	fetchData();
	// 	const interval = setInterval(fetchData, 1000); // Refresh every 5 seconds
	// 	return () => clearInterval(interval);
	// }, []);

	return (
		<div data-carbon-theme="g100">
			<HeaderLogo />

			<Navbar />

			<Content style={{ padding: '2rem' }}>
				<h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Sensors Home Page</h1>

				<p>Device: <strong>ESP32C6 Zero</strong></p>
				<p>Sensor: <strong>SHT40</strong></p>
				<hr style={{ marginBottom: '3rem' }} />
			</Content>

			<Footer />
		</div>
	);
}
