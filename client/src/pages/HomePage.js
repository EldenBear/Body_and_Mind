import * as React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import "../components/HomePage.css";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <a href="profile">Profile</a>
          <a href="workouts">Workouts</a>
          <a href="logout">Logout</a>
        </div>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
        >
          &#128149; Donate
        </Button>
      </div>

      <div className="main">
        <Post
          name="John Smith"
          userTitle="Web Developer"
          postText="Sample post text goes here"
          onClickComment={onOpen}
        ></Post>
        <Post
          name="Bob Barker"
          userTitle="Host"
          postText="Sample post text goes here"
          onClickComment={onOpen}
        ></Post>
        <Post
          name="James Wong"
          userTitle="Chef"
          postText="Sample post text goes here"
          onClickComment={onOpen}
        ></Post>
        <Post
          name="John John"
          userTitle="Unemployed"
          postText="Sample post text goes here"
          onClickComment={onOpen}
        ></Post>
      </div>
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="commentDrawer">Comments</DrawerHeader>
          <DrawerBody className="commentDrawer">
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
            <Comment
              name="John Smith"
              userTitle="Web Developer"
              postText="Sample post text goes here"
            ></Comment>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
