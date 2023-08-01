import * as React from "react";
import SupportModal from "./SupportModal";
import ProfilePicModal from "./ProfilePicModal";
import "../components/ProfilePage.css";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Select,
  Stack,
  StackDivider,
  Text,
  useEditableControls,
  WrapItem,
} from "@chakra-ui/react";
import { CloseIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";

const ProfileNav = () => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);
  
  const [gender, setGender] = React.useState("Male");
  const [activity, setActivity] = React.useState(false);
  const [avatarURL, setAvatarURL] = React.useState('https://bit.ly/broken-link')
  function onSelectGender(e) {
    setGender(e.target.value);
  };

  function onSelectActivity(e) {
    setActivity(e.target.value);
  };

  function updateAvatarURL(newURL) {
    setAvatarURL(newURL);
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <div class="profileSidenav">
      <div className="profilePic">
        <h1 className="homeHeader">
          <a href="home">Body & Mind</a>
        </h1>
        <div className="aboutDiv">
          <div className="profilePicDiv">
          <WrapItem>
            <Avatar
              size="2xl"
              src={avatarURL}
              className="profileAvatarPhoto"
            />{" "}
          </WrapItem>
          { isInEditMode &&
            <ProfilePicModal updateAvatarURL={updateAvatarURL}></ProfilePicModal>}
          </div>
          <div className="aboutBio">
            <Card>
              <CardHeader>
                <Heading size="md">Profile</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Username
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      John Smith
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      About Me
                    </Heading>
                    <Editable
                      textAlign="center"
                      defaultValue="I'm a person"
                      fontSize="2xl"
                      isPreviewFocusable={false}
                      isDisabled={!isInEditMode}
                      className="aboutMe"
                    >
                      <EditablePreview className="aboutMePadding" />
                      <EditableTextarea className="aboutMePadding" />
                      { isInEditMode &&
                        <EditableControls />}
                    </Editable>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Gender
                    </Heading>
                    { isInEditMode &&
                      <Select onChange={onSelectGender} defaultValue={gender}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </Select>}
                    { !isInEditMode &&
                        <span>{gender}</span>
                    }
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Age
                    </Heading>
                    <Editable
                      textAlign="center"
                      defaultValue="18"
                      fontSize="2xl"
                      isPreviewFocusable={false}
                      isDisabled = {!isInEditMode}
                      className="aboutMe"
                    >
                      <EditablePreview className="aboutMePadding" />
                      <EditableInput className="aboutMePadding" />
                      { isInEditMode &&
                        <EditableControls />}
                    </Editable>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Activity Level
                    </Heading>
                    { isInEditMode &&
                      <Select onChange={onSelectActivity} defaultValue={activity}>
                      <option value="Sedentary">Sedentary</option>
                      <option value="Active">Active</option>
                      <option value="Social Active">Social Active</option>
                      <option value="Very Active">Very Active</option>
                    </Select>}
                    { !isInEditMode &&
                      <span>{activity}</span>
                    }
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Hobbies
                    </Heading>
                    <Editable
                      textAlign="center"
                      defaultValue="Hobby"
                      fontSize="2xl"
                      isPreviewFocusable={false}
                      isDisabled = {!isInEditMode}
                      className="aboutMe"
                    >
                      <EditablePreview className="aboutMePadding" />
                      <EditableTextarea className="aboutMePadding" />
                      { isInEditMode &&
                        <EditableControls />}
                    </Editable>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
            {isInEditMode && (
              <Button colorScheme="blue" className="editButtons" onClick={() => setIsInEditMode(false)}>
                Save Changes
              </Button>
            )}
            {!isInEditMode && (
              <Button colorScheme="blue" className="editButtons" onClick={() => setIsInEditMode(true)}>
                Edit
              </Button>
            )}
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
  );
};

export default ProfileNav;