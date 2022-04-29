import React from 'react';
import './Signup.css';
import axios from 'axios';
import { useState } from "react";
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
import { FaUserAlt, FaLock, FaMailBulk, FaPaperclip, FaSmile } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Signup({ setToken }) {
    const [ email, setEmail ] = useState();
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();
    const [ bio, setBio ] = useState();
    const [ emoji, setEmoji ] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let config = {
            method: 'POST',
            url: 'http://localhost:4000/user/signup',
            data: {
                "username": username,
                "email": email,
                "password": password,
                "bio": bio,
                "profileurl": emoji,
                "goal": "k",
                "emojigoal": "asd",
                "age": 2,
                "aboutme1": "Asd",
                "aboutme2": "asdad",
                "aboutme3":"asfafa"
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
            justifyContent='center'
            alignItems='center'
            alignContent='center'
            paddingRight='18rem'
            paddingLeft='18rem'
            paddingTop='4rem'>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >   
                    <Image src={logo} alt='logo' />
                    <Heading>Sign up Now!</Heading>
                    <Box minW={{base: "90%", md: "468px"}}>
                        <form onSubmit={handleSubmit}>
                            <Stack
                                spacing={4}
                                p="4rem"
                                backgroundColor="white"
                                boxShadow="md"
                            >
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaMailBulk color="gray" />}
                                        />
                                        <Input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            onChange={event => setEmail(event.target.value)}/>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color="gray" />}
                                        />
                                        <Input
                                            placeholder="Username"
                                            onChange={event => setUsername(event.target.value)}
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
                                            type= "password"
                                            placeholder="Password"
                                            onChange={event => setPassword(event.target.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaPaperclip color="gray" />}
                                        />
                                        <Input size="lg"
                                            placeholder="Bio"
                                            onChange={event => setBio(event.target.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FaSmile color="gray" />}
                                        />
                                        <Input
                                            placeholder="Emoji"
                                            onChange={event => setEmoji(event.target.value)}
                                        />
                                    </InputGroup>
                                </FormControl>
                                <Button
                                    type="submit"
                                    variant="solid"
                                    width="full"
                                    colorScheme="orange"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Flex>
        </div>
        );
}