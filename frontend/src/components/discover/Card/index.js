import { Box, Text, Flex, Stack, Heading } from '@chakra-ui/react';
import React from 'react';
import Emoji from '../Emoji';
import SocialButton from '../SocialButton'
import './Card.css';


const Card = (props) => {
    return (
        <Box w='700px' h='650px' rounded='20px' overflow='hidden' bg='white' marginTop={5}>
            <Flex flexDirection={'column'} marginLeft={8}>
                <Box>
                    <Flex alignItems={'baseline'} justifyContent={'space-between'} marginTop={5}>
                        <Box>
                            <Heading size='30px' color='black'>{props.name}</Heading>
                            <Text fontSize={'md'} color='gray.600'>{props.intro}</Text>
                        </Box>
                        <Box paddingRight={9}>
                            <SocialButton />
                        </Box>
                    </Flex>
                </Box>
                <Stack direction='row' spacing={8} marginTop={6} justifyContent={'center'}>
                    {/* <Box w='300px' h='300px' bg='pink' rounded='20px'></Box> */}
                    <img src={props.profilepic} width='500px' height='10px' border-radius='5px'></img>
                    {/* <img src="https://news.berkeley.edu/wp-content/uploads/2016/09/Oskicupcake750.jpg" width='500px' height='300px' border-radius='5px'></img> */}
                    {/* <Box w='300px' h='300px' bg='pink' rounded='20px'></Box> */}
                </Stack>
                <Box display={'flex'} flexDirection={'column'} marginTop={5}>
                    <Box>
                        <Heading color='black' size='sm'>
                            Here's what I'm looking for:
                        </Heading>
                        <Box display={'flex'} alignItems='baseline'>
                            <Emoji symbol="🐜" label="ant" />
                            <Text fontSize={'20px'} color='gray.600' marginLeft={2}>{props.goal}</Text>
                        </Box>
                    </Box>
                    <Box marginTop={3}>
                        <Heading color='black' size='sm'>
                            About Me:
                        </Heading>
                        <Box display={'flex'} flexDirection={'column'} alignItems='baseline'>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Emoji symbol="🐑" label="sheep" />
                                <Text fontSize={'18px'} color='gray.600' marginLeft={2}>{props.aboutme1}</Text>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Emoji symbol="🐑" label="sheep" />
                                <Text fontSize={'18px'} color='gray.600' marginLeft={2}>{props.aboutme2}</Text>
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Emoji symbol="🐑" label="sheep" />
                                <Text fontSize={'18px'} color='gray.600' marginLeft={2}>{props.aboutme3}</Text>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box >
    )
}
export default Card