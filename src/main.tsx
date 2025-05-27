import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App.tsx'
import History from './pages/History.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import { RoutePaths } from './routes/paths.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={RoutePaths.ROOT} element={<Home />} />
				<Route path={RoutePaths.HOME} element={<Home />} />
				<Route path={RoutePaths.LOGIN} element={<Login />} />
				<Route path={RoutePaths.REGISTER} element={<Register />} />
				<Route path={RoutePaths.APP} element={<App />} />
				<Route path={RoutePaths.HISTORY} element={<History />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
)
