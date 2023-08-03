import * as React from "react";
import Workout from "../components/Workout";
import Navigation from "../components/Navigation";
import "../components/WorkoutPage.css";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import {
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";


const WorkoutPage = () => {
  const { loading, data } = useQuery(GET_ME);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 900);
  const [avatarURL, setAvatarURL] = React.useState('https://bit.ly/broken-link');
  const [workouts, setWorkouts] = React.useState([]);
  const [search, setSearch] = React.useState("");

  React.useEffect( () => {
    if (loading) {
      return
    }
    if (data?.me === undefined) {
      window.location.href = "/";
    }
  },[loading, data?.me])

  React.useEffect( () => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }
    window.addEventListener('resize', handleResize);
  });

    async function getworkouts (muscle){
      const response = await fetch("https://api.api-ninjas.com/v1/exercises?muscle=" + muscle, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-Api-Key': process.env.REACT_APP_API_KEY,
        },
      });
      const result = await response.json();
      setWorkouts(result);
    }
    function onSearchWorkouts(){
      getworkouts(search);
    }

    function workoutSearch(e) {
      setSearch(e.target.value)
    };

    const renderWorkouts = () => {
      if (workouts.length === 0 ) {
        return (
          <div>
            No results found!
          </div>
        )
      }
      return workouts.map(workout => {
        return(
          <Workout
          name= {workout.name}
          type= {workout.type}
          muscle= {workout.muscle}
          equipment= {workout.equipment}
          difficulty= {workout.difficulty}
          instructions= {workout.instructions}
        ></Workout>
        )
      })
    }

  return (
    <>
    <Navigation isMobile={isMobile} avatarURL={avatarURL} loading={loading} data={data}></Navigation>
      <div className="main">
        <InputGroup className="inputBox">
          <Input type="tel" placeholder="Search for an exercise!" onChange={workoutSearch}/>
          <InputRightElement>
            <SearchIcon color="gray.300" className="searchIcon" onClick={onSearchWorkouts}/>
          </InputRightElement>
        </InputGroup>
        {renderWorkouts()}
      </div>
    </>
  );
};

export default WorkoutPage;
