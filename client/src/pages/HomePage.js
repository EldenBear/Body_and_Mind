import * as React from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Navigation from "../components/Navigation";
import "../components/HomePage.css";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

const HomePage = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);
  const [avatarURL, setAvatarURL] = React.useState('https://bit.ly/broken-link');
  const [currentDrawer, setCurrentDrawer] = React.useState(null);

  const { isOpen, onOpen, onClose, firstField, } = useDisclosure();
  const commentDrawer = "comment";
  const postDrawer = "post";


  React.useEffect( () => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  });

  function openDrawer(drawer) {
    setCurrentDrawer(drawer);
    onOpen();
  }

  return (
    <>
    <Button className="addPostButton" position={"fixed"} colorScheme="primary" onClick={() => openDrawer(postDrawer)}>+ Add Post</Button>
     <Navigation isMobile={isMobile} avatarURL={avatarURL}></Navigation>
      <div className="main">
        <Post
          name="John Smith"
          userTitle="Web Developer"
          postText="Sample post text goes here"
          onClickComment={() => openDrawer(commentDrawer)}
        ></Post>
      </div>
      <Drawer onClose={onClose} isOpen={isOpen && currentDrawer === commentDrawer} size={"lg"}>
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

      <Drawer isOpen={isOpen && currentDrawer === postDrawer} placement='right' initialFocusRef={firstField}  onClose={onClose} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new post
          </DrawerHeader>
          <DrawerBody>
              <Box>
                <FormLabel htmlFor='url'>Image URL</FormLabel>
                <InputGroup>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Please enter image url for post'
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea id='desc' />
              </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
