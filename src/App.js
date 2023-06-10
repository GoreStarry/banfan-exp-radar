import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import axios from "axios";
import bggXmlApiClient from "bgg-xml-api-client";
import ReactGA from "react-ga4";

import BGGInputContainer from "./components/BGGInputContainer";
import BanFanRadarContainer from "./components/BanFanRadarContainer";
import translateCHT, { testCHS } from "./utils/translateCHT";
import QRRadar from "./components/QRRadar";

ReactGA.initialize("G-1SKVN0B57M");
ReactGA.send("pageview");

// ?id=4DcP0jS4KgeA0jbacbd0W1
function App() {
  const [isNoGameTarget, setIsNoGameTarget] = useState();
  const [isQuickReviewMode, setIsQuickReviewMode] = useState();
  const [imgUrlGameCover, setImgUrlGameCover] = useState();
  const [gameName, setGameName] = useState();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bggID = urlParams.get("bggID");
    const isQuickReview = urlParams.get("QR");
    const contentfulID = urlParams.get("id");

    if (bggID) {
      getDataFromBgg(bggID);
    } else if (contentfulID) {
      getDataFromContentful(contentfulID);
    }
    if (isQuickReview) {
      setIsQuickReviewMode(true);
    } else {
      setIsNoGameTarget(true);
    }

    return () => {};
  }, []);

  const getDataFromBgg = useCallback(async (id) => {
    try {
      const {
        data: { item: data },
      } = await bggXmlApiClient.get("thing", {
        id,
        type: "boardgame,boardgameexpansion",
      });
      setBggData(data);
    } catch (error) {
      console.log(error);
      alert("好像沒這桌耶...？？？");
    }
  }, []);

  const setBggData = useCallback((data) => {
    setImgUrlGameCover(`/api/corsAnywhere/${data.image}`);
    setGameName(
      (data.name.length
        ? translateCHT(
            data.name.find(({ value }) => {
              return (
                !value.match(/[\u3041-\u30FF]/) && //日文
                value.match(/[\u4E00-\u9FFF]/) && //中文（含簡體）
                !testCHS(value) // 不含簡體
              );
            })?.value
          ) || data.name[0].value
        : data.name.value
      ).replace(/&#039;/g, "'") // bgg weird not &#39;
    );
  }, []);

  const getDataFromContentful = useCallback((id) => {
    axios
      .get(`https://slides-together.vercel.app/api/getRadarTopic?id=${id}`)
      .then(({ data: { name, imgUrl } }) => {
        setImgUrlGameCover(imgUrl);
        setGameName(name);
      })
      .catch((err) => {
        alert("好像沒這桌耶...？？？");
      });
  }, []);

  return (
    <div className="App">
      {isNoGameTarget && !gameName && (
        <BGGInputContainer setBggData={setBggData} />
      )}

      {gameName && (
        <BanFanRadarContainer
          imgUrlGameCover={imgUrlGameCover}
          gameName={gameName}
        />
      )}

      {isQuickReviewMode && <QRRadar />}
    </div>
  );
}

export default App;
