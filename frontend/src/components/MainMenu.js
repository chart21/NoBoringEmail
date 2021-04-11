import React from 'react';
import { withRouter } from 'react-router-dom'

import Styled from 'styled-components';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink } from 'reactstrap';
import Logo from '../img/logo_alpha.png';

import UserService from  '../services/UserService';


class PlainMainMenu extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
		};
	}

	logout() {
		UserService.logout();
		
		this.setState({
			user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
		});

		if(this.props.location.pathname !== '/') {
			this.props.history.push('/');
		} else {
			window.location.reload();
		}
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		// todo: Set Brand to logo.jpg
		var userNav = <React.Fragment>
				<NavItem>
					<NavLink href="#/login">My Account</NavLink>
				</NavItem>
			</React.Fragment>;

		if(this.state.user){
			userNav = <React.Fragment>
					<NavItem>
						<NavLink href="#/account">My Account</NavLink>
					</NavItem>
					<NavItem>
						<NavLink href="#" onClick={() => this.logout()}>Logout</NavLink>
					</NavItem>
				</React.Fragment>;
		}

		return (
			<div className={this.props.className}>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">
						<img src={Logo} height="30" alt="Company Logo of NoBoring.Email" />
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="#card/new">New Card</NavLink>
							</NavItem>
							{userNav}
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

const MainMenu = Styled(withRouter(PlainMainMenu))`
	margin-bottom: 20px;
	background-color: green;
`;

export default MainMenu;
