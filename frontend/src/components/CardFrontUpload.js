import React from 'react';
import { Link } from 'react-router-dom'
import Styled from 'styled-components';
import { Row, Col, Alert } from 'reactstrap';
import Dropzone from 'react-dropzone'

import Page from '../components/Page.js';
import dropzoneDefaultImg from '../img/dropzone-default.png'

import { apiURL } from "../config";
import ImageService from '../services/ImageService';


// todo: lift image state up (maybe?)
export default class CardFrontUpload extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 10,
			image: localStorage.getItem('postcard.image')
		}

		this.OuterCardRef = React.createRef();

		this.handleOnDrop = this.handleOnDrop.bind(this);
		this.updateCardDimensions = this.updateCardDimensions.bind(this);
	}

	handleOnDrop(acceptedFiles, rejectedFiles){
		if(rejectedFiles.length > 0 || acceptedFiles.length !== 1){
			alert("Only jpeg files are supported!");
			return
		}

		ImageService.upload(acceptedFiles[0]).then((data) => {
			this.setState(Object.assign({}, this.state, {
				image: data.filename,
			}));
			localStorage.setItem('postcard.image', data.filename);
			localStorage.setItem('postcard.imageSource', 'upload');
			localStorage.setItem('postcard.imageURL', apiURL+/images/+data.filename);
		}).catch((e) => {
			console.error(e);
		});
	}

	updateCardDimensions() {
		//const width = this.OuterCardRef.current.offsetWidth;
		//todo: check why refs are fucking assholes
		const width = document.getElementById('OuterCardComponent').offsetWidth;
		this.setState(Object.assign({}, this.state, {
			height: Math.round(width * 0.709)
		}));
	}

	componentDidMount() {


		this.updateCardDimensions();
		window.addEventListener("resize", this.updateCardDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateCardDimensions);
	}

	render() {
		// 10,5 x 14,8 cm => 1.0 to 1.4
		const OuterCard = Styled.div`
			border: 2px solid black;
			border-radius: 7px;
			padding: 20px;
			height: ${props => props.calculatedHeight}px;
		`

		const StyledDropZone = Styled(Dropzone)`
			height: 100%;
			border-radius: 10px;
			width: 100%;
			border: 2px dashed black;
			background: url("${props => props.background ? apiURL+/images/+this.state.image : dropzoneDefaultImg}") no-repeat center center;
			background-size: ${props => props.background ? "cover" : "auto"};
		`

		return (
			<Page>
				<Row>
					<Col md="8">
						<OuterCard calculatedHeight={this.state.height} id="OuterCardComponent">
							<StyledDropZone
								background={this.state.image}
								id="dropzone"
								accept="image/jpeg"
								onDrop={this.handleOnDrop}
							/>
						</OuterCard>
					</Col>
					<Col md="4">
						<Alert color="info">
							<h4 className="alert-heading">Want to design your very own postcard?</h4>
							<p>Sure, why not! Just select the very best image to showcase your holiday location and simply drag it onto the card on the left, easy as that.</p>
							<p>To ensure the best fit try to select an image with 1:1.4 proportions.</p>
							{this.state.image ? <React.Fragment><hr /><p className="mb-0"><Link className="btn btn-info btn-block" role="button" to="/card/back">Next</Link></p></React.Fragment> : ''}
						</Alert>
					</Col>
				</Row>
			</Page>
		);
	}
};
