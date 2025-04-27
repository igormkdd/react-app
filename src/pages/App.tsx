import { useEffect, useState } from 'react';
import { Content, Tile, Grid, Row, Column } from 'carbon-components-react';
import '../styles/App.css';
import { formatTimestamp } from '../helpers/utils';
import { SensorData } from '../types/SensorData';
import { Navbar } from '../components/Navbar';
import { HeaderLogo } from '../components/HeaderLogo';
import { Footer } from '../components/Footer';
import { fetchSensors } from '../api/sensors';

export default function App() {

	const [rawData, setSensors] = useState<Array<SensorData>>([]);
	const data = rawData[0];

	const token = localStorage.getItem("token");
	console.log("TOKEN: " + token);

	useEffect(() => {
		fetchSensors().then(setSensors);
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
				<h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Live Data</h1>

				<p>Device: <strong>ESP32C6 Zero</strong></p>
				<p>Sensor: <strong>SHT40</strong></p>
				<hr style={{ marginBottom: '3rem' }} />

				<Grid>
					<Row className='sensor-row'>
						<Column sm={6} md={6} lg={6}>
							<Tile className="sensor-tile" style={{ width: '100%' }}>
								<h3>Living Room</h3>
								<p><strong>Timestamp:</strong> {formatTimestamp(data?.timestamp)}</p>
								<p><strong>Temperature:</strong> {data?.temperature} °C</p>
								<p><strong>Humidity:</strong> {data?.humidity} %</p>
							</Tile>
						</Column>
						<Column sm={6} md={6} lg={6}>
							<Tile className="sensor-tile" style={{ width: '100%' }}>
								<h3>Bed Room</h3>
								<p><strong>Timestamp:</strong> {formatTimestamp(data?.timestamp)}</p>
								<p><strong>Temperature:</strong> {data?.temperature} °C</p>
								<p><strong>Humidity:</strong> {data?.humidity} %</p>
							</Tile>
						</Column>
					</Row>
				</Grid>
			</Content>

			<Footer />
		</div>
	);
}
