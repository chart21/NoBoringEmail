import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Alert } from 'reactstrap';

import Page from '../components/Page.js';
import CardFrontPreview from '../components/CardFrontPreview.js';

import { apiURL } from "../config";
import ImageService from '../services/ImageService';

const iStyle = {
	width: '280px',
	marginLeft: '20px'
};

const pStyle = {
	fontSize: '25px',
	textAlign: 'left'
};

export default class CardFrontCollectionView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			images: null,
			location: '',
			imagesByLocation: null,
			hasGeo: false,
			lat: '',
			lng: '',
			imagesByLngLat: null,
		};

		this.handleChangeLocation = this.handleChangeLocation.bind(this);
		this.handleChangeLat = this.handleChangeLat.bind(this);
		this.handleChangeLng = this.handleChangeLng.bind(this);

		ImageService.getList().then((data) => {
			data = data.length === 0 ? null : data;
			this.setState(Object.assign({}, this.state, {images: data}));
		}).catch((e) => {
			console.error(e);
		});
	}

	handleChangeLocation(value) {
		value = value.target.value;
		value = value.charAt(0).toUpperCase() + value.slice(1);
		this.setState(Object.assign({}, this.state, {location: value}));

		if(value === ''){
			this.setState(Object.assign({}, this.state, {location: value, imagesByLocation: null}));
			return;
		}

		ImageService.getListByLocation(value).then((data) => {
			data = data.length === 0 ? null : data;
			this.setState(Object.assign({}, this.state, {imagesByLocation: data}));
		}).catch((e) => {
			console.error(e);
		});
	}

	handleChangeLat(value) {
		value = value.target.value;
		this.setState(Object.assign({}, this.state, {lat: value}));

		this.searchByLngLat(this.state.lng, value);
	}

	handleChangeLng(value) {
		value = value.target.value;
		this.setState(Object.assign({}, this.state, {lng: value}));

		this.searchByLngLat(value, this.state.lat);
	}

	searchByLngLat(lng, lat){
		if(lng === "" || lat === ""){
			return
		}

		ImageService.getListByLngLat(lng, lat).then((data) => {
			data = data.length === 0 ? null : data;
			console.log(data)
			this.setState(Object.assign({}, this.state, {imagesByLngLat: data}));
		}).catch((e) => {
			console.error(e);
		});
	}

	selectImage(filename) {
		this.setState(Object.assign({}, this.state, {image: filename}));

		localStorage.setItem('postcard.image', filename);
		localStorage.setItem('postcard.imageSource', 'collection');
		localStorage.setItem('postcard.imageURL', apiURL+/images/+filename);
	}

	componentDidMount(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState(Object.assign({}, this.state, {
					hasGeo: true,
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}));

				this.searchByLngLat(position.coords.longitude, position.coords.latitude);
			},
			() => {
				this.setState(Object.assign({}, this.state, {hasGeo: false}));
			}

		);
	}

	render() {
		const ImagesSlider = ({images}) => (
			<React.Fragment>
			{images.map(i => (
				<img alt="" height="140px" width="197px" key={i._id} src={apiURL+/images/+i.filename} onClick={() => {this.selectImage(i.filename)}} />
			))}
			</React.Fragment>
		);

		return (
			<Page>
				{
				this.state.image ?
					<React.Fragment><Row>
						<Col sm="5">
							<CardFrontPreview image={this.state.image} />
						</Col>
						<Col sm="7">
							<Alert color="info">
								<h4 className="alert-heading">Do you like the preview?</h4>
								<p>On the left you can see how the front of your final card will look like.</p>
								<p>If you like the style just click on the button below to continue, else you can just select another image from the collection below.</p>
								<hr /><p className="mb-0"><Link className="btn btn-info btn-block" role="button" to="/card/back">Next</Link></p>
							</Alert>
						</Col>
					</Row><hr /></React.Fragment> :
					''
				}
				<Row>
					<Col><p style={pStyle}>The newest images</p></Col>
				</Row>

				<Row>
					<Col>
						{this.state.images ?
							<ImagesSlider images={this.state.images} style = {iStyle} /> :
							<p style={{height: "140px"}}>No images found! :( Try "Munich" for examples</p>
						}
					</Col>
				</Row>

				<hr />
				<Row>
					<Col><p style={pStyle}>Recommended postcards based on your location</p></Col>


				</Row>
				<Row>
					<Col>
						{this.state.imagesByLngLat ?
							<ImagesSlider images={this.state.imagesByLngLat} /> :
							<p style={{height: "140px"}}>Your location is not visible to us. Please check your browser settings</p>
						}
					</Col>
				</Row>
				<hr />

				<Row>
					<Col><p style={pStyle}>Search for a specific place &nbsp;
					<input
					type="text"
					onChange={this.handleChangeLocation}
					value={this.state.location}
					/></p></Col>
				</Row>
				<Row>
					<Col>
						{this.state.imagesByLocation ?
							<ImagesSlider images={this.state.imagesByLocation} /> :
							<p style={{height: "140px"}}>Try "Hawaii" for example</p>
						}
					</Col>
				</Row>

				<hr />










			</Page>
		);
		/**
		 <Row>
		 <Col><p style = {pStyle2}>Search for a geo location
		 <input
		 type="text"
		 onChange={this.handleChangeLat}
		 value={this.state.lat}
		 placeholder="Lat"
		 />
		 <input
		 type="text"
		 onChange={this.handleChangeLng}
		 value={this.state.lng}
		 placeholder="Lng"
		 /></p></Col>
		 </Row>
		 <Row>
		 <Col>
		 {
		 this.state.imagesByLngLat ?
			 <ImagesSlider images={this.state.imagesByLngLat} /> :
			 <p style={{height: "140px"}}>No images found! :( Try "48.1548895, 11.4717965" for examples</p>
		 }
		 </Col>
		 </Row>
		 */

		/**
		 * 	<Row  style={{marginTop: "400px"}}>
		 <Col sm="8">
		 <p style={pStyle}>Recommended postcards based on your location</p>
		 </Col>
		 <Col sm="4">
		 <div syle={down}>
		 <img style={box} className="icon"
		 src={gps} height="40"
		 alt="gps icon"/>

		 <Link
		 className="btn btn-info btn-block"
		 role="button"
		 to="/card/front/collection">Allow GPS Access</Link>
		 </div>

		 </Col>
		 </Row>

		 <Row>



		 <div className='searchbar-container' style={movecenter}>
		 <form onSubmit={e => e.preventDefault()}>
		 <input
		 type='text'
		 size='30'
		 placeholder='Search for a specific place'

		 value={this.state.username} />


		 <img type="submit" className="icon"
		 src={search} height="40"
		 alt="search icon"/>

		 </form>
		 </div>

		 </Row>


		 <Row>
		 <Col sm="2">
		 <Link

		 role="button"
		 to="/card/back/view">
		 <img className="postcard" alt=""
		 src={munich1} width="150" height="100"/>
		 </Link>
		 </Col>

		 <Col sm="2">
		 <Link

		 role="button"
		 to="/card/back/view">
		 <img className="postcard" alt=""
		 src={munich2} width="150" height="100"/>
		 </Link>
		 </Col>

		 <Col sm="2">
		 <Link

		 role="button"
		 to="/card/back/view">
		 <img className="postcard" alt=""
		 src={munich3} width="150" height="100"/>
		 </Link>
		 </Col>
		 <Col sm="2">
		 <Link

		 role="button"
		 to="/card/back/view">
		 <img className="postcard" alt=""
		 src={munich4} width="150" height="100"/>
		 </Link>
		 </Col>
		 <Col sm="2">
		 <Link

		 role="button"
		 to="/card/back/view">
		 <img className="postcard" alt=""
		 src={tum} width="150" height="100"/>
		 </Link>
		 </Col>
		 <Col sm="2">
		 <img className="icon" alt=""
		 src={next} width="100" height="100"/>
		 </Col>
		 </Row>

		 <Row>

		 <Col sm="8">
		 <p style={pStyle}>All postcards - sorted by most popular</p>
		 </Col>
		 </Row>
		 <Row>
		 <Col sm="2">
		 <img className="postcard" alt=""
		 src={tum} width="150" height="100"/>
		 </Col>

		 <Col sm="2">
		 <img className="postcard" alt=""
		 src={munich3} width="150" height="100"/>
		 </Col>

		 <Col sm="2">
		 <img className="postcard" alt=""
		 src={munich4} width="150" height="100"/>
		 </Col>
		 <Col sm="2">
		 <img className="postcard" alt=""
		 src={munich1} width="150" height="100"/>
		 </Col>
		 <Col sm="2">
		 <img className="postcard" alt=""
		 src={munich2} width="150" height="100"/>
		 </Col>
		 <Col sm="2">
		 <img className="icon" alt=""
		 src={next} width="100" height="100"/>
		 </Col>
		 </Row>
		 */



		/**
		 <Form>
		 <FormGroup>
		 <Label for="CardFrontImage">CardFrontImage</Label>
		 <Input
		 type="select"
		 name="CardFrontImage"
		 value={this.state.image}
		 onChange={this.handleChangeImage}
		 id="CardFrontImage"
		 value={defaultImage}>
		 {options}
		 </Input>
		 </FormGroup>
		 </Form>
		 <Link
		 className="btn btn-info btn-block"
		 role="button"
		 to="/card/back">Work on back</Link>

		 <img src={imgSrc} />
		 */
	}
}
