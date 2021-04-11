import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';


class UserLogin extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			mail: '',
			password : '',
			name: ''
		};

		this.handleChangeMail = this.handleChangeMail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);

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

	handleChangeName(value) {
		value = value.target.value;
		this.setState(Object.assign({}, this.state, {name: value}));
	}

	handleSubmit(event) {
		event.preventDefault();

		let user = {
			mail: this.state.mail,
			password: this.state.password,
			name: this.state.name
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
					<FormText>Please chose a valid E-Mail address as we will send your recipts there.</FormText>
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
				<FormGroup>
					<Label for="UserName">Your Name</Label>
					<Input
						id="UserName"
						type="ext"
						required={true}
						value={this.state.name}
						onChange={this.handleChangeName}
						/>
				</FormGroup>
				<FormText>This name will be appear as 'sender' on your cards.</FormText>
				<Button
					id="submit"
					type="submit"
					disabled={this.state.mail === undefined || this.state.mail === '' || this.state.password === undefined || this.state.password === '' || this.state.name === undefined || this.state.name === '' ? true : false}
				>Register</Button>
				{this.props.error ? <Alert color="danger">{this.props.error}</Alert> : ''}
			</Form>
		);
	}
};

export default withRouter(UserLogin);
