import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap';

import Page from '../components/Page.js';


export default class LandingpageView extends React.Component {
	render() {
		return (
			<Page>
				<Row>
					<Col sm="6">
						<p>Welcome to NoBoring.Email!</p>
					</Col>
					<Col sm="6">
						<Link
							className="btn btn-info btn-block"
							role="button"
							to="/card/new">Create a new Card!</Link>
					</Col>
				</Row>
			</Page>
		);
	}
}
