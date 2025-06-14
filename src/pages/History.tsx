import { useEffect, useState } from 'react';
import '../styles/App.css';
import { Navbar } from '../components/Navbar';
import { HeaderLogo } from '../components/HeaderLogo';
import { Table, TableBody, TableCell, TableRow, ToastNotification } from 'carbon-components-react';
import { SensorData } from '../types/SensorData';
import { Footer } from '../components/Footer';
import { fetchSensors } from '../api/sensors';
import { formatTimestamp } from '../helpers/utils';

function History() {
	const [data, setSensors] = useState<Array<SensorData>>([]);
	const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	// const token = localStorage.getItem("token");
	// 	fetchSensors().then(setSensors);
	// 	const interval = setInterval(fetchSensors, 5000); // Refresh every 5 seconds
	// 	return () => clearInterval(interval);
	// 	// if (token) {
	// 	// }
	// }, []);

	useEffect(() => {
		fetchSensors()
			.then(setSensors)
			.catch((err) => {
				console.error('Error: ', err.message);
				setError(err.message);
			});;;
	}, []);

	return (
		<div data-carbon-theme="g100">
			{error && (
				<ToastNotification
					kind="error"
					title="Backend Error"
					subtitle={error}
					caption=""
					onCloseButtonClick={() => setError(null)}
					lowContrast={true}
					timeout={0}
				/>
			)}

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
