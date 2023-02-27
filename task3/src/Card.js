import React, { useState ,useRef,useEffect} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { AnimateSharedLayout } from "framer-motion";
import * as Plot from "@observablehq/plot";
import 'react-circular-progressbar/dist/styles.css';
import "./Card.css";
const Card = (props) => {
  function MyPlot({ data }) {
    const ref = useRef();
  
    useEffect(() => {
      const barChart = Plot.plot({
        marks: [
          Plot.ruleY([1 / 26], { stroke: "orange", strokeWidth: 3 }),
          Plot.barY(data, {
            x: "Letter",
            y: "Frequency",
            fill: "#ff5050",
          }),
          Plot.ruleY([0])
        ],
        y: {
          grid: true,
          transform: d => d * 100
        },
        marginTop: 60,
        marginLeft:50,
        marginBottom:60
      });
      ref.current.append(barChart);
      return () => barChart.remove();
    }, [data]);
    return <div ref={ref}></div>
  }
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {
        expanded ? (
          <div className="expanded">
            <h1 style={{ color: "white" }}>{props.title}</h1>
            <div>
            <p className="close" onClick={() => { setExpanded(false) }}>x</p>
            </div>
            <MyPlot data={props.data} />
          </div>
        ) :
          <div className="main_card" onClick={() => { setExpanded(true) }}>
            <div className="box" >
              <div className="bar">
                <CircularProgressbar value={props.barValue} text={`${props.barValue}%`} />
                <p style={{ color: "white", fontWeight: "500", fontSize: "25px" }}>{props.title}</p>
              </div>
              <div className="bar centre">
                <p style={{ color: "white" }}>Last 24 hours</p>
                <p style={{ color: "white", fontWeight: "500", fontSize: "25px" }}>${props.value}</p>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default Card;