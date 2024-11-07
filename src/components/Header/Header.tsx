import React from "react";
import FinancialStats from './FinancialStats';

import './Header.css';

export default function Header() {
    return (
        <header>
            <nav aria-label="User navigation" className="user-container">
                <ul className="menu">
                    <li>
                        <a href="#profile">Profile</a> {/* Dispay username + add profile possibility */}
                    </li>
                    <li>
                        <a href="#settings">Settings</a> {/* Navigate to settings (select currency, change password etc.) */}
                    </li>
                    <li>
                        <a href="#help">Help</a> {/* Sent email to us */}
                    </li>
                    <li>
                        <a href="#login">Log In</a>
                    </li>
                </ul>
            </nav>
            <nav aria-label="Financial information" className="financial-container">
                <FinancialStats />
            </nav>
        </header>
    )
}