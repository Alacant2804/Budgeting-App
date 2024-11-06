import React, { useState } from "react";

export default function Header() {
    const [netWorth, setNetWorth] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [plannedExpenses, setPlannedExpenses] = useState(0);
    const [income, setIncome] = useState(0);
    const [username, setUsername] = useState('');

    return (
        <header>
            <nav aria-label="User navigation" className="user-container">
                <ul className="menu">
                    <li>
                        <a href="#profile">{username || "Profile"}</a> {/* Dispay username + add profile possibility */}
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
                <ul className="financial-information">
                    <li>
                        <a href="#net-worth" aria-label={`Net Worth, $${netWorth}`}>Net Worth</a>
                        <span>${netWorth}</span>
                    </li>
                    <li>
                        <a href="#expenses" aria-label={`Expenses amount, $${expenses}`}>Expenses</a>
                        <span>${expenses}</span>
                    </li>
                    <li>
                        <a href="#planned-expenses" aria-label={`Planned Expenses amount, $${plannedExpenses}`}>Planned</a>
                        <span>${plannedExpenses}</span>
                    </li>
                    <li>
                        <a href="#income" aria-label={`Income amount, $${income}`}>Income</a>
                        <span>${income}</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}