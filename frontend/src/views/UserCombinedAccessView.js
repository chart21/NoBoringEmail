import React from 'react';
import { Row, Col } from 'reactstrap';

import Page from '../components/Page';

import UserLoginView from './UserLoginView';
import UserRegisterView from './UserRegisterView';


export default class UserCombinedAccessView extends React.Component {
	render() {
		return (
			<Page>
				<Row>
					<Col sm="6">
						<h3>Register a new account</h3>
						<UserRegisterView />
					</Col>
					<Col sm="6">
						<h3>Login with an existing account</h3>
						<UserLoginView />
					</Col>
				</Row>
			</Page>
		);
	}
}
