import fileGenieLogo from '../assets/fileGenie-logo.png';
import './Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <img src={fileGenieLogo} alt="fileGenie Logo" />
            <p className="privacy">We don't save your uploaded files permanently. All the files are deleted within 24 hours from our server.</p>
            <hr />
            <p className="copyright">&copy; FileGenie 2026</p>
            <p className="rightsReserved">All Rights Reserved.</p>
        </footer>
    );
}