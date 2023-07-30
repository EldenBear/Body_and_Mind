import * as React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Navigation from "../components/Navigation";
import "../components/HomePage.css";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
     <Navigation></Navigation>
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
