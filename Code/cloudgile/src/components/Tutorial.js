import React, { useState } from "react";
import { red, blue, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import dashboardImg from '../img/dashboard.png'
import { Image } from "react-bootstrap";
import { getCurrentUser } from "../auth";
import firebase from 'firebase/app';

export const Tutorial = () => {
  const [open, setOpen] = useState(true)
  
  const handleClose = async () => {
    await firebase.database().ref('users/' + getCurrentUser().id + '/firstUser').set(false)
    setOpen(false)
  }

  return (
    <div>
      <AutoRotatingCarousel
        label= "Get started"
        ButtonProps = "Get started"
        open={open} 
        onStart={() => handleClose()}
        autoplay={false}
        style={{ position: "absolute" }}
       
      >    
        <Slide
          media={
            <Image
              style={{borderRadius: 0, height: 400, width: 600}}
              src={dashboardImg}
              fluid
            />
          }
          mediaBackgroundStyle={{ backgroundColor: red[400] }}
          style={{ backgroundColor: red[600] }}
          title="This is your dashboard"
          subtitle="Click on the bottom right add sign to create a new project "
        />
        <Slide
          media={
            <Image
              style={{ borderRadius: 0, height: 400, width: 600 }}
              src={dashboardImg}
              fluid
            />
          }
          mediaBackgroundStyle={{ backgroundColor: blue[400] }}
          style={{ backgroundColor: blue[600] }}
          title="Ever wanted to be popular?"
          subtitle="Well just mix two colors and your are good to go!"
        />
        <Slide
          media={
            <Image
              style={{ borderRadius: 0, height: 400, width: 600 }}
              src={dashboardImg}
              fluid
            />
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