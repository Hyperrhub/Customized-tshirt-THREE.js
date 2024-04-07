import React from 'react'
import './App.css'
import { AiOutlineShopping,AiOutlineHighlight, AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './Store'
import {motion, AnimatePresence} from 'framer-motion'

export const Overlay = () => {
  const snap = useSnapshot(state)
  const transition = {type:'spring', duration:1.8, delay:1}
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div className="container">
      <motion.header 
      initial={{opacity: 0, y:-1}}
      animate= {{opacity:1 ,y:20}}
      transition={{type:'spring', duration:1.8, delay:1}}>
        <img
          src={"./logo192.png"}
          style={{ width: "80px", height: "80px" }}
        ></img>
        {state.intro && <AiOutlineShopping size="3rem" />}
      </motion.header>
  
<AnimatePresence>
      {snap.intro ?( <Intro key="main" config={config}></Intro>) : (<Customizer key="custom" config={config}></Customizer>)}
</AnimatePresence>
    </div>
  );
}

//INTRODUCTION PART

function Intro({config}) {
  return (
    <motion.section {...config} key="main">
      <div className="section--container">
        <div>
          <h1>LET'S DO IT</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Creat your own design that makes you feel unique and exclusive
              with our brand-new 3D customization tool.{" "}
              <strong>Unleash your imagination</strong> and define your own
              style.
            </p>
            <button
              style={{ background: "black", width: "200px", height: "40px" }}
              onClick={() => {
                state.intro = false;
              }}
            >
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

//CUSTOMIZING PART

function Customizer({ config }) {
  const snap = useSnapshot(state);
  const colors = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#353934",
    "purple",
    "red",
  ];
  const decals = ["react", "three2", "pmndrs"];
  return (
    <motion.section {...config} key="custom">
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => {
                state.selectedColor = color;
              }}
            ></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((img) => (
              <div
                key={img}
                className="decal"
                onClick={() => {
                  state.selectedDecal = img;
                }}
              >
                <img src={img + "_thumb.png"} alt="brand" />
              </div>
            ))}
          </div>
        </div>
        <button 
          className="share"
          style={{ background: snap.selectedColor }}
          onClick={() => {
            const link = document.createElement("a");
            link.setAttribute("download", "canvas.png");
            link.setAttribute(
              "href",
              document
                .querySelector("canvas")
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream")
            );
            link.click();
          }}
        >
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => {
            state.intro = true;
          }}
        >
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </motion.section>
  );
}