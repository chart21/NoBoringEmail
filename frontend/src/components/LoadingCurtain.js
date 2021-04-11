import React from 'react';
import Styled from 'styled-components';

import Logo from '../img/logo_alpha.png'


class PlainLoadingCurtain extends React.Component {
	render() {
		return <div id="LoadingCurtain" />
	}
}

const LoadingCurtain = Styled(PlainLoadingCurtain)`
	position: relative;
	height: 1000px;
	width: 1000px;
	
	&:after {
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    background: url(${Logo}) no-repeat center center;
	    content: '';
	    -webkit-animation: spinX 3s infinite;
	    animation: spinX 3s infinite;
	}
`;

export default LoadingCurtain;
