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
import axios from 'axios';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let config = {
            method: 'POST',
            url: 'http://localhost:4000/user/login',
            data: {
                email: email,
                password: password
            }
        }
        await axios(config)
        .then((response) => {
            setToken(response.data.token);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <Flex
            flexDirection="column"
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
                        <form onSubmit={handleSubmit}>
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
                                        <Input 
                                            type="email" 
                                            placeholder="email address"
                                            onChange={event => setEmail(event.target.value)} 
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaLock color="gray" />}
                                        />
                                        <Input 
                                            type={showPassword ? "text" : "password"}
                                            placeholder="password"
                                            onChange={event => setPassword(event.target.value)} 
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={() => {setShowPassword(!showPassword)}}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
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
                <Box>
                    Don't have an account?{" "}
                    <Link color="orange.500" href="/signup">
                    Sign Up
                    </Link>
                </Box>
            </Flex>
        </div>
        );
}
