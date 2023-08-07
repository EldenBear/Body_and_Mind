import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { ADD_BIO } from '../utils/mutations';
import SupportModal from './SupportModal';
import ProfilePicModal from './ProfilePicModal';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';
import '../components/ProfilePage.css';
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
  EditablePreview,
  EditableTextarea,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Stack,
  StackDivider,
  Text,
  useEditableControls,
  WrapItem,
} from '@chakra-ui/react';
import {
  CloseIcon,
  CheckIcon,
  EditIcon,
  HamburgerIcon,
} from '@chakra-ui/icons';

const ProfileNav = (props) => {
  const [isInEditMode, setIsInEditMode] = React.useState(false);
  const [gender, setGender] = React.useState(null);
  const [activity, setActivity] = React.useState(null);
  const [aboutMe, setAboutMe] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [hobbies, setHobbies] = React.useState(null);
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const meData = useQuery(GET_ME);

  const [addBio] = useMutation(ADD_BIO, {
    refetchQueries: [{ query: QUERY_USER }],
  });

  const { loading, data } = useQuery(QUERY_USER, {
    // pass URL parameter
    variables: { username: props.username },
  });

  React.useEffect(() => {
    if (loading || meData === undefined) {
      return;
    }

    if (meData?.data?.me?.username === data?.user.username) {
      setIsReadOnly(false);
    }

    if (data.user) {
      setGender(data?.user.gender);
      setActivity(data?.user.activityLevel);
      setProfilePicture(data?.user.profilePicture);
      setHobbies(data?.user.hobbies);
      setAboutMe(data?.user.aboutme);
      setAge(data?.user.age);
    }
  }, [loading, meData, data]);

  function onSelectGender(event) {
    const newGender = event.target.value;
    setGender(newGender);
  }

  function onSelectActivity(event) {
    const newActivity = event.target.value;
    setActivity(newActivity);
  }

  function updateAvatarURL(newURL) {
    setProfilePicture(newURL);
  }

  const saveChanges = async () => {
    try {
      await addBio({
        variables: {
          bio: {
            aboutme: aboutMe,
            gender: gender,
            activityLevel: activity,
            age: age,
            hobbies: hobbies,
            profilePicture: profilePicture,
          },
        },
        onCompleted: () => setIsInEditMode(false),
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const onClickMenuItem = (path) => {
    if (path === '/') {
      Auth.logout();
      return;
    }
    window.location.href = path;
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  const renderProfileInfo = () => {
    return (
      <Card>
        <CardHeader>
          <Heading size='md'>Profile</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Username
              </Heading>
              <Text pt='2' fontSize='sm'>
                {data && data.user && data.user.username}
              </Text>
              <Editable
                textAlign='center'
                fontSize='2xl'
                isPreviewFocusable={false}
                isDisabled={true}
                name='username'
              ></Editable>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                About Me
              </Heading>
              <Editable
                textAlign='center'
                fontSize='2xl'
                isPreviewFocusable={false}
                isDisabled={!isInEditMode}
                className='aboutMe'
                name='aboutme'
                value={aboutMe ?? ''}
                onChange={(newValue) => setAboutMe(newValue)}
              >
                <EditablePreview className='aboutMePadding' />
                <EditableTextarea className='aboutMePadding' />
                {isInEditMode && <EditableControls />}
              </Editable>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Gender
              </Heading>
              {isInEditMode && (
                <Select
                  name='gender'
                  defaultValue={null}
                  value={gender}
                  onChange={onSelectGender}
                >
                  <option value={null}>Select...</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Non-Binary'>Non-Binary</option>
                  <option value='Prefer not to say'>Prefer not to say</option>
                </Select>
              )}
              {!isInEditMode && <span>{gender}</span>}
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Age
              </Heading>
              <Editable
                name='age'
                textAlign='center'
                fontSize='2xl'
                isPreviewFocusable={false}
                isDisabled={!isInEditMode}
                className='aboutMe'
                value={age ?? ''}
                onChange={(newValue) => setAge(newValue)}
              >
                <EditablePreview className='aboutMePadding' />
                <EditableInput className='aboutMePadding' />
                {isInEditMode && <EditableControls />}
              </Editable>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Activity Level
              </Heading>
              {isInEditMode && (
                <Select
                  name='activityLevel'
                  defaultValue={null}
                  value={activity}
                  onChange={onSelectActivity}
                >
                  <option value={null}>Select...</option>
                  <option value='Sedentary'>Sedentary</option>
                  <option value='Active'>Active</option>
                  <option value='Social Active'>Social Active</option>
                  <option value='Very Active'>Very Active</option>
                </Select>
              )}
              {!isInEditMode && <span>{activity}</span>}
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Hobbies
              </Heading>
              <Editable
                name='hobbies'
                textAlign='center'
                fontSize='2xl'
                isPreviewFocusable={false}
                isDisabled={!isInEditMode}
                className='aboutMe'
                value={hobbies ?? ''}
                onChange={(newValue) => setHobbies(newValue)}
              >
                <EditablePreview className='aboutMePadding' />
                <EditableTextarea className='aboutMePadding' />
                {isInEditMode && <EditableControls />}
              </Editable>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  };

  const renderNavigation = () => {
    if (props.isMobile) {
      return (
        <div>
          <div className='mobileHeader'>
            <h1 className='mobileHomeHeader'>
              <a href='/home'>Body & Mind</a>
            </h1>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
              />
              <MenuList>
                <MenuItem onClick={() => onClickMenuItem('/home')}>
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    onClickMenuItem(
                      `/profile/${meData?.data?.me?.username ?? ''}`
                    )
                  }
                >
                  <a className='menuItem'>Profile</a>
                </MenuItem>
                <MenuItem onClick={() => onClickMenuItem('workouts')}>
                  <a href='/workouts' className='menuItem'>
                    Workouts
                  </a>
                </MenuItem>
                <MenuItem onClick={() => onClickMenuItem('/')}>
                  <a className='menuItem'>Logout</a>
                </MenuItem>
                <MenuItem>
                  <SupportModal></SupportModal>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div className='mobileProfileBody'>
            {isInEditMode && (
              <Button
                colorScheme='blue'
                className='editButtons'
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            )}
            {!isInEditMode && !isReadOnly && (
              <Button
                colorScheme='blue'
                className='editButtons'
                onClick={() => setIsInEditMode(true)}
              >
                Edit
              </Button>
            )}
            <div className='profilePicDiv'>
              <WrapItem>
                <Avatar
                  size='2xl'
                  src={profilePicture}
                  className='profileAvatarPhoto'
                />{' '}
              </WrapItem>
              {isInEditMode && <ProfilePicModal></ProfilePicModal>}
              <div className='mobileProfileInfo'>{renderProfileInfo()}</div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div class='profileSidenav'>
        <div className='profilePic'>
          <h1 className='profileHomeHeader'>
            <a href='/home'>Body and Mind</a>
          </h1>
          <div className='aboutDiv'>
            <div className='profilePicDiv'>
              <WrapItem>
                <Avatar
                  size='2xl'
                  src={profilePicture}
                  className='profileAvatarPhoto'
                />{' '}
              </WrapItem>
              {isInEditMode && (
                <ProfilePicModal
                  updateAvatarURL={updateAvatarURL}
                ></ProfilePicModal>
              )}
            </div>
            <div className='aboutBio'>
              {renderProfileInfo()}
              {isInEditMode && (
                <Button
                  colorScheme='blue'
                  className='editButtons'
                  onClick={saveChanges}
                >
                  Save Changes
                </Button>
              )}
              {!isInEditMode && !isReadOnly && (
                <Button
                  colorScheme='blue'
                  className='editButtons'
                  onClick={() => setIsInEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className='profileNavLinks'>
          <a href='/home'>Home</a>
          <a href={`/profile/${meData?.data?.me?.username ?? ''}`}>Profile</a>
          <a href='/workouts'>Workouts</a>
          <a onClick={() => onClickMenuItem('/')}>Logout</a>
        </div>
        <SupportModal></SupportModal>
      </div>
    );
  };

  return renderNavigation();
};

export default ProfileNav;
