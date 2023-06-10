import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import ThreeRadarChart from "../../ThreeRadarChart";
import useStore from "../../store/useStore";

import sty from "./QRRadar.module.scss";

const QRRadar = ({}) => {
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const [nowShowIndex, setNowShowIndex] = useState(undefined);

  useEffect(() => {
    if (!isRecordingMode) {
      setNowShowIndex(undefined);
    }
    return () => {};
  }, [isRecordingMode]);

  const [data, setData] = useState([
    { name: "？？", value: 1 },
    { name: "？？", value: 1 },
    { name: "？？", value: 1 },
  ]);

  const handleClickNextIndex = useCallback(() => {
    setNowShowIndex((index) =>
      index === undefined ? 0 : index + 1 < data.length ? index + 1 : undefined
    );
  }, [data]);

  console.log(nowShowIndex);

  const onChangeInputLabel = useCallback((value, index) => {
    setData((prevData) => {
      return [
        ...prevData.slice(0, index),
        {
          name: value,
          value: prevData[index].value,
        },
        ...prevData.slice(index + 1),
      ];
    });
  }, []);

  const onChangeValue = useCallback((value, index) => {
    setData((prevData) => {
      return [
        ...prevData.slice(0, index),
        {
          name: prevData[index].name,
          value,
        },
        ...prevData.slice(index + 1),
      ];
    });
  }, []);

  const addDataItem = useCallback(() => {
    setData(([data1, ...prevData]) => {
      return [data1, { name: "", value: 0.5 }, ...prevData];
    });
  }, []);

  const deleteDataItem = useCallback((index) => {
    setData((prevData) => {
      return [...prevData.slice(0, index), ...prevData.slice(index + 1)];
    });
    useStore.setState({ focusPointIndex: false });
  }, []);

  return (
    <div className={sty.container}>
      <div className={sty.QRRadar}>
        <ThreeRadarChart
          data={
            isRecordingMode
              ? data.map(({ name, value }, index) => {
                  const isShowIndex = index === 0 ? 0 : data.length - index;

                  return {
                    name,
                    value: isShowIndex <= nowShowIndex ? value : 0.5,
                  };
                })
              : data
          }
          onChangeInputLabel={onChangeInputLabel}
          onChangeValue={onChangeValue}
          handleDeleteDataItem={deleteDataItem}
          editMaxValue={6}
        />
      </div>
      <div className={sty.box__btns}>
        <button
          className={cx(sty.btn)}
          // onClick={() => setIsFinalScoreMode(false)}
          onClick={() => setIsRecordingMode((state) => !state)}
        >
          {isRecordingMode ? "關閉演出模式" : "開啟演出模式"}
        </button>
        {isRecordingMode ? (
          <button
            className={cx(sty.btn)}
            // onClick={() => setIsFinalScoreMode(false)}
            onClick={handleClickNextIndex}
          >
            下一個
          </button>
        ) : (
          <button
            className={cx(sty.btn)}
            // onClick={() => setIsFinalScoreMode(false)}
            onClick={addDataItem}
          >
            ＋1維度
          </button>
        )}
      </div>
    </div>
  );
};

QRRadar.propTypes = {};

export default QRRadar;
