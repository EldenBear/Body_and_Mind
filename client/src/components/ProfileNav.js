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
  const [gender, setGender] = React.useState('Male');
  const [activity, setActivity] = React.useState('Active');
  const [isReadOnly, setIsReadOnly] = React.useState(true);
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
    if (meData?.data.me.username === data?.user.username) {
      setIsReadOnly(false);
    }
  }, [loading, meData, data]);

  async function onSelectGender(event) {
    const newGender = event.target.value;

    try {
      const { data } = await addBio({
        variables: {
          bio: {
            gender: newGender,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }

    // Update the gender state
    setGender(newGender);
  }

  async function onSelectActivity(event) {
    const newActivity = event.target.value;

    try {
      const { data } = await addBio({
        variables: {
          bio: {
            activityLevel: newActivity,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }

    // Update the activity state
    setActivity(newActivity);
  }

  async function updateAvatarURL(newURL) {
    try {
      const { data } = await addBio({
        variables: {
          bio: {
            profilePicture: newURL,
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

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
                isDisabled={!isInEditMode}
                name='username'
                onSubmit={async (newValue) => {
                  try {
                    const { data } = await addBio({
                      variables: {
                        bio: {
                          username: newValue,
                        },
                      },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* <EditablePreview className='aboutMePadding' /> */}
                <EditableInput className='aboutMePadding' />
                {isInEditMode && <EditableControls />}
              </Editable>
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
                onSubmit={async (newValue) => {
                  try {
                    const { data } = await addBio({
                      variables: {
                        bio: {
                          aboutme: newValue,
                        },
                      },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {data && data.user && data.user.aboutme}
                {/* <EditablePreview className='aboutMePadding' /> */}
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
                  defaultValue={gender}
                  onChange={onSelectGender}
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Non-Binary'>Non-Binary</option>
                  <option value='Prefer not to say'>Prefer not to say</option>
                </Select>
              )}
              {!isInEditMode && data && data.user && data.user.gender && (
                <span>{data.user.gender}</span>
              )}
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
                onSubmit={async (newValue) => {
                  try {
                    const { data: ageInfo } = await addBio({
                      variables: {
                        bio: {
                          age: newValue,
                        },
                      },
                    });
                    console.log(`age: ${ageInfo}`);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {data && data.user && data.user.age}
                {/* <EditablePreview className='aboutMePadding' /> */}
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
                  defaultValue={activity}
                  onChange={onSelectActivity}
                >
                  <option value='Sedentary'>Sedentary</option>
                  <option value='Active'>Active</option>
                  <option value='Social Active'>Social Active</option>
                  <option value='Very Active'>Very Active</option>
                </Select>
              )}
              {!isInEditMode &&
                data &&
                data.user &&
                data.user.activityLevel && (
                  <span>{data.user.activityLevel}</span>
                )}
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
                onSubmit={async (newValue) => {
                  try {
                    const { data } = await addBio({
                      variables: {
                        bio: {
                          hobbies: newValue,
                        },
                      },
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {data && data.user && data.user.hobbies}
                {/* <EditablePreview className='aboutMePadding' /> */}
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
                <MenuItem onClick={() => onClickMenuItem('home')}>
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
                onClick={() => setIsInEditMode(false)}
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
                  src={data && data.user && data.user.profilePicture}
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
            <a href='home'>Body and Mind</a>
          </h1>
          <div className='aboutDiv'>
            <div className='profilePicDiv'>
              <WrapItem>
                <Avatar
                  size='2xl'
                  src={data && data.user && data.user.profilePicture}
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
                  onClick={() => setIsInEditMode(false)}
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
