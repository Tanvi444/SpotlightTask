import React, { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";


export default function App(props) {
    const [isOn, setIsOn] = useState(false);
  
    const toggleSwitch = () =>{
         setIsOn(!isOn);
        props.setOn(isOn)
    }


    
  
    return (
      <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
        <motion.div className="handle" layout transition={spring} />
      </div>
    );
  }
  
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };
  