import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap';

import Page from '../components/Page.js';
import ownimage from '../img/ownimage.jpg'
import collection from '../img/collection2.jpg'

const pStyle = {
	fontSize: '30px',
	textAlign: 'center'
	};
const pStyle2 = {
	marginTop: '180px',
	fontSize: '30px',
	textAlign: 'center',
	verticalAlign:'middle'
};

export default class CardNewView extends React.Component {
	//todo: make this more beautiful
	render() {
		return (
		<Page>
			<Row>
				<Col sm="6">
					<p style={pStyle}>Send your own photo as a postcard</p>
				</Col>
				<Col sm="6">
					<p style={pStyle}>Choose from over 100+ existing images</p>
				</Col>
			</Row>

			<Row>
				<Col sm="5">
					<Link role="button" to="/card/front/upload">
						<img src={ownimage} height="400" alt=""/>
					</Link>
				</Col>
				<Col sm ="2">
					<p style={pStyle2}>OR</p>
				</Col>
				<Col sm="5">
					<Link role="button" to="/card/front/collection">
						<img className="image" src={collection} height="400" align="left" alt=""/>
					</Link>
				</Col>
			</Row>
			
			<Row>
				<Col sm="6">
					<Link className="btn btn-info btn-block" role="button" to="/card/front/upload">Upload Image</Link>
				</Col>
				<Col sm="6">
					<Link className="btn btn-info btn-block" role="button" to="/card/front/collection">Choose Image</Link>
				</Col>
			</Row>
		</Page>
		);
	}
}
