import React from 'react';
import { withRouter } from 'react-router-dom';

import UserRegister from '../components/UserRegister';

import UserService from '../services/UserService';


class UserLoginView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			//redirect back to the order screen after a successfull registration
			orderRedirect: sessionStorage.getItem('orderRedirect') === 'true'
		};
	}

	register(user) {
		UserService.register(user.mail, user.password, user.name).then((data) => {
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
			<UserRegister onSubmit={(user) => this.register(user)} error={this.state.error}></UserRegister>
		);
	}
}

export default withRouter(UserLoginView);
