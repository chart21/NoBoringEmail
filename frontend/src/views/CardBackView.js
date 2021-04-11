import React from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Button} from 'reactstrap';
import styled from 'styled-components';
import '../fonts/fonts.css'

import Page from '../components/Page.js';
const textFonts = ['adelline','Dancing in the Beat']
const textColors = ['#000000','#0000ff','#00ffff','#6ddac8','#a0db8e','#bfff00','#ffff00','#ff8000','#ff0000','#ffbf00','#ffc0cb','#ffe1c7','#ca91de','#c0d6e4','#815442','#a43c1d']
const BackView = styled.div`
    width: 650px;
    height:420px;
    border: 1px solid #FFF;
    border-radius: 5px;
    box-shadow: 1px 2px 4px rgba(0,0,0,.4);
    float:left;
    display: flex;
    flex-direction: row;
    position: relative;
`;
const TextArea = styled.textarea`
	resize: none;
	margin: 100px 5px 50px 5px;
	padding-top: 0px;
	width: 320px;
	height: 300px;
	text-align: center;
	vertical-align: middle;
	border: 1px solid #FFF;
	float: left;
`;
const VerticalLine = styled.div`
	height: 300px;
	width: 3px;
	margin-top: 70px;
	background-color:#D3D3D3;
`;
const RightSide = styled.div`
	display: flex;
	flex-direction: column;

`;
const Stamp = styled.div`
	height: 80px;
	width: 70px;
	border: 2px solid #D3D3D3;
	text-align: center;
	position: absolute;
	top: 15px;
	right: 15px;
	span{
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
`;
const Form = styled.form`
	position: relative;
    top: 50%;
    margin-left: 20px;
`;
const Input = styled.input`
	box-sizing: border-box;
	outline: none;
	display: block;
	width: 100%;
	padding: 5px;
	border: none;
	border-bottom: 2px solid #ddd;
	font-size: 17;
`;
const Menu = styled.div`
	font-family: 'Lato', sans-serif;
	font-size: 18px;
	width: 180px;
`;
const FontSelector = styled.div`
	height: 50px;
	width: auto;
	ul {
		margin-top: 1px;
		visibility: hidden;
		position: absolute;
		top: 1px;
		left: 99%;
		z-index: 1;
		width: 100%;
		li {
			float: none;
			list-style: none;
			width: 300px;
			background: #fff;
			border-left: 20px solid transparent;
			&:hover {
				> span {
				color: #3dbd99;
				}
			}
		}
	}
	span {
		margin-left: 30px;
		font-size: 25px;
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	&:hover {
		position: relative;
    	z-index: 2;
    	cursor: default;
    	background: #f6f6f6;
		> ul {
			visibility: visible;
		}
	}
`; 
const ButtonPlace = styled.div`
	flex-direction: row;
	margin-top: 20px;
	margin-bottom: 20px;
	height: 50px;
	width: auto;
	span {
		margin: 7px;
	}
`;
const Pallete = styled.div`
	width: 160px;
    height: 160px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const Box = styled.div`
	margin: 5px;
	padding: 5px;
	width: 25px;
	height: 25px;
`;

function DisplayStyle({font,onClick}) {
	return (
		<li onClick={onClick}>
			<span style={{fontFamily: font, fontSize: 30}}>Styling your message</span>
		</li>
	)
}
function ColorSquare({color,onClick}) {
return (
	<Box style={{backgroundColor: color}} onClick={onClick}/>
	)
}

export default class CardBackView extends React.Component {
	constructor(props) {
		super(props);

		let name = ''
		let address = ''
		let zipCode = ''
		let country = ''
		let storedAddress = localStorage.getItem('postcard.address');

		if(storedAddress !== null){
			storedAddress = storedAddress.split('\n');

			name = storedAddress.shift();
			address = storedAddress.shift();
			zipCode = storedAddress.shift();
			country = storedAddress.shift();
		}

		let fontSize = localStorage.getItem('postcard.options.size') || 30;
		if(typeof fontSize === "string" || fontSize instanceof String){
			fontSize = parseInt(fontSize, 10);
		}


		this.state = {
			backButton: localStorage.getItem('postcard.imageSource'),
			text: localStorage.getItem('postcard.text') || "",
			options: {
				font: localStorage.getItem('postcard.options.font') || 'adelline',
				size: fontSize,
				color: localStorage.getItem('postcard.options.color') || '#000000',
			},
			receiverInfo: {
				name: name,
				address: address,
				zipCode: zipCode,
				country: country,
			}
		}

		this.handleFont = this.handleFont.bind(this);
		this.increaseFontSize = this.increaseFontSize.bind(this);
		this.decreaseFontSize = this.decreaseFontSize.bind(this);
		this.handleColor = this.handleColor.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		this.handleMessageInput = this.handleMessageInput.bind(this);
		this.handleReceiverInfo = this.handleReceiverInfo.bind(this);
	}

	handleFont(i,event) {
		this.setState({options: { ...this.state.options, font:i } });
		event.preventDefault();
	}
	handleColor(i,event) {
		this.setState({options: { ...this.state.options, color:i}});
		event.preventDefault();
	}
	handleEnter(event) {
		if (event.keyCode === 13) {
			const form = event.target.form;
			const index = Array.prototype.indexOf.call(form, event.target);
			form.elements[index + 1].focus();
			event.preventDefault();
		}
	}

	handleReceiverInfo(event) {
		let type = event.target.name;
		this.setState({receiverInfo: { ...this.state.receiverInfo, [type]: event.target.value}});
		event.preventDefault();
	}
	
	handleMessageInput(event) {
		this.setState({text: event.target.value});
		event.preventDefault();
	}

	increaseFontSize() {
		let updateSize = this.state.options.size+1;
		this.setState({options: { ...this.state.options, size: updateSize} });
	}

	decreaseFontSize() {
		let updateSize = this.state.options.size-1;
		if(updateSize >20) {
			this.setState({options: { ...this.state.options, size: updateSize} });
		} else {
			alert("Text is too small, your buddy won't be able to read it");
		}
	}


	saveCardBack(e) {
		if(this.state.receiverInfo.name === '' || this.state.receiverInfo.address === '' || this.state.receiverInfo.zipCode === '' || this.state.receiverInfo.country === ''){
			e.preventDefault();
			alert('Whoo, slow down, we need at least an address to deliver your postcard!');
		}


		const address = [this.state.receiverInfo.name, this.state.receiverInfo.address, this.state.receiverInfo.zipCode, this.state.receiverInfo.country].join('\n');
	
		localStorage.setItem('postcard.address', address);
		localStorage.setItem('postcard.text', this.state.text);
		localStorage.setItem('postcard.options.font', this.state.options.font);
		localStorage.setItem('postcard.options.size', this.state.options.size);
		localStorage.setItem('postcard.options.color', this.state.options.color);
	}

	render() {
		return (
			<Page>
				<Row>
					<Col sm='3'>
						<Menu>
							<FontSelector> <span>Styling</span>
								<ul>
									{
										textFonts.map(iterator => (
										<DisplayStyle key={iterator} font={iterator} onClick={e => this.handleFont(iterator,e)}/>
										))
									}  
								</ul>    
							</FontSelector>
							<ButtonPlace>							
								<Button outline color='primary' style={{marginLeft:'30px'}} onClick={this.decreaseFontSize}> - </Button>
									<span>{this.state.options.size}</span>
								<Button outline color='primary' onClick={this.increaseFontSize}> + </Button>						
							</ButtonPlace>
							<Pallete>
								{
									textColors.map(iterator => (
									<ColorSquare key={iterator} color={iterator} onClick={e => this.handleColor(iterator,e)}/>
									))
								}
							</Pallete>
						</Menu>
					</Col>
					<BackView>
						<TextArea autoFocus placeholder='Write your message here' value={this.state.text} style={{fontSize : this.state.options.size, fontFamily: this.state.options.font, color: this.state.options.color}} onChange={this.handleMessageInput}/>							<VerticalLine />
						<RightSide>
							<Stamp> 
								<span>Stamp</span> 
							</Stamp>
							<Form>
								<Input required name='name' placeholder="Your buddy's name" style={{fontFamily : this.state.options.font}} value={this.state.receiverInfo.name} onKeyDown={this.handleEnter} onChange={this.handleReceiverInfo}/>
								<Input required name='address' placeholder="Address (street, number)" style={{fontFamily : this.state.options.font}} value={this.state.receiverInfo.address} onKeyDown={this.handleEnter} onChange={this.handleReceiverInfo}/>
								<Input required name='zipCode' placeholder="Zip code, city" style={{fontFamily : this.state.options.font}} value={this.state.receiverInfo.zipCode} onKeyDown={this.handleEnter} onChange={this.handleReceiverInfo}/>
								<Input required name='country' placeholder="Country" style={{fontFamily : this.state.options.font}} value={this.state.receiverInfo.country} onChange={this.handleReceiverInfo}/>
							</Form>                
						</RightSide>
					</BackView>
				</Row>
				<hr/>
				<Row>
					<Col sm="6">
						<Link
								className="btn btn-info btn-block"
								role="button"
								to={"/card/front/"+this.state.backButton}>Wait, let me change that image again!</Link>
					</Col>
					<Col sm="6">
						<Link
								className="btn btn-success btn-block"
								role="button"
								onClick={this.saveCardBack.bind(this)}
								to="/card/order">Alright, send it!</Link>
					</Col>
				</Row>
			</Page>
		);
	}
}
