import React from 'react';
import NavBar from '../../navbar/NavBar';
import './Login.css';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Image,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
  } from "@chakra-ui/react";
import logo from './ant_logo.png'
import { useState } from "react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login(props) {
    return (
        <div>
            <Flex
            justifyContent='center'
            alignItems='center'
            alignContent='center'
            paddingRight='18rem'
            paddingLeft='18rem'
            paddingTop='8rem'>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >   
                    <Image src={logo} alt='logo' />
                    <Heading>Welcome!</Heading>
                    <Box minW={{base: "90%", md: "468px"}}>
                        <form>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="white"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray" />}
                                        />
                                        <Input type="email" placeholder="email address" />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaLock color="gray" />}
                                        />
                                        <Input
                                            placeholder="Password"
                                        />
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="solid"
                                    width="full"
                                    colorScheme="orange"
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </div>
        );
}