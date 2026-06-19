'use client';

import dynamic from "next/dynamic";
import ScrollWrapper from "./common/ScrollWrapper";
import Experience from "./experience";
import Footer from "./footer";
import Hero from "./hero";

const CanvasLoader = dynamic(() => import("./common/CanvasLoader"), {
  ssr: false,
});

const HomeExperience = () => {
  return (
    <CanvasLoader>
      <ScrollWrapper>
        <Hero />
        <Experience />
        <Footer />
      </ScrollWrapper>
    </CanvasLoader>
  );
};

export default HomeExperience;
