import * as React from "react";
import Workout from "../components/Workout";
import Navigation from "../components/Navigation";
import "../components/WorkoutPage.css";
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const WorkoutPage = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);
  const [avatarURL, setAvatarURL] = React.useState('https://bit.ly/broken-link');

  React.useEffect( () => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  })
  return (
    <>
    <Navigation isMobile={isMobile} avatarURL={avatarURL}></Navigation>
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
