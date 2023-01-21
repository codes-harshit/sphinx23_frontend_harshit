// import React, { useState } from "react";
// import pyramid from "../../../images/about/pyramid.png";
// import Bottom from "../../../images/about/pyramidBottom.png";
// import "../../../styles/about.css";
// import HomeNav from "./homeNav";

// function About() {
//   const [currTab, setCurrTab] = useState("Home");
//   const Tabs = ["Home", "About", "Contact"];
//   return (
//     <div className="about-main">
//       {/* <div className="about-pyramid">
//         <img className="about-pyramid-img" src={pyramid}></img>
//       </div> */}
//       <HomeNav
//         setCurrTab={setCurrTab}
//         currTab={currTab}
//         Tabs={Tabs}
//         notanimation={true}
//       />
//       <div className="about-bottom">
//         <img className="about-bottom-img" src={Bottom}></img>
//       </div>
//       <div className="about-info">
//         <div className="home-about-title">ABOUT US</div>
//         <div className="about-Maincontent">
//           Sphinx is the largest technology fest in Rajasthan, held annually at
//           the MNIT Jaipur campus. The fest attracts thousands of students from
//           all over the country, who come to participate in a wide range of
//           technical and non-technical events. The event includes workshops,
//           competitions, guest lectures and exhibitions on the latest technology
//           and innovations.{" "}
//         </div>
//         <button className="home-about-btn">Learn More</button>
//       </div>
//     </div>
//   );
// }

// export default About;

import React, { useState } from "react";
import HomeNav from "./homeNav";

export default function About() {
  const [currTab, setCurrTab] = useState("Home");
  const Tabs = ["Home", "About", "Contact"];
  return (
    <div className="about-page">
      <HomeNav
        setCurrTab={setCurrTab}
        currTab={currTab}
        Tabs={Tabs}
        notanimation={true}
      />
      <div className="about-page-background-img">
        <div className="about-page-side-rectangle"></div>
        <div className="about-page-center-rectangle"></div>
      </div>
      <div className="about-page-bg-overlay"></div>
      <div className="about-page-content">
        <div className="about-page-content-text">
          <div className="about-page--text-head">ABOUT US</div>
          <div className="about-page--text-body">
            Sphinx is the largest technology fest in Rajasthan, held annually at
            the MNIT Jaipur campus. The fest attracts thousands of students from
            all over the country, who come to participate in a wide range of
            technical and non-technical events. The event includes workshops,
            competitions, guest lectures and exhibitions on the latest
            technology and innovations.{" "}
          </div>
          <div className="about-page--text-button">Learn More</div>
        </div>
      </div>

      {/* <div className="scroll-down-prompt"></div> */}
    </div>
  );
}