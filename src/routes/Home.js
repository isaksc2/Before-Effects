import React, { useRef, useEffect } from "react";
import PlayerContainer from "../components/PlayerContainer";
import logo from "../images/logo.png";
import { Button } from "@material-ui/core";
import useScrollBlock from "../helper/useScrollBlock";
import { disableScroll, enableScroll } from "../helper/ScrollInput";
//import disableScroll from "disable-scroll";
import createScrollSnap from "scroll-snap";
import useScrollSnap from "react-use-scroll-snap";

export default function Home(props) {
  const oldScrollY = useRef(window.pageYOffset);
  const scrollRef = useRef(null);
  const autoScrolling = useRef(false);
  //const [blockScroll, allowScroll] = useScrollBlock();
  // run this function from an event handler or an effect to execute scroll
  const executeScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const listenToScroll = () => {
    const scrollY = window.pageYOffset;
    // true -> down, false -> up
    const direction = oldScrollY.current <= scrollY;
    oldScrollY.current = scrollY;

    const player = scrollRef.current.getBoundingClientRect();
    const playerDistToCenter = player.bottom - player.height;
    const distanceLeft = playerDistToCenter * (direction * 2 - 1);
    if (!autoScrolling.current && distanceLeft < 300 && distanceLeft > 0) {
      autoScrolling.current = distanceLeft;
      // disable scroll for up to a second
      //blockScroll();
      //disableScroll.on({scroll});
      //disableScroll();
      setInterval(() => {
        autoScrolling.current = false;
        //allowScroll();
        //disableScroll.off();
        //enableScroll();
      }, autoScrolling.current * 10);
      //executeScroll();
    }
  };
  useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });
  useEffect(() => {
    //window.addEventListener("scroll", listenToScroll);
    const { bind, unbind } = createScrollSnap(
      scrollRef.current,
      {
        snapDestinationY: "90%",
      },
      () => console.log("element snapped")
    );
    //bind();
    console.log("bound");

    return () => {
      //window.removeEventListener("scroll", listenToScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={scrollRef}>
      <div>
        <Button onClick={() => executeScroll()}>aaaaaaaaaaaaaaa</Button>
        <img src={logo} alt={""} style={{ height: 90, marginTop: 40, marginBottom: -32, marginRight: -25 }}></img>
        <h1 style={{ display: "inline", color: "#EEEEEE" }}>foreFX</h1>
      </div>

      <h1 style={{ color: "#EEEEEE", marginBottom: 300 }}>Compare Before and After Versions of your Videos</h1>
      <div>
        <PlayerContainer vID1="gFcDolkdB9A" vID2="a7kTqy96Bz8" />
      </div>
      <Button style={{ marginTop: 20 }}></Button>
    </div>
  );
}
