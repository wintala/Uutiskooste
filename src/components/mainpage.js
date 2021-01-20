import React, { useEffect, useState } from "react";
import Displayer from "./news-displayer";
import Banner from "./banner";
import service from "../service"

const Mainpage = () => {
  const [newsData, setNewsData] = useState(null)

  useEffect(() => {
    service.getData().then(r => setNewsData(r))
  }, [])

  return(
    <>
    <Banner 
      mainHeader={"5TOP5 UUTISET"}
      secondaryHeader={"Tunneittain päivittyvä kooste suomen viiden suurimman uutissivuston viidestä luetuimmasta uutisesta"} 
    />
    <Displayer newsData={newsData} withImages={true} />
    </>
  )

}

export default Mainpage;
