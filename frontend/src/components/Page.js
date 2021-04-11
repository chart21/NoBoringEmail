import React from 'react';
import { Container } from 'reactstrap';

import LoadingCurtain from './LoadingCurtain.js';
import MainMenu from './MainMenu.js';


export default class Page extends React.Component {
	render() {
		return (
			<div>
				<LoadingCurtain />
				<MainMenu />
				<Container>
					{this.props.children}
				</Container>
			</div>
		);
	}
}
