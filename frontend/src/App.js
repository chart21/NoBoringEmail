import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


//import DummyView from "./views/DummyView.js";
//import LandingpageView from "./views/LandingpageView.js";
import UserCombinedAccessView from "./views/UserCombinedAccessView.js";
import AccountView from "./views/AccountView.js";

import CardNewView from "./views/CardNewView.js";
import CardFrontUploadView from "./views/CardFrontUploadView.js";
import CardFrontCollectionView from "./views/CardFrontCollectionView.js";

import CardBackView from "./views/CardBackView.js";
import CardOrderView from "./views/CardOrderView.js";

import TrackingView from "./views/TrackingView.js";


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			routes: [
				// UC  := use case
				// UCX := not directly a use case but necessary

				// UCX: landingpage with welcome OR redirect to /card
				// todo: perform redirect
				{ component: () => <Redirect to="/card/new"/>, path: '/', exact: true},

				// UCX: Login
				{ component: UserCombinedAccessView, path: '/login'},

				// UCX: Profile of the user: list account data and past orders
				{ component: AccountView, path: '/account'},



				// UC1: selection of upload image vs. provided image
				{ component: CardNewView, path: '/card/new'},

				// UC1.1: select an image from our collection
				{ component: CardFrontUploadView, path: '/card/front/upload'},

				// UC1.2: select an image from our collection
				{ component: CardFrontCollectionView, path: '/card/front/collection'},



				// UC2: Design the back of the card
				{ component: CardBackView, path: '/card/back'},

				// UCX: Save / send the card (ask for address of recipient etc.)
				{ component: CardOrderView, path: '/card/order'},



				// UC3: Tracking page
				{ component: TrackingView, path: '/card/tracking/:id'}
			]
		};
	}

	componentDidMount(){
		/*
		if (localStorage.getItem('postcard') === null) {
			localStorage.setItem('postcard', {image: ""})
		}
		*/
	}

	render() {
		return(
			<div>
				<Router>
					<Switch>
						{this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
