import { useEffect, useState } from 'react';
import '../styles/App.css';
import { Navbar } from '../components/Navbar';
import { HeaderLogo } from '../components/HeaderLogo';
import { Table, TableBody, TableCell, TableRow } from 'carbon-components-react';
import { SensorData } from '../types/SensorData';
import { Footer } from '../components/Footer';
import { fetchSensors } from '../api/sensors';
import { formatTimestamp } from '../helpers/utils';
import { RoutePaths } from '../routes/paths';

function History() {
	const [data, setSensors] = useState<Array<SensorData>>([]);

	// useEffect(() => {
	// 	// const token = localStorage.getItem("token");
	// 	fetchSensors().then(setSensors);
	// 	const interval = setInterval(fetchSensors, 5000); // Refresh every 5 seconds
	// 	return () => clearInterval(interval);
	// 	// if (token) {
	// 	// }
	// }, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = RoutePaths.LOGIN;
		}
		fetchSensors().then(setSensors);
	}, []);

	return (
		<div data-carbon-theme="g100">
			<HeaderLogo />

			<Navbar />

			<div>
				<p>Last 100 results:</p>
				<Table>
					<TableBody>
						<TableRow key={Math.random()}>
							<TableCell><strong>Timestamp</strong></TableCell>
							<TableCell><strong>Temperature</strong></TableCell>
							<TableCell><strong>Humidity</strong></TableCell>
						</TableRow>
						{
							data.map(record => (
								<TableRow key={Math.random()}>
									<TableCell>{formatTimestamp(record["timestamp"])}</TableCell>
									<TableCell>{record["temperature"]}°C</TableCell>
									<TableCell>{record["humidity"]}%</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</div>

			<Footer />
		</div>
	);
}

export default History;
