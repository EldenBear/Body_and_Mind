import * as React from "react";
import "./Post.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Text,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";

const Comment = (props) => {
  return (
    <Card maxW="md" className="post">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="md">{props.name}</Heading>
              <Text fontSize="sm">{props.userTitle}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{props.postText}</Text>
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost">
          &#128170; Like
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Comment;
