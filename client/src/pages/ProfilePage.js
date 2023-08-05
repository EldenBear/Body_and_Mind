import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_POSTS } from '../utils/queries';
import Post from '../components/Post';
import Comment from '../components/Comment';
import ProfileNav from '../components/ProfileNav';
import '../components/ProfilePage.css';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const ProfilePage = () => {
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const { loading: postsLoading, data: postsData } = useQuery(GET_POSTS);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1000);
  const [currentPost, setCurrentPost] = React.useState(0);
  let { id } = useParams();
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    if (postsData?.getPosts) {
      setPosts(postsData.getPosts);
    }
  }, [postsData]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1000);
    }
    window.addEventListener('resize', handleResize);
  });

  function openDrawer(postId) {
    setCurrentPost(postId);
    onOpen();
  }

  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          name={post.name}
          userTitle={post.userTitle}
          imageURL={post.imageURL}
          postText={post.postText}
          onClickComment={() => openDrawer(post.id)}
        ></Post>
      );
    });
  };

  const renderComments = () => {
    if (meLoading) {
      return <p>Loading comments...</p>;
    }

    if (meData?.me) {
      // Find the post based on the 'currentPost' state
      const post = meData.me;

      // If the post is found and it has comments
      if (post && post.comments && post.comments.length > 0) {
        return post.comments.map((comment) => (
          <Comment
            key={comment._id}
            name={post.username}
            userTitle={post.activityLevel}
            postText={comment.content}
          />
        ));
      }
    } else {
      return <p>No comments yet.</p>;
    }
  };

  return (
    <>
      <ProfileNav isMobile={isMobile} username={id}></ProfileNav>
      <div className='profileMain'>{renderPosts()}</div>
      <Drawer onClose={onClose} isOpen={isOpen} size={'lg'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className='commentDrawer'>Comments</DrawerHeader>
          <DrawerBody className='commentDrawer'>{renderComments()}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfilePage;
