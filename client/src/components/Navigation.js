import * as React from "react";
import SupportModal from "../components/SupportModal";
import "../components/HomePage.css";
import {
  Avatar,
  Link,
  WrapItem,
} from "@chakra-ui/react";


const Navigation = () => {
  return (
    <div class="sidenav">
      <h1 className="homeHeader"><a href="home">Body & Mind</a></h1>
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
        <a href="workouts">Workouts</a>
        <a href="/">Logout</a>
      </div>
      <SupportModal></SupportModal>

      <Link href="https://www.heart.org/"> &#128149; Donate &#128149;</Link>

    </div>
  );
};

export default Navigation;