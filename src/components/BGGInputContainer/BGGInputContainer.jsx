import React, { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import BggSearchInput from "bgbf-bgg-search";

import sty from "./BGGInputContainer.module.scss";

const BGGInputContainer = ({ setBggData }) => {
  const handleSelectChanged = useCallback(async (res) => {
    try {
      // res is promise
      const data = await res;
      setBggData(data);
    } catch (error) {
      alert("遊戲資料錯誤...？");
      console.log(error);
    }
  }, []);

  return (
    <div className={sty.BGGInputContainer}>
      <h1>🎲 搜尋桌遊 🔍</h1>
      <BggSearchInput
        className={sty.BggSearchInput}
        isGetFullGameData
        onChangeSelect={handleSelectChanged}
      />
    </div>
  );
};

BGGInputContainer.propTypes = {};

export default BGGInputContainer;
