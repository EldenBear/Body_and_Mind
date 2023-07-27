import * as React from "react";
import Post from "../components/Post";
import "../components/HomePage.css";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Button,
  ButtonGroup,
  WrapItem,
} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <>
      <div class="sidenav">
          <h1 className="homeHeader">Body & Mind</h1>
        <div>
        <WrapItem>
          <Avatar
            size="2xl"
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
            className="avatarPhoto"
          />{" "}
        </WrapItem>
        <p className="userName">John Smith</p>
        <a href="#clients">Profile</a>
        <a href="#contact">Logout</a>
        </div>
        <Button
          size='md'
          height='48px'
          width='200px'
          border='2px'
          borderColor='green.500'
        >
          &#128149; Donate
        </Button>
      </div>

      <div className="main">
        <Post name="John Smith" userTitle="Web Developer" postText="Sample post text goes here"></Post>
        <Post name="Bob Barker" userTitle="Host" postText="Sample post text goes here"></Post>
        <Post name="James Wong" userTitle="Chef" postText="Sample post text goes here"></Post>
        <Post name="John John" userTitle="Unemployed" postText="Sample post text goes here"></Post>
      </div>
    </>
  );
};

export default HomePage;
