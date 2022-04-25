import NavBar from '../navbar/NavBar';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
  FormHelperText,
  Spacer,
  Select,
  InputGroup,
  InputLeftAddon,
  Flex,
  Textarea,
  Box,
  Image,
  Heading,
  Text,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';


export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} margin='0'>
        <div>
          <NavBar />
        </div>
        <Flex 
        direction="row"
        padding='1rem'
        justifyContent="center"
        gap="50px"
        >
          <Flex 
          direction="column"
          margin="1rem"
          gap="30px"
          >
            <Flex 
            direction="column"
            bg='white'
            padding='1rem'
            gap="10px"
            borderRadius='lg'
            >
              <Heading>Current Profile</Heading>
              <Text>How you appear to others.</Text>
              <Box boxSize='sm'
              borderWidth="1px">
                insert card
              </Box>
            </Flex>

            <Flex 
            direction="column"
            bg='white'
            padding='1rem'
            gap="10px"
            borderRadius='lg'
            >
              <Heading>Edit profile photos</Heading>
              <Flex 
              direction="row"
              paddingLeft='1rem'
              paddingRight='1rem'
              paddingTop='1rem'
              gap="1rem"
              justifyContent="space-around"
              >
                <Box boxSize='100px'
                borderWidth="1px">
                  <Image src='...' alt='Picture 1' fallbackSrc='https://images.squarespace-cdn.com/content/v1/56e19ec5e3214084d69d4b7d/1473524254173-BGV5W2Z5FM46F67SYZHJ/PlusIcon_Small_Gray.png'/>
                </Box>
                <Box boxSize='100px'
                borderWidth="1px">
                  <Image src='...' alt='Picture 2' fallbackSrc='https://images.squarespace-cdn.com/content/v1/56e19ec5e3214084d69d4b7d/1473524254173-BGV5W2Z5FM46F67SYZHJ/PlusIcon_Small_Gray.png'/>
                </Box>
                <Box boxSize='100px'
                borderWidth="1px">
                  <Image src='...' alt='Picture 3' fallbackSrc='https://images.squarespace-cdn.com/content/v1/56e19ec5e3214084d69d4b7d/1473524254173-BGV5W2Z5FM46F67SYZHJ/PlusIcon_Small_Gray.png'/>
                </Box>
              </Flex>
              <Flex 
              direction="row"
              paddingLeft='1rem'
              paddingRight='1rem'
              gap="1rem"
              justifyContent="space-around"
              >
                <Button variant='outline' color='#665C97' borderColor='#665C97' >Change</Button>
                <Button variant='outline' color='#665C97' borderColor='#665C97' >Change</Button>
                <Button variant='outline' color='#665C97' borderColor='#665C97' >Change</Button>
              </Flex>
              <Flex 
              direction="row"
              paddingLeft='1rem'
              paddingRight='1rem'
              paddingTop='1rem'
              gap="1rem"
              justifyContent="space-around"
              >
                <Box boxSize='100px'
                borderWidth="1px">
                  <Image src='...' alt='Picture 4' fallbackSrc='https://images.squarespace-cdn.com/content/v1/56e19ec5e3214084d69d4b7d/1473524254173-BGV5W2Z5FM46F67SYZHJ/PlusIcon_Small_Gray.png'/>
                </Box>
                <Box boxSize='100px'
                borderWidth="1px">
                  <Image src='...' alt='Picture 5' fallbackSrc='https://images.squarespace-cdn.com/content/v1/56e19ec5e3214084d69d4b7d/1473524254173-BGV5W2Z5FM46F67SYZHJ/PlusIcon_Small_Gray.png'/>
                </Box>
              </Flex>
              <Flex 
              direction="row"
              paddingLeft='1rem'
              paddingRight='1rem'
              paddingBottom='1rem'
              gap="1rem"
              justifyContent="space-around"
              >
                <Button variant='outline' color='#665C97' borderColor='#665C97' >Change</Button>
                <Button variant='outline' color='#665C97' borderColor='#665C97' >Change</Button>
              </Flex>
            </Flex>

          </Flex>

          <Flex 
          direction="column"
          bg='white'
          padding='1rem'
          borderRadius='lg'
          gap='10px'
          >
            <Heading>Edit profile</Heading>
            <Stack isInline spacing={10} mb={5}>
              <FormControl 
              isInvalid={errors.name}
              width="50%"
              >
                <FormLabel htmlFor='name'>First Name</FormLabel>
                <Input
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  id='name'
                  placeholder='current'
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormHelperText>This will be shown on your profile.</FormHelperText>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl 
              isInvalid={errors.name}
              width="50%"
              >
                <FormLabel htmlFor='name'>Last Name</FormLabel>
                <Input
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  id='name'
                  placeholder='current'
                  {...register('name', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormHelperText>This will be shown on your profile.</FormHelperText>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <Stack isInline spacing={10} mb={5}>
              <FormControl 
              isInvalid={errors.name}
              width="50%"
              >
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  id='username'
                  placeholder='current'
                  {...register('username', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl 
              isInvalid={errors.name}
              width="50%"
              >
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  id='email'
                  type='email'
                  placeholder='current'
                  {...register('email', {
                    required: 'This is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormHelperText>We'll never share your email without your permission.</FormHelperText>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>

            <Spacer />

            <Stack spacing={10} mb={5}>
              <FormControl>
                  <FormLabel htmlFor='intro'>Introduce yourself!</FormLabel>
                  <Input
                    bg='white'
                    focusBorderColor='#ADDDDF'
                    id='text'
                    placeholder='current'
                  />
                  <FormHelperText>E.g. Junior Computer Science major @ UC Berkeley</FormHelperText>
                </FormControl>
            </Stack>

            <Stack spacing={10} mb={5}>
              <FormControl>
                <FormLabel htmlFor='goal'>Looking for...</FormLabel>
                <Input
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  id='text'
                  placeholder='current'
                />
                <FormHelperText>E.g. an SWE summer internship</FormHelperText>
              </FormControl>
            </Stack>

            <Spacer />

            <Stack spacing={10} mb={5}>
              <FormControl>
                <FormLabel htmlFor='bio'>More about you</FormLabel>
                <Textarea 
                bg='white'
                focusBorderColor='#ADDDDF'
                placeholder='current' />
                <FormHelperText>Your interests, hobbies, majors...</FormHelperText>
              </FormControl>
            </Stack>

            <Spacer />

            <Stack isInline spacing={10} mb={5}>
              <FormControl>
                <FormLabel htmlFor='link'>Add social media</FormLabel>
                <InputGroup>
                  <InputLeftAddon children='https://' bg='#ADDDDF'/>
                  <Input 
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  placeholder='website' />
                </InputGroup>
              </FormControl>

              <FormControl width="30%">
                <FormLabel htmlFor='none'>Type</FormLabel>
                <Select placeholder='Select option' bg='#ADDDDF'>
                  <option value='linkedin'>LinkedIn</option>
                  <option value='instagram'>Instagram</option>
                  <option value='facebook'>Facebook</option>
                  <option value='otherlink'>Other (website etc.)</option>
                </Select>
              </FormControl>
            </Stack>

            <Stack isInline spacing={10} mb={5}>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon children='https://' bg='#ADDDDF'/>
                  <Input 
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  placeholder='website' />
                </InputGroup>
              </FormControl>

              <FormControl width="30%">
                <Select placeholder='Select option' bg='#ADDDDF'>
                  <option value='linkedin'>LinkedIn</option>
                  <option value='instagram'>Instagram</option>
                  <option value='facebook'>Facebook</option>
                  <option value='otherlink'>Other (website etc.)</option>
                </Select>
              </FormControl>
            </Stack>

            <Stack isInline spacing={10} mb={5}>
              <FormControl>
                <InputGroup>
                  <InputLeftAddon children='https://' bg='#ADDDDF'/>
                  <Input 
                  bg='white'
                  focusBorderColor='#ADDDDF'
                  placeholder='website' />
                </InputGroup>
              </FormControl>

              <FormControl width="30%">
                <Select placeholder='Select option' bg='#ADDDDF'>
                  <option value='linkedin'>LinkedIn</option>
                  <option value='instagram'>Instagram</option>
                  <option value='facebook'>Facebook</option>
                  <option value='otherlink'>Other (website etc.)</option>
                </Select>
              </FormControl>
            </Stack>

          
            <Button mt={4} color='white' bgColor="#665C97" isLoading={isSubmitting} type='submit'>
              Save
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  )
}