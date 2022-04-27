import {Box, IconButton} from '@chakra-ui/react';
import React from 'react';
import {
    FaLinkedin,
    FaGithub
    } from 'react-icons/fa'
import {CgWebsite} from 'react-icons/cg'


const SocialButton = () => {
    return(
        <Box>
            <IconButton colorScheme='blue' icon={<FaLinkedin />} /> 
            &nbsp;&nbsp;
            <IconButton bg={'#171515'} icon={<FaGithub />}/>
            &nbsp;&nbsp;
            <IconButton colorScheme={'pink'} icon={<CgWebsite />} /> 
        </Box>
    );
  };

export default SocialButton 