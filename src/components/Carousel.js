import React from 'react';
import Carousel from 'react-slick';
import './Carousel.css';

class SimpleCarousel extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true, 
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<Carousel {...settings} className="carsousel">
				<div className="slick-item"><h3>1</h3></div>
				<div><h3>2</h3></div>
				<div><h3>3</h3></div>
				<div><h3>4</h3></div>
				<div><h3>5</h3></div>
				<div><h3>6</h3></div>
			</Carousel>	
		)
	}
}

export default SimpleCarousel
