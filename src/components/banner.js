import React from "react";
import "./banner.css"

const Banner = ({mainHeader, secondaryHeader}) => {

	return(
	<div id="banner-wrap">
		<div className="banner"></div>
		<h1>
				{mainHeader}
		</h1>
		<h2>
			{secondaryHeader}
		</h2>
	</div>
	)
}

export default Banner