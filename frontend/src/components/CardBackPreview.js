import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import nl2br from 'react-nl2br';
//import { Textfit } from 'react-textfit';
import { Row, Col} from 'reactstrap';


export default class CardBackPreview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 10,
		}

		this.updateCardDimensions = this.updateCardDimensions.bind(this);
	}

	updateCardDimensions() {
		const width = document.getElementById('OuterCardBackComponent').offsetWidth;
		this.setState({ height: Math.round(width * 0.709) });
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
			border-radius: 0px;
			width: 100%;
			height: ${props => props.calculatedHeight}px;
			margin-bottom: 30px;
			padding: 5%;
		`

		const InnerCard = Styled(Row)`
			margin: 0 !important;
			height: 100%;
			width: 100%;
		`

		const LeftSide = Styled(Col)`
			border-right: 3px solid #D3D3D3;
			height: 100%;
			overflow: hidden;
			font-family: '${props => props.font}', sans-serif;
			font-size: ${props => props.size}px;
			color: ${props => props.color};
		`

		const RightSide = Styled(Col)`
			padding-top: 40%;
		`

		return (
			<OuterCard calculatedHeight={this.state.height} id="OuterCardBackComponent">
				<InnerCard>
					<LeftSide xs="6" font={this.props.font} size={this.props.size} color={this.props.color}>
						{this.props.text}
					</LeftSide>
					<RightSide xs="6">
						{nl2br(this.props.address)}
					</RightSide>
				</InnerCard>
			</OuterCard>
		);
	}
};

CardBackPreview.propTypes = {
	text: PropTypes.string,
	address: PropTypes.string.isRequired,
	font: PropTypes.string,
	size: PropTypes.string,
};
