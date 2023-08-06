import * as React from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Navigation from '../components/Navigation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMMENTS_BY_POST_ID, GET_ME, GET_POSTS, GET_POST_ID } from '../utils/queries';
import { ADD_COMMENT, ADD_POST } from '../utils/mutations';
import '../components/HomePage.css';
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
} from '@chakra-ui/react';

const HomePage = () => {
  // Query the 'me' data from the server
  const { loading: meLoading, data: meData } = useQuery(GET_ME);

  // Query 'getPosts' data from the server
  const { loading: postsLoading, data: postsData } = useQuery(GET_POSTS);

  // Query 'getPostId' data from the server
  const { loading: postIdLoading, data: postIdData } = useQuery(GET_POSTS);



  // Send the data to GraphQL
  const [addPost] = useMutation(ADD_POST);

  // State to handle mobile responsiveness
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);

  // State for user avatar URL
  const [avatarURL, setAvatarURL] = React.useState(
    'https://bit.ly/broken-link'
  );

  // State for handling the open drawer and its type
  const [currentDrawer, setCurrentDrawer] = React.useState(null);

  // State for managing posts
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (postsData?.getPosts) {
      setPosts(postsData.getPosts);
    }
  }, [postsData]);

  // State for adding a new post
  const [addPostDesc, setAddPostDesc] = React.useState('');
  const [addPostImage, setAddPostImage] = React.useState('');

  // State for adding a new comment
  const [addPostComment, setAddPostComment] = React.useState('');
  const [currentPost, setCurrentPost] = React.useState(null);

  // UseDisclosure hook to manage the drawer state
  const { isOpen, onOpen, onClose, firstField } = useDisclosure();

  const {loading: commentsLoading, data: commentData, refetch: refetchComments} = useQuery(GET_COMMENTS_BY_POST_ID, {
    variables: { postId: currentPost },
  });

  // Constants for drawer types
  const commentDrawer = 'comment';
  const postDrawer = 'post';

  // Mutation hook to add a new comment
  const [addComment] = useMutation(ADD_COMMENT);

  // Check if user is authenticated and redirect if not
  React.useEffect(() => {
    if (meLoading) {
      return;
    }
    if (meData?.me === undefined) {
      window.location.href = '/';
    }
  }, [meLoading, meData?.me]);

  // Listen for window resize events to handle mobile responsiveness
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  });
  
  // Function to open the drawer based on its type (comment or post)
  function openDrawer(drawer, postId) {
    setCurrentDrawer(drawer);
    if (drawer === commentDrawer) {
      setCurrentPost(postId);
    }
    onOpen();
  }

  // Event handlers for input fields
  function onChangePostDesc(e) {
    setAddPostDesc(e.target.value);
  }

  function onChangePostImage(e) {
    setAddPostImage(e.target.value);
  }

  function onChangeComment(e) {
    setAddPostComment(e.target.value);
  }

  // Submit new post to add it to the posts array
  async function onSubmit() {
    const newPost = {
      postText: addPostDesc,
      imageURL: addPostImage,
    };

    const { data } = await addPost({
      variables: {
        post: {
          postText: addPostDesc,
          imageURL: addPostImage,
        },
      },
    });

    setPosts([...posts, newPost]);
    onClose();
  }

  // Submit new comment to add it to the comments array
  async function onSubmitComment() {
    const { data } = await addComment({
      variables: {
        comment: {
          content: addPostComment,
        },
        postId: currentPost
      },
      onCompleted: refetchComments,
    });
  }

  // Render all posts
  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <Post
          key={post._id}
          name={post.username}
          userTitle={post.activityLevel}
          imageURL={post.imageURL}
          postText={post.postText}
          profilePicture={post.profilePicture}
          onClickComment={() => openDrawer(commentDrawer, post._id)}
        ></Post>
      );
    });
  };

  // Render comments for the current post
  const renderComments = () => {
    if (meLoading) {
      return <p>Loading comments...</p>;
    }

    if(commentsLoading) {
      return <p>Comments are loading</p>;
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
      {/* Button to add a new post */}
      <Button
        className='addPostButton'
        position={'fixed'}
        colorScheme='primary'
        onClick={() => openDrawer(postDrawer)}
      >
        + Add Post
      </Button>
      {/* Navigation bar */}
      <Navigation
        isMobile={isMobile}
        avatarURL={avatarURL}
        loading={meLoading}
        data={meData}
      ></Navigation>
      {/* Render all posts */}
      <div className='main'>{renderPosts()}</div>

      {/* Drawer for comments */}
      <Drawer
        onClose={onClose}
        isOpen={isOpen && currentDrawer === commentDrawer}
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader className='commentDrawer'>Comments</DrawerHeader>
          <DrawerBody className='commentDrawer'>
            <Textarea
              placeholder='Comment'
              className='commentInputField'
              onChange={onChangeComment}
            />
            <Button
              colorScheme='blue'
              className='commentInputButton'
              onClick={onSubmitComment}
            >
              Submit
            </Button>
            {/* Render comments for the current post */}
            {renderComments()}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Drawer for creating a new post */}
      <Drawer
        isOpen={isOpen && currentDrawer === postDrawer}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Create a new post</DrawerHeader>
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
            <Button colorScheme='blue' onClick={onSubmit}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HomePage;
