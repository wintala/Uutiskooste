import React, { useEffect, useState } from "react";
import "./archives.css"
import Banner from "./banner";
import Displayer from "./news-displayer";
import service from "../service"

const Archive = () => {
	const [newsDataSets, setNewsDataSets] = useState(null)
	const [numberOfRecords, setNumberOfRecords] = useState(null)
	const [showImages, setShowImages] = useState(false)
	const [sourceDisplayOrder, setSourceDisplayOrder] = useState(["is", "yle", "il", "hs", "mtv"])
	const [pageNum, setPageNum] = useState(1)

	const itemsPerPage = 10

  useEffect(() => {
		service.getMetaData().then(r => setNumberOfRecords(r.numberOfRecords))
		service.getRange(1, itemsPerPage).then(r => setNewsDataSets(r))
		const order = window.localStorage.getItem("orderPreference")
		if (order) {
			setSourceDisplayOrder(JSON.parse(order))
		}
  }, [])

	
	const newDataSets = (pageNum) => {
		const finnish = itemsPerPage * pageNum
		const start = finnish - itemsPerPage + 1
		service.getRange(start, finnish).then(r => {
			setNewsDataSets(r)
			setPageNum(pageNum)
		})
	}

	function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

  return(
		<>
		<Banner 
      mainHeader={"ARKISTO"}
      secondaryHeader={"Täältä löydät aiempien tuntien uutiskoosteet"} 
    />
		{newsDataSets ? 
		<div>
			<h3>
				Sivu (tuloksia sivulla 10):
			</h3>
			<ol className="page-list">
			{[...Array(Math.ceil(numberOfRecords / itemsPerPage)).keys()].map(num =>
				<li key={num} onClick={() => newDataSets(num + 1)} className="page-list-item"
					style={pageNum === num + 1 ? {backgroundColor: "rgb(100, 100, 200)"} : null}
				>
					{num + 1}
				</li>)}
			</ol>
			<div className="button-centerer">
				<button className="image-display-button" onClick={() => setShowImages(!showImages)}>
					{showImages ? "Piilota kuvat" : "Näytä kuvat"}
				</button>
			</div>
			<ol className="news-hour-list">
				{newsDataSets.map(s => 
				<li key={s.id} className="news-hour-wrap">
					<h1>
						{convertTZ(s.time, 'Europe/Helsinki').toString()}
					</h1>
					<Displayer newsData={s} withImages={showImages} order={sourceDisplayOrder}/>
				</li>
				)}
			</ol>
		</div> : 
		<div className="loading-wrap">
			<div>Haetaan uutisia</div>
			<div className="dot-loading">
				<div></div>
				<div></div>
				<div></div>
				<div></div> 
			</div>
		</div>}
		</>
  )

}

export default Archive;
