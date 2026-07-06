import fileGenieLogo from '../assets/fileGenie-logo.png';
import './Navbar.css';

export function Navbar() {
    return (
        <header className="navbar">
            <img src={fileGenieLogo} alt="fileGenie Logo" />
        </header>
    );
}