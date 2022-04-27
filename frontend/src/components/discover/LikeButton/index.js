import { Stack, Button} from '@chakra-ui/react';
import React from 'react';
import {FaThumbsDown} from 'react-icons/fa'
import {BsFillHeartFill} from 'react-icons/bs'

const LikeButton = () => {
    return(
        <Stack direction='row' spacing={8} marginTop={1}>
            <Button leftIcon={<FaThumbsDown />} color='#665C97' borderColor={'#665C97'} variant={'outline'}>
                Maybe Later
            </Button>
            <Button rightIcon={<BsFillHeartFill />} bgColor='#665C97' variant='solid'>
                Connect
            </Button>
        </Stack>
    );
  };

export default LikeButton