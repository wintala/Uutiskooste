import React from "react";
import "./news-displayer.css"
import hsLogo from "../logos/hs_logo.png"
import ilLogo from "../logos/il_logo.png"
import isLogo from "../logos/is_logo.png"
import mtvLogo from "../logos/mtv_logo.png"
import yleLogo from "../logos/yle_logo.png"

const Displayer = ({newsData, withImages}) => {
  
  if (!newsData) {
    return null
  }

	const logos = {
		hs: {logo: hsLogo, size: "27px", top: "10px"},
		il: {logo: ilLogo, size: "30px", top: "10px"},
		mtv: {logo: mtvLogo, size: "32px", top: "10px"},
		yle: {logo: yleLogo, size: "48px", top: "0px"},
		is: {logo: isLogo, size: "48px", top: "0"}
	}

  return(
    <div id="displayer">
    {Object.keys(newsData.data).map(source => 
      <div className="source-wrap" key={source} style={withImages ? null : {height: "auto", paddingTop: "50px"}}>
				<img className="source-image" 
					src={logos[source].logo} 
					style={{height: logos[source].size, top: logos[source].top}} 
					alt={`${source} logo`}>
				</img>
        <ol className="news-list">
          {newsData.data[source].map(article => 
          <li className="article-wrap" key={article.title}>
            <a className="article" href={article.url}>
            {withImages ? 
						<div className="article-image" style={{backgroundImage: `url(${article.picture})`}}></div> : null}
            <div className="article-title">{article.title}</div>
            </a>
          </li>
          )}
        </ol>
      </div>
    )}
    </div>
  )


}

export default Displayer;
