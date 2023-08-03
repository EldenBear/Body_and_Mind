import * as React from 'react';
import SupportModal from '../components/SupportModal';
import '../components/HomePage.css';
import Auth from '../utils/auth';
import {
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  WrapItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Navigation = (props) => {
  
  const onClickMenuItem = (path) => {
    if (path === '/') {
      Auth.logout();
      return;
    }
    window.location.href = path;
  };
  const renderNavigation = () => {
    if (props.loading || props.data?.me === undefined) {
      return;
    };

    if (props.isMobile) {
      return (
        <div className='mobileHeader'>
          <h1 className='mobileHomeHeader'>
            <a href='home'>Body & Mind</a>
          </h1>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem onClick={() => onClickMenuItem('home')}>Home</MenuItem>
              <MenuItem onClick={() => onClickMenuItem(`profile/${props.data.me.username}`)}>
                <a href='profile' className='menuItem'>
                  Profile
                </a>
              </MenuItem>
              <MenuItem onClick={() => onClickMenuItem('workouts')}>
                <a href='workouts' className='menuItem'>
                  Workouts
                </a>
              </MenuItem>
              <MenuItem onClick={() => onClickMenuItem('/')}>
                <a className='menuItem'>
                  Logout
                </a>
              </MenuItem>
              <MenuItem>
                <Link href='https://www.heart.org/'>
                  {' '}
                  &#128149; Donate &#128149;
                </Link>
              </MenuItem>
              <MenuItem>
                <SupportModal></SupportModal>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      );
    }
    return (
      <div class='sidenav'>
        <h1 className='homeHeader'>
          <a href='home'>Body and Mind</a>
        </h1>
        <div>
          <WrapItem>
            <Avatar size='2xl' src={props.avatarURL} className='avatarPhoto' />{' '}
          </WrapItem>
          <p className='userName'>{props.data.me.username}</p>
          <a href='home'>Home</a>
          <a href={`profile/${props.data.me.username}`}>Profile</a>
          <a href='workouts'>Workouts</a>
          <a onClick={() => onClickMenuItem('/')}>Logout</a>
        </div>
        <SupportModal></SupportModal>

        <Link href='https://www.heart.org/'> &#128149; Donate &#128149;</Link>
      </div>
    );
  };
  return renderNavigation();
};

export default Navigation;
