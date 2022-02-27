import React, { useRef } from "react";
import PlayerContainer from "Shared/Player/PlayerContainer";
import logo from "Assets/Images/logo.png";
import { Typography } from "@mui/material";
//import disableScroll from "disable-scroll";
import { StyledLogoTitle } from "./Home.styles";

export default function Home(props) {
  const scrollRef = useRef(null);
  //const [blockScroll, allowScroll] = useScrollBlock();
  // run this function from an event handler or an effect to execute scroll
  /*
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
  */

  return (
    <div ref={scrollRef} style={{ marginBottom: 100 }}>
      <StyledLogoTitle src={logo} alt="" title="foreFX" />
      <Typography variant="h3" style={{ marginBottom: 100 }}>
        Compare Before and After Versions of your Videos
      </Typography>
      <PlayerContainer vID1="gFcDolkdB9A" vID2="a7kTqy96Bz8" />
    </div>
  );
}
