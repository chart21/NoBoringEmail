import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';

import { apiURL } from "../config";


export default class CardFrontPreview extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 10,
		}

		this.updateCardDimensions = this.updateCardDimensions.bind(this);
	}

	updateCardDimensions() {
		const width = document.getElementById('OuterCardComponent').offsetWidth;
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
			padding: 20px;
			height: ${props => props.calculatedHeight}px;
		`

		const InnerCard = Styled.div`
			height: 100%;
			border-radius: 10px;
			width: 100%;
			border: 0px dashed black;
			background: url("${apiURL+/images/+this.props.image}") no-repeat center center;
			background-size: cover;
		`

		return (
			<OuterCard calculatedHeight={this.state.height} id="OuterCardComponent">
				<InnerCard background={this.props.image} />
			</OuterCard>
		);
	}
};

CardFrontPreview.propTypes = {
	image: PropTypes.string.isRequired,
};
