import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_POSTS_BY_USERNAME, GET_COMMENTS_BY_POST_ID } from '../utils/queries';
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
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1000);
  const [currentPost, setCurrentPost] = React.useState(null);

  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  
  let { id } = useParams();
  const  { loading: postsLoading, data: postsData } = useQuery(GET_POSTS_BY_USERNAME, {
    // pass URL parameter
    variables: { username: id },
  });

  const {loading: commentsLoading, data: commentData, refetch: refetchComments} = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { postId: currentPost },
  });

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
    if(postsLoading){
      return <p>Loading...</p>
    }
    return postsData.getPostsByUsername.map((post) => {
      return (
        <Post
          key={post._id}
          name={post.username}
          userTitle={post.activityLevel}
          imageURL={post.imageURL}
          postText={post.postText}
          profilePicture={post.profilePicture}
          onClickComment={() => openDrawer(post._id)}
        ></Post>
      );
    });
  };

  const renderComments = () => {
    if (meLoading) {
      return <p>Loading comments...</p>;
    }

    if (commentData && commentData.getCommentsByPostId) {
      return commentData.getCommentsByPostId.map((comment) => (
        <Comment
          key={comment._id}
          name={comment.username}
          userTitle={comment.activityLevel}
          postText={comment.content}
          profilePicture={comment.profilePicture}
        />
      ));
    } else {
      return <p>No comments yet</p>
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
