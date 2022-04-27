import {Spacer, Button, Flex, Box} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import LikeButton from '../LikeButton';
import './Discover.css';

var allUsers;

export default function Discover() {
    document.body.style.background = '#FCF4ED';

    const [matches, setMatches] = useState({});

    useEffect(() => {
      getPotentialMatch();
    }, []);

    const getPotentialMatch = () => {
      var axios = require('axios');
      var data = '';

      var config = {
        method: 'get',
        url: 'http://localhost:4000/allusers/access',
        data: data
      };

      axios(config)
      .then(function (response) {
        allUsers = response.data
        console.log(allUsers);
      })
      .catch(function (error) {
        console.log(error);
      });
      setMatches(allUsers);
    }

    return (
        <div className='App-header'>
          <LikeButton />
          <Card name='Maybelle Keller' age='22' intro='junior studying computer science @ UC Berkeley' 
          goal='looking for a SWE summer internship' aboutme1='3 years of experience in data science' 
          aboutme2='cookie lover' aboutme3='hungry'></Card>  
        </div>
      );
    }
