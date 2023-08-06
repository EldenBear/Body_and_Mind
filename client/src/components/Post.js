import * as React from "react";
import "./Post.css";
import {
  AvatarGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Text,
  Image,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";

const Post = (props) => {
  function onClickUserName() {
    window.location.href = `/profile/${props.name}`;
  }
  return (
    <Card maxW="md" className="post">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar src={props.profilePicture} />

            <Box>
              <Heading size="md" onClick={onClickUserName} className="userTitle">{props.name}</Heading>
              <Text fontSize="sm">{props.userTitle}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.postText}</Text>
      </CardBody>
     {props.imageURL &&
     <Image
        objectFit="cover"
        src={props.imageURL}
        alt="Chakra UI"
      />}

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" onClick={props.onClickComment}>
          &#129504; Comment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
