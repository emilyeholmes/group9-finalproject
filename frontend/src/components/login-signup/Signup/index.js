import React from 'react';
import './Signup.css';
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

export default function Signup(props) {
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
                        <form>
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
                                        <Input type="email" placeholder="Email Address" />
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
                                            placeholder="Password"
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