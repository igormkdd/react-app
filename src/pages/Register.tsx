import { useState } from "react";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import '../styles/App.css';
import { HeaderLogo } from "../components/HeaderLogo";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await register(email, password);
        if (result.message) {
            alert("User created. Please login.");
            navigate("/login");
        } else {
            alert(result.error || "Registration failed");
        }
    };

    return (
        <div data-carbon-theme="g100">
            <HeaderLogo />

            <h2>Register</h2><br />
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
                <button type="submit">Register</button>
            </form>

            <br /><br />
            <p>Already have an account. Login <Link to="/login">here.</Link></p>
        </div>
    );
}
