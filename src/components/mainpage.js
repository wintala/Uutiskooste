import React, { useEffect, useState } from "react";
import "./mainpage.css"
import Displayer from "./news-displayer";
import Banner from "./banner";
import service from "../service"

const Mainpage = () => {
  const [newsData, setNewsData] = useState(null)
  const [sourceDisplayOrder, setSourceDisplayOrder] = useState(["is", "yle", "il", "hs", "mtv"])
  const [showOrderManager, setShoworderManager] = useState(false)

  useEffect(() => {
    service.getData().then(r => setNewsData(r))

    const order = window.localStorage.getItem("orderPreference")
    if (order) {
      setSourceDisplayOrder(JSON.parse(order))
    }
  }, [])

  const handleOrderChange = (index, moveUp) => {
    if ((index === 0 && moveUp) || (index === sourceDisplayOrder.length - 1 && !moveUp)) {
      return null
    }
    const newOrder = [...sourceDisplayOrder]
    const tarnsition = moveUp ? 1 : - 1
    newOrder[index] = sourceDisplayOrder[index - tarnsition]
    newOrder[index - tarnsition] = sourceDisplayOrder[index]

    window.localStorage.setItem("orderPreference", JSON.stringify(newOrder))
    setSourceDisplayOrder(newOrder)
  }

  const orderManager = () => {
    if (showOrderManager) {
      return(
        <div className="order-manager">
          <ol className="order-list">
            {sourceDisplayOrder.map((s,i) => 
            <li key={s} className="order-item">
              <div>{s}</div>
              <div className="arrow-up" onClick={() => handleOrderChange(i, true)}></div>
              <div className="arrow-down" onClick={() => handleOrderChange(i, false)}></div>
            </li>
            )}
          </ol>
          <button className="order-button" onClick={() => setShoworderManager(false)}>Valmis</button>
        </div>
      )
    } else {
      return(
        <div className="button-centerer">
          <button className="order-button" onClick={() => setShoworderManager(true)}>Hallitse järjestystä</button>
        </div>
      )
    }
  }
    

  return(
    <>
    <Banner 
      mainHeader={"5TOP5 UUTISET"}
      secondaryHeader={"Tunneittain päivittyvä kooste suomen viiden suurimman uutissivuston viidestä luetuimmasta uutisesta"} 
    />
    {orderManager()}
    <Displayer newsData={newsData} withImages={true} order={sourceDisplayOrder} />
    </>
  )

}

export default Mainpage;
