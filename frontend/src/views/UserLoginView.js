import React from 'react';
import { withRouter } from 'react-router-dom';

import UserLogin from '../components/UserLogin';

import UserService from '../services/UserService';


class UserLoginView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			//redirect back to the order screen after a successfull registration
			orderRedirect: sessionStorage.getItem('orderRedirect') === 'true'
		};
	}

	login(user) {
		UserService.login(user.mail, user.password).then((data) => {
			if(this.state.orderRedirect){
				sessionStorage.removeItem('orderRedirect')
				this.props.history.push('/card/order');
			} else {
				this.props.history.push('/account');
			}
		}).catch((e) => {
			this.setState(Object.assign({}, this.state, {error: e}));
		});
	}

	render() {
		return (
			<UserLogin onSubmit={(user) => this.login(user)} error={this.state.error}></UserLogin>
		);
	}
}

export default withRouter(UserLoginView);
