 import *  as React from "react";
 import Post from "../components/Post";
 import Comment from "../components/Comment";
 import ProfileNav from "../components/ProfileNav";
 import "../components/ProfilePage.css";
 import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
  } from "@chakra-ui/react";


 const ProfilePage = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1000);
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect( () => {
      function handleResize() {
        setIsMobile(window.innerWidth < 1000);
      }
      window.addEventListener('resize', handleResize);
    });

    return (
        <>
        <ProfileNav isMobile={isMobile}></ProfileNav>
        <div className="profileMain">
        <Post
          name="John Smith"
          userTitle="Web Developer"
          postText="Sample post text goes here"
          onClickComment={onOpen}
        ></Post>
        <Post
          name="John Smith"
          userTitle="Web Developer"
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </>
    )
 }



 export default ProfilePage;