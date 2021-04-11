import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';


class UserLogin extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mail : '',
			password : ''
		};

		this.handleChangeMail = this.handleChangeMail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeMail(value) {
		value = value.target.value;
		this.setState(Object.assign({}, this.state, {mail: value}));
	}

	handleChangePassword(value) {
		value = value.target.value;
		this.setState(Object.assign({}, this.state, {password: value}));
	}

	handleSubmit(event) {
		event.preventDefault();

		let user = {
			mail: this.state.mail,
			password: this.state.password
		};

		this.props.onSubmit(user);
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label for="UserEmail">E-Mail Address</Label>
					<Input
						id="UserEmail"
						type="email"
						required={true}
						value={this.state.mail}
						onChange={this.handleChangeMail}
						/>
					<FormText>Please login using the mail address used to register with our service.</FormText>
				</FormGroup>
				<FormGroup>
					<Label for="UserPassword">Password</Label>
					<Input 
						id="UserPassword"
						type="password"
						required={true}
						value={this.state.password}
						onChange={this.handleChangePassword}
						/>
				</FormGroup>
				<Button
					id="submit"
					type="submit"
					disabled={this.state.mail === undefined || this.state.mail === '' || this.state.password === undefined || this.state.password === '' ? true : false}
				>Login</Button>
				{this.props.error ? <Alert color="danger">{this.props.error}</Alert> : ''}
			</Form>
		);
	}
};

export default withRouter(UserLogin);
