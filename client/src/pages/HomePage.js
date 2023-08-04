import * as React from 'react';
import Post from '../components/Post';
import Comment from '../components/Comment';
import Navigation from '../components/Navigation';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
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
  const { loading, data } = useQuery(GET_ME);

  // State to handle mobile responsiveness
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);

  // State for user avatar URL
  const [avatarURL, setAvatarURL] = React.useState(
    'https://bit.ly/broken-link'
  );

  // State for handling the open drawer and its type
  const [currentDrawer, setCurrentDrawer] = React.useState(null);

  // State for managing posts
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      name: 'John Smith',
      userTitle: 'Developer',
      postText: 'Sample text',
      imageURL:
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      comments: [
        {
          name: 'John Smith',
          userTitle: 'Developer',
          postText: 'Text text etxtdfcsj',
        },
      ],
    },
  ]);

  // State for adding a new post
  const [addPostDesc, setAddPostDesc] = React.useState('');
  const [addPostImage, setAddPostImage] = React.useState('');

  // State for adding a new comment
  const [addPostComment, setAddPostComment] = React.useState('');
  const [currentPost, setCurrentPost] = React.useState(0);

  // UseDisclosure hook to manage the drawer state
  const { isOpen, onOpen, onClose, firstField } = useDisclosure();

  // Constants for drawer types
  const commentDrawer = 'comment';
  const postDrawer = 'post';

  // Mutation hook to add a new comment
  const [addComment] = useMutation(ADD_COMMENT);

  // Check if user is authenticated and redirect if not
  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (data?.me === undefined) {
      window.location.href = '/';
    }
  }, [loading, data?.me]);

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
  function onSubmit() {
    const newPost = {
      id: posts.length + 1,
      name: data.me.username,
      userTitle: data.me.activityLevel,
      postText: addPostDesc,
      imageURL: addPostImage,
    };
    setPosts([...posts, newPost]);
    onClose();
  }

  // Submit new comment to add it to the comments array
  async function onSubmitComment() {
    const newComment = {
      name: 'Fake User',
      userTitle: 'Shithead',
      postText: addPostComment,
    };

    const { data } = await addComment({
      variables: {
        comment: {
          content: addPostComment,
        },
      },
    });

    console.log(`data: ${JSON.stringify(data)}`);

    const post = posts.filter((x) => x.id === currentPost);
    const newArray = posts.filter((x) => x.id !== currentPost);
    post[0].comments.push(newComment);
    setPosts([...newArray, ...post]);
  }

  // Render all posts
  const renderPosts = () => {
    return posts.map((post) => {
      return (
        <Post
          name={post.name}
          userTitle={post.userTitle}
          imageURL={post.imageURL}
          postText={post.postText}
          onClickComment={() => openDrawer(commentDrawer, post.id)}
        ></Post>
      );
    });
  };

  // Render comments for the current post
  const renderComments = () => {
    if (loading) {
      return <p>Loading comments...</p>;
    }

    if (data?.me) {
      // Find the post based on the 'currentPost' state
      const post = data.me;

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
        loading={loading}
        data={data}
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
