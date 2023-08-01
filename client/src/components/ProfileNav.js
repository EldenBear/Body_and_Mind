import * as React from "react";
import SupportModal from "./SupportModal";
import "../components/ProfilePage.css"
import {
    Avatar,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    WrapItem,
  } from "@chakra-ui/react";



const ProfileNav = () => {
    return (
        <div class="profileSidenav">
         <div className="profilePic">
         <h1 className="homeHeader"><a href="home">Body & Mind</a></h1>
         <div className="aboutDiv">
         <WrapItem>
          <Avatar
            size="2xl"
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
            className="avatarPhoto"
          />{" "}
        </WrapItem>
        <div className="aboutBio">
        <p className="bio">Username: John Smith</p>
        <p className="bio">About Me: rfgfdgfdgfd</p>
        <p className="bio">Gender: Male</p>
        <p className="bio">Age: 28</p>
        <p className="bio">Activity Level: Active</p>
        <p className="bio">Hobbies: Gaming</p>
        </div>
         </div>
         </div>
         <div className="profileNavLinks">
            <a href="home">Home</a>
            <a href="profile">Profile</a>
            <a href="workouts">Workouts</a>
            <a href="/">Logout</a>
         </div>
         <SupportModal></SupportModal>
        </div>
    )
};


export default ProfileNav;