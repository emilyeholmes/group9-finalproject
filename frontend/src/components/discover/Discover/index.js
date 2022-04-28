import { Spacer, Button, Flex, Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../Card';
import LikeButton from '../LikeButton';
import './Discover.css';

var allUsers;

export default function Discover() {
  document.body.style.background = '#FCF4ED';

  const [matches, setMatches] = useState({});

  const [randomProfile, setRandomProfile] = useState({});

  const [alreadySeen, setAlreadySeen] = useState([]);

  const [buttonPressed, setButtonPressed] = useState(0);

  // const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getPotentialMatch();
  }, [buttonPressed]);

  const buttonPress = () => {
    setButtonPressed(buttonPressed + 1);
  }

  function getRandom(allUsers) {
    const keys = Object.keys(allUsers);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    const randomProfile = allUsers[randKey];
    return randomProfile;
  }

  // const handleClick = () => {
  //   setRandomProfile(getRandom);
  // }

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
        allUsers = response.data;
        // const keys = Object.keys(allUsers);
        // const randIndex = Math.floor(Math.random() * keys.length);
        // const randKey = keys[randIndex];
        const randomProfile = getRandom(allUsers);
        // setAllUsers(response.data);
        const randProfile = getRandom(allUsers);
        if (alreadySeen.includes(randProfile)) {
          if (alreadySeen.length === allUsers.length) {
            setAlreadySeen([]);
          }
          randProfile = getRandom(allUsers);
        }
        setRandomProfile(randProfile);
        setAlreadySeen(alreadySeen.push(randomProfile));
        console.log(randomProfile);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMatches(allUsers);
  }

  return (
    <div className='App-header'>
      <LikeButton func={() => { setRandomProfile(getRandom(allUsers)) }} />
      < Card name={randomProfile.username} age='22' intro={randomProfile.bio}
        goal='looking for a SWE summer internship' aboutme1='3 years of experience in data science'
        aboutme2='cookie lover' aboutme3='hungry' profilepic="https://news.berkeley.edu/wp-content/uploads/2016/09/Oskicupcake750.jpg"></Card>
    </div>
  );
}
