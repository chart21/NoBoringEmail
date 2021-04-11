import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'reactstrap';

import UserService from  '../services/UserService';

import Page from '../components/Page.js';
import CardFrontPreview from '../components/CardFrontPreview.js';
import CardBackPreview from '../components/CardBackPreview.js';

import OrderService from '../services/OrderService';


export default class CardOrderView extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			loading: false,
			backButton: localStorage.getItem('postcard.imageSource'),
			image: localStorage.getItem('postcard.image'),
			text: localStorage.getItem('postcard.text'),
			font: localStorage.getItem('postcard.options.font'),
			size: localStorage.getItem('postcard.options.size'),
			color: localStorage.getItem('postcard.options.color'),
			address: localStorage.getItem('postcard.address'),
			order: null,
		};

		this.placeOrder = this.placeOrder.bind(this);
	}

	placeOrder() {
		this.setState(Object.assign({}, this.state, {loading: true}));

		const options = {
			font: this.state.font,
			size: this.state.size,
			color: this.state.color,
		};

		OrderService.create(this.state.image, this.state.text, options, this.state.address).then((data) => {
			this.setState(Object.assign({}, this.state, {order: data, loading: false}));

			localStorage.removeItem('postcard.image');
			localStorage.removeItem('postcard.imageSource');
			localStorage.removeItem('postcard.imageURL');
			localStorage.removeItem('postcard.text');
			localStorage.removeItem('postcard.options.font');
			localStorage.removeItem('postcard.options.size');
			localStorage.removeItem('postcard.options.color');
			localStorage.removeItem('postcard.address');
		}).catch((e) => {
			alert("Oh no, we couldn't find the address on the map! Please go back and supply another address.")
			this.setState(Object.assign({}, this.state, {loading: false}));
			console.error(e);
		});
	}

	componentDidMount(){
	}

	render() {
		if(!UserService.isAuthenticated()){
			sessionStorage.setItem('orderRedirect', 'true');
			return <Redirect to="/login" />
		}

		if(this.state.loading){
			return (
				<Page>
					<Row><h3 style={{textAlign: "center"}}>Loading</h3></Row>
				</Page>
				);
		}

		if(this.state.order){
			return (
				<Page>
					<Row>
						<Col md="6" className="offset-md-3">
							<Alert color="success">
								<h4 className="alert-heading">Thank you for your order!</h4>
								<p>Your order has been placed and we'll do our best to fulfill it.</p>
								<p>You will receive an email with another confirmation as well as a tracking link to see what your order is doing, but you can also just bookmark the link below.</p>
								<hr />
								<p className="mb-0">
									<Link className="btn btn-info btn-block" role="button" to={"/card/tracking/"+this.state.order._id}>Tracking</Link>
								</p>
							</Alert>
						</Col>
					</Row>
				</Page>
				);
		}

		return (
			<Page>
				<Row>
					<Col sm="6">
						<CardFrontPreview image={this.state.image} />
					</Col>
					<Col sm="6">
						<CardBackPreview text={this.state.text} address={this.state.address}  color={this.state.color} size={this.state.size} font={this.state.font} />
					</Col>
					<Col sm="6">
						<Link
							className="btn btn-info btn-block"
							role="button"
							to={"/card/front/"+this.state.backButton}>Wait, let me change that image again!</Link>
					</Col>
					<Col sm="6">
						<Link
							className="btn btn-info btn-block"
							role="button"
							to="/card/back">Hm, lets change that back side once more!</Link>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<Button className="btn btn-success btn-block"
						onClick={this.placeOrder}
						>Looks good, ship it!</Button>
					</Col>
				</Row>
			</Page>
		);
	}
}
