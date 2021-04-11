import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'reactstrap';

import Page from '../components/Page.js';

import UserService from '../services/UserService';
import OrderService from '../services/OrderService';


export default class AccountView extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			loading: true,
			mail: "",
			name: "",
			orders: null
		}
	}

	componentWillMount(props){
		this.setState(Object.assign({}, this.state, {loading: false}));

		UserService.getAccount().then((data) => {
			this.setState(Object.assign({}, this.state, {
				mail: data.mail,
				name: data.name,
			}));
		}).catch((e) => {
			console.error(e);
		});

		OrderService.getList().then((data) => {
			this.setState(Object.assign({}, this.state, {orders: data}));
		}).catch((e) => {
			console.error(e);
		});
	}

	render() {
		if (this.state.loading) {
			return <Page><Row><h2>Loading...</h2></Row></Page>;
		}

		return (
			<Page>
				<Row>
					<Col>
						<h2>Your data:</h2>
					</Col>
				</Row>
				<Row>
					<Col sm="6">
						<p><b>Name:</b> {this.state.name}</p>
					</Col>
					<Col sm="6">
						<p><b>E-Mail:</b> {this.state.mail}</p>
					</Col>
				</Row>
				<Row>
					<Col sm="12">
						<h2>Your postcards:</h2>
						<Table striped>
							<thead>
								<tr>
									<th>#</th>
									<th>Date</th>
									<th>Recipient</th>
								</tr>
							</thead>
							<tbody>
								{(this.state.orders !== null && this.state.orders.length > 0) ?
									this.state.orders.map(o => (
									<tr key={o._id}>
										<td>
											<Link className="btn btn-info btn-block" role="button" to={"/card/tracking/"+o._id}>Tracking</Link>
										</td>
										<td>{new Date(o.createdAt).toLocaleString()}</td>
										<td>{o.address.split('\n').shift()}</td>
									</tr>
									)) :
									<tr>
										<td colSpan="3">No orders so far.</td>
									</tr>
								}
							</tbody>
						</Table>
					</Col>
				</Row>
			</Page>
		);
	}
}
