import {Spacer, Button, Flex, Box} from '@chakra-ui/react';
import Card from '../Card';
import LikeButton from '../LikeButton';
import './Discover.css';

export default function Discover() {
    document.body.style.background = '#FCF4ED';
    return (
        <div className='App-header'>
          <LikeButton />
          <Card name='Maybelle Keller' age='22' intro='junior studying computer science @ UC Berkeley' 
          goal='looking for a SWE summer internship' aboutme1='3 years of experience in data science' 
          aboutme2='cookie lover' aboutme3='hungry'></Card>  
        </div>
      );
    }
