// import React from 'react';
// import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";


import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { useHistory } from 'react-router-dom';
export const Tutorial = () => {
    let open = true;
    const history = useHistory();
   function setHandleOpen(){
        open = true
    }
    function setHandleClose(){
        open = false
        history.push('/dashboard');
    }
  
  return (
    <div>
      <AutoRotatingCarousel
        label= "Get started"
        // ButtonProps = "Get started"
        open={open} 
        onClose={() => setHandleClose() }
        onStart={() => setHandleOpen()}
        autoplay={false}
        style={{ position: "absolute" }}
       
      >
        
        <Slide
          media={
            <img src="../img/dashboard.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="This is your dashboard"
          subtitle="Click on the bottom right add sign to create a new project "
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_80975/GoogleInbox.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={
            <img src="http://www.icons101.com/icon_png/size_256/id_76704/Google_Settings.png" />
          }
          mediaBackgroundStyle={{ backgroundColor: green[400] }}
          style={{ backgroundColor: green[600] }}
          title="May the force be with you"
          subtitle="The Force is a metaphysical and ubiquitous power in the Star Wars fictional universe."
        />
      </AutoRotatingCarousel>
    </div>
  );
};