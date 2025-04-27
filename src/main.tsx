import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import History from './pages/History.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/app" element={<App />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
