import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import './navbar.css'
import logo from './ant_logo.png'

const Links = [
                {
                  text: 'Home',
                  url: '/'
                },
                {
                  text: 'Discover',
                  url: '/discover'
                },
                {
                  text: 'Matches',
                  url: '/messages'
                },
                {
                  text: 'About Us',
                  url: '/about'},
                {
                  text: 'Login',
                  url: 'login'
                },
                {
                  text: 'Signup',
                  url: 'signup'
                }
                ];

const NavLink = ({ children }) => (
  <Link
    px={4}
    py={1}
    rounded={'md'}
    _hover={{
        color:'white',
      textDecoration: 'none',
      bg: useColorModeValue('#665C97', '#665C97'),
    }}
    href={children.url}>
    {children.text}
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('#F7DDC8', '#F7DDC8')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <img src={logo} className={'logo'}/>
              <Text>
                Antz
              </Text>
              </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                {/* <Link to="/profile">
                  <MenuItem>Edit Profile</MenuItem>
                </Link> */}
                {/* <MenuItem>Link 2</MenuItem> */}
                <a href="http://localhost:3000/profile">
                  <MenuItem>Edit Profile</MenuItem>
                </a>
                <MenuDivider />
                <MenuItem>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}