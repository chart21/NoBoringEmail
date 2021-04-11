import React from 'react';
import { Jumbotron } from 'reactstrap';

import Page from '../components/Page.js';

export default class DummyView extends React.Component {
	render() {
		return (
			<Page>
				<Jumbotron>
					<h1 className="display-3">Hello, Dummy!</h1>
					<p className="lead">I'm just a dummy page to represent future content!</p>
				</Jumbotron>
			</Page>
		);
	}
}
