import React from 'react';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import {
    Flex,
    Text,
    Heading,
} from '@chakra-ui/react'


export default function About() {
    return (
      <div>
        <Flex
        justifyContent='center'
        alignItems='center'
        alignContent='center'
        paddingRight='18rem'
        paddingLeft='18rem'
        paddingTop='10rem'>
            <Flex
            bgColor='white'
            padding='2rem'
            gap='1rem'
            justifyContent='left'
            direction='column'
            borderRadius='lg'>
                <Heading>About Us</Heading>
                <Text fontSize='lg'>We are a group of UC Berkeley students and aspiring web developers.</Text>
                <Text fontSize='lg'>Berkeley's networks are vast and complex, and sometimes they can be intimidating to navigate on your own. Nerty is a project about connection in a disconnected world; we hope to connect and connect with the people around us, through common interests and goals, academic or otherwise.</Text>
                <Text fontSize='lg' fontWeight='bold' color='#665C97'>We hope that with Nerty, everyone can be a little less lonely in their own pursuits.</Text>
            </Flex>
        </Flex>
      </div>
    );
}