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
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);
  const [avatarURL, setAvatarURL] = React.useState('https://bit.ly/broken-link');

  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect( () => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
     <Navigation isMobile={isMobile} avatarURL={avatarURL}></Navigation>
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
