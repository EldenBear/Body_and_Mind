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
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      name: "John Smith",
      userTitle: "Developer",
      postText: "Sample text",
      imageURL: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      comments:[ {
        name: "John Smith",
        userTitle: "Developer",
        postText: "Text text etxtdfcsj"
      }]
    }
  ]);
  const [addPostDesc, setAddPostDesc] = React.useState("");
  const [addPostImage, setAddPostImage] = React.useState("");
  const [addPostComment, setAddPostComment] = React.useState("");
  const [currentPost, setCurrentPost] = React.useState(0);

  const { isOpen, onOpen, onClose, firstField, } = useDisclosure();
  const commentDrawer = "comment";
  const postDrawer = "post";


  React.useEffect( () => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  });

  function openDrawer(drawer, postId) {
    setCurrentDrawer(drawer);
    if (drawer === commentDrawer) {
      setCurrentPost(postId);
    } 
    onOpen();
  };

  function onChangePostDesc(e) {
    setAddPostDesc(e.target.value)
  };

  function onChangePostImage(e) {
    setAddPostImage(e.target.value)
  };

  function onChangeComment(e) {
    setAddPostComment(e.target.value)
  };

  function onSubmit() {
    const newPost = {
      id: posts.length + 1,
      name: "John Smith",
      userTitle: "Developer",
      postText: addPostDesc,
      imageURL: addPostImage,
    };
    setPosts([...posts, newPost]);
    onClose()
  };

  function onSubmitComment() {
    const newComment = {
      name: "John Smith",
      userTitle: "Developer",
      postText: addPostComment
    };
    const post = posts.filter(x => x.id === currentPost);
    const newArray = posts.filter(x => x.id !== currentPost);
    post[0].comments.push(newComment);
    setPosts([...newArray, ...post]);
  };

  const renderPosts = () => {
    return (
      posts.map(post => {
        return (
          <Post
          name={post.name}
          userTitle={post.userTitle}
          imageURL={post.imageURL}
          postText={post.postText}
          onClickComment={() => openDrawer(commentDrawer, post.id)}
        ></Post>
        )
      })
    )
  };

  const renderComments = () => {
    const post = posts.filter(x => x.id === currentPost);
    if (post.length !== 1) {
      return  
    }
    return (
      post[0].comments.map(comment => {
        return (
          <Comment
              name={comment.name}
              userTitle={comment.userTitle}
              postText={comment.postText}
            ></Comment>
        )
      })
    )
  }

  return (
    <>
    <Button className="addPostButton" position={"fixed"} colorScheme="primary" onClick={() => openDrawer(postDrawer)}>+ Add Post</Button>
     <Navigation isMobile={isMobile} avatarURL={avatarURL}></Navigation>
      <div className="main">
       {renderPosts()}
      </div>
      <Drawer onClose={onClose} isOpen={isOpen && currentDrawer === commentDrawer} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="commentDrawer">Comments</DrawerHeader>
          <DrawerBody className="commentDrawer">
          <Textarea placeholder='Comment' className="commentInputField" onChange={onChangeComment} />
          <Button colorScheme='blue' className="commentInputButton" onClick={onSubmitComment}>Submit</Button>
            {renderComments()}
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
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea id='desc' onChange={onChangePostDesc} />
              </Box>
              <Box>
                <FormLabel htmlFor='url'>Image URL</FormLabel>
                <InputGroup>
                  <Input
                    onChange={onChangePostImage}
                    type='url'
                    id='url'
                    placeholder='Please enter image url for post'
                  />
                </InputGroup>
              </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={onSubmit}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
