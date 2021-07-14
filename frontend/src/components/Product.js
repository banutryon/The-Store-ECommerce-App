import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
	const { product } = props;
	return (
		<div className="border">
		<div key={product._id} className="card">
			
			<Link to={`/product/${product._id}`}>
				<img className="medium" src={product.image} alt={product.name} />
			</Link>
			<div className="card-body">
				<Link to={`/product/${product._id}`}>
					<h2>{product.name.substring(0,11)}</h2>
				</Link>
				<Rating
					rating={product.rating}
					numReviews={product.numReviews}
				></Rating>
				<div className="row">
					
					<div>
						<Link to={`/seller/${product.seller._id}`}>
							{product.seller.seller.name}
						</Link>
					</div>
					<div className="price">${product.price}</div>
				</div>
			</div>
		</div>
		</div>
	);
}
