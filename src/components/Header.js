import React from 'react';
import {NavLink} from 'react-router-dom';

import './Header.css';

const Header = props =>
	<header className="header">
		<h2>GIF</h2>
		<nav>
			<ul>
				<li>
					<NavLink to="/search">Search</NavLink>
				</li>
				<li>
					<NavLink to="/random">Random</NavLink>
				</li>
			</ul>
		</nav>
	</header>;

export default Header;
