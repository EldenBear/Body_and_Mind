import * as React from "react";
import SupportModal from "../components/SupportModal";
import "../components/HomePage.css";
import {
  Avatar,
  Button,
  WrapItem,
} from "@chakra-ui/react";

const Navigation = () => {
  return (
    <div class="sidenav">
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
        <a href="profile">Profile</a>
        <a href="workouts">Workouts</a>
        <a href="logout">Logout</a>
      </div>
      <SupportModal></SupportModal>
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
  );
};

export default Navigation;