import { useEffect, useState } from 'react';
import { Content, Loading, Tile, Grid, Row, Column } from 'carbon-components-react';
import '../styles/App.css';
import { formatTimestamp } from '../helpers/utils';
import { SensorData } from '../types/SensorData';
import { Navbar } from '../components/Navbar';
import { HeaderLogo } from '../components/HeaderLogo';

// env variables
const URL = import.meta.env.VITE_INFLUXDB_URL;
const TOKEN = import.meta.env.VITE_INFLUXDB_TOKEN;
const ORG_ID = import.meta.env.VITE_INFLUXDB_ORG_ID;

export default function App() {
	const [data, setData] = useState<SensorData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			// todo: Export query to a separate DB file
			const fluxQuery = `
				from(bucket: "IotSensorMeasurements")
				|> range(start: -10m)
				|> filter(fn: (r) => r._measurement == "TempAndHum")
				|> filter(fn: (r) => r._field == "SHT40-temp" or r._field == "SHT40-hum")
				|> last()
			`;

			const response = await fetch(`${URL}/api/v2/query?org=${ORG_ID}`, {
				method: "POST",
				headers: {
					"Authorization": `Token ${TOKEN}`,
					"Content-Type": "application/vnd.flux",
					"Accept": "application/csv",
				},
				body: fluxQuery,
			});

			const text = await response.text();
			console.log(`Response: ${text}`);

			// Extract values from CSV (simple parser)
			const lines = text.trim().split('\n');
			const dataRows = lines.slice(1); // Skip header

			// todo: temporary solution
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const values: Record<string, any> = {};

			for (const row of dataRows) {
				const cols = row.split(',');
				const timestamp = cols[5]; // Adjust based on CSV format
				const formattedTimestamp = formatTimestamp(timestamp);
				values["timestamp"] = formattedTimestamp;

				const field = cols[8]; // Field name
				const value = parseFloat(cols[6]); // Value
				values[field] = value;
			}

			setData({
				timestamp: values["timestamp"],
				temperature: values["SHT40-temp"],
				humidity: values['SHT40-hum'],
			});

			setError(null);

		} catch (error) {
			console.error(error);
			setError("Failed to fetch data from InfluxDB: " + error); // todo: hide error details in PROD

		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, 1000); // Refresh every 5 seconds
		return () => clearInterval(interval);
	}, []);

	return (
		<div data-carbon-theme="g100">
			<HeaderLogo />

			<Navbar />

			<Content style={{ padding: '2rem' }}>
				<h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Live Data</h1>

				<p>Device: <strong>ESP32C6 Zero</strong></p>
				<p>Sensor: <strong>SHT40</strong></p>
				<hr style={{ marginBottom: '3rem' }} />

				{loading ? (
					<Loading withOverlay={false} />
				) : error ? (
					<Tile>
						<h3 style={{ color: 'red' }}>{error}</h3>
					</Tile>
				) : data ? (
					<Grid>
						<Row className='sensor-row'>
							<Column sm={6} md={6} lg={6}>
								<Tile className="sensor-tile" style={{ width: '100%' }}>
									<h3>Living Room</h3>
									<p><strong>Timestamp:</strong> {data.timestamp}</p>
									<p><strong>Temperature:</strong> {data.temperature} °C</p>
									<p><strong>Humidity:</strong> {data.humidity} %</p>
								</Tile>
							</Column>
							<Column sm={6} md={6} lg={6}>
								<Tile className="sensor-tile" style={{ width: '100%' }}>
									<h3>Bed Room</h3>
									<p><strong>Timestamp:</strong> {data.timestamp}</p>
									<p><strong>Temperature:</strong> {data.temperature} °C</p>
									<p><strong>Humidity:</strong> {data.humidity} %</p>
								</Tile>
							</Column>
						</Row>
					</Grid>
				) : null}
			</Content>
		</div>
	);
}
