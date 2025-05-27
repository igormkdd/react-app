import { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import '../styles/App.css';
import { HeaderLogo } from "../components/HeaderLogo";
import { Footer } from "../components/Footer";
import { RoutePaths } from "../routes/paths";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.token) {
            localStorage.setItem("token", result.token);
            navigate(RoutePaths.APP);
        } else {
            alert(result.error || "Login failed");
        }
    };

    return (
        <div data-carbon-theme="g100">
            <HeaderLogo />

            <h2>Login</h2><br />
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button type="submit">Login</button>
            </form>

            <br /><br />
            <p>New to the platform. Register <Link to={RoutePaths.REGISTER}>here.</Link></p>

            <Footer />
        </div>
    );
}
