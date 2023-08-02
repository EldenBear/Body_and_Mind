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
  const [currentPost, setCurrentPost] = React.useState(0);
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
    const { isOpen, onOpen, onClose } = useDisclosure();

    React.useEffect( () => {
      function handleResize() {
        setIsMobile(window.innerWidth < 1000);
      }
      window.addEventListener('resize', handleResize);
    });

    function openDrawer(postId) {
        setCurrentPost(postId);
      onOpen();
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
            onClickComment={() => openDrawer(post.id)}
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
    };

    return (
        <>
        <ProfileNav isMobile={isMobile}></ProfileNav>
        <div className="profileMain">
        {renderPosts()}
      </div>
      <Drawer onClose={onClose} isOpen={isOpen} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className="commentDrawer">Comments</DrawerHeader>
          <DrawerBody className="commentDrawer">
            {renderComments()}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
        </>
    )
 }



 export default ProfilePage;