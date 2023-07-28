import * as React from "react";
import Workout from "../components/Workout";
import "../components/WorkoutPage.css";
import {
  Avatar,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  WrapItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const WorkoutPage = () => {
  return (
    <>
      <div className="sidenav">
        <h1 className="homeHeader">Body & Mind</h1>
        <div>
          <WrapItem>
            <Avatar
              size="2xl"
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              className="avatarPhoto"
            />{" "}
          </WrapItem>
          <p className="userName">John Smith</p>
          <a href="home">Home</a>
          <a href="profile">Profile</a>
          <a href="logout">Logout</a>
        </div>
        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
        >
          &#128149; Donate
        </Button>
      </div>

      <div className="main">
        <InputGroup className="inputBox">
          <Input type="tel" placeholder="Search for an exercise!" />
          <InputRightElement>
            <SearchIcon color="gray.300" className="searchIcon"/>
          </InputRightElement>
        </InputGroup>
        <Workout
          name="Incline Hammer Curls"
          type="strength"
          muscle="biceps"
          equipment="dumbbell"
          difficulty="beginner"
          instructions="Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
        ></Workout>
        <Workout
          name="Incline Hammer Curls"
          type="strength"
          muscle="biceps"
          equipment="dumbbell"
          difficulty="beginner"
          instructions="Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
        ></Workout>
        <Workout
          name="Incline Hammer Curls"
          type="strength"
          muscle="biceps"
          equipment="dumbbell"
          difficulty="beginner"
          instructions="Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
        ></Workout>
      </div>
    </>
  );
};

export default WorkoutPage;
