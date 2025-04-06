import { useEffect, useState } from 'react';
import './App.css';
import { formatTimestamp } from './helpers/utils';
import { Navbar } from './components/Navbar';
import { HeaderLogo } from './components/HeaderLogo';
import { Table, TableBody, TableCell, TableRow } from 'carbon-components-react';
import { SensorData } from './types/SensorData';

// env variables
const URL = import.meta.env.VITE_INFLUXDB_URL;
const TOKEN = import.meta.env.VITE_INFLUXDB_TOKEN;
const ORG_ID = import.meta.env.VITE_INFLUXDB_ORG_ID;

function History() {
	const [data, setData] = useState<Array<SensorData>>([]);
	const [, setError] = useState<string | null>(null);
	const [, setLoading] = useState(true);

	const fetchData = async () => {
		try {
			// todo: Export query to a separate DB file
			const fluxQuery = `
			 from(bucket: "IotSensorMeasurements")
				|> range(start: -24h)
				|> filter(fn: (r) => r._measurement == "TempAndHum")
				|> filter(fn: (r) => r._field == "SHT40-temp" or r._field == "SHT40-hum")
				|> pivot(rowKey:["_time"], columnKey:["_field"], valueColumn: "_value")
				|> limit(n: 100)
				|> sort(columns: ["_time"], desc: true) // Optional: sort by time
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
			// console.log(`Response: ${text}`);

			// Extract values from CSV (simple parser)
			const lines = text.trim().split('\n');
			const dataRows = lines.slice(1); // Skip header

			const result: SensorData[] = [];

			for (const row of dataRows) {
				const cols = row.split(',');

				const timestamp = cols[5];
				const formattedTimestamp = formatTimestamp(timestamp);
				const temperature = cols[10];
				const humidity = cols[9];

				const record: SensorData = {
					timestamp: formattedTimestamp,
					temperature: Number(temperature),
					humidity: Number(humidity),
				}

				result.push(record);
			}

			setData(
				result
			);

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
		const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
		return () => clearInterval(interval);
	}, []);

	// todo: improve this
	return (
		<div data-carbon-theme="g100">
			<HeaderLogo />

			<Navbar />

			<div>
				<p>Last 100 results:</p>
				<Table>
					<TableBody>
						<TableRow key={Math.random()}>
							<TableCell>Timestamp</TableCell>
							<TableCell>Temperature</TableCell>
							<TableCell>Humidity</TableCell>
						</TableRow>
						{
							data.map(record => (
								<TableRow key={Math.random()}>
									<TableCell>{record["timestamp"]}</TableCell>
									<TableCell>{record["temperature"]}°C</TableCell>
									<TableCell>{record["humidity"]}%</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export default History;
