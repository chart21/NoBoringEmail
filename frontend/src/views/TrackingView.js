import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import nl2br from 'react-nl2br';

import Page from '../components/Page.js';

import state01 from '../img/tracking/state_01.png'
import state02 from '../img/tracking/state_02.png'
import state03 from '../img/tracking/state_03.png'
import arrow from '../img/tracking/arrow.png'

import OrderService from '../services/OrderService';
import TrackingService from '../services/TrackingService';


export default class TrackingView extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			loading: true,
			order: null,
			tracking: null
		}
	}

	componentWillMount(props){
		const id = this.props.match.params.id;

		TrackingService.getByOrder(id).then((data) => {
			this.setState(Object.assign({}, this.state, {tracking: data}));
		}).catch((e) => {
			console.error(e);
		});

		OrderService.get(id).then((data) => {
			this.setState(Object.assign({}, this.state, {order: data}));
		}).catch((e) => {
			console.error(e);
		});

		this.setState(Object.assign({}, this.state, {loading: false}));
	}

	hasState(state){
		if(this.state.tracking === null || this.state.tracking.length === 0){
			return false;
		}

		return this.state.tracking.some((v) => {
			return state === v.status;
		})
	}

	render() {
		if (this.state.loading || this.state.order === null) {
			return <Page><Row><h2>Loading...</h2></Row></Page>;
		}

		return (
			<Page>
				<Row>
					<Col>
						<h2>Your order:</h2>
					</Col>
				</Row>
				<Row>
					<Col sm="6">
						<p><b>ID:</b> {this.state.order._id}</p>
					</Col>
					<Col sm="6">
						<p><b>Address:<br/></b> {nl2br(this.state.order.address)}</p>
					</Col>
				</Row>
				<Row>
					<Col sm="12"><h2>Tracking:</h2></Col>
					<Col sm="12" className="tracking-icon-row">
						<img src={state01} alt="" className={'tracking-icon ' + (this.hasState('Queued') ? 'done':'')} />
						<img src={arrow} alt="" className="tracking-arrow" />
						<img src={state02} alt="" className={'tracking-icon ' + (this.hasState('Printery assigned') ? 'done':'')} />
						<img src={arrow} alt="" className="tracking-arrow" />
						<img src={state03} alt="" className={'tracking-icon ' + (this.hasState('Delivered') ? 'done':'')} />
					</Col>
				</Row>
				<Row>
					<Col sm="12">
						<Table striped>
							<thead>
								<tr>
									<th>Date</th>
									<th>Status</th>
									<th>Info</th>
								</tr>
							</thead>
							<tbody>
								{(this.state.tracking !== null && this.state.tracking.length > 0) ?
									this.state.tracking.map(t => (
									<tr key={t._id}>
										<td>{new Date(t.date).toLocaleString()}</td>
										<td>{t.status}</td>
										<td>{t.info}</td>
									</tr>
									)) :
									<tr>
										<td colSpan="3">Your order is queued.</td>
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
