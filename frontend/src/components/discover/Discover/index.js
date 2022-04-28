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

  const [match, setMatch] = useState(false);

  // const [buttonPressed, setButtonPressed] = useState(0);

  // const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getPotentialMatch();
  }, []);

  function checkMatch() {
    var axios = require('axios');
    var data = '';
    var headers = {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTJmNDFhODEzN2NkNzQ4ZTVlZjI0In0sImlhdCI6MTY1MTEyNjA4MSwiZXhwIjoxNjUxMTM2MDgxfQ.K8EVd31E7NPyPsxA9Kug_z3JeKNzHkBXURyc6lpnvFM'
    }

    var config = {
      method: 'get',
      url: 'http://localhost:4000/user/profile',
      data: data
    };

    axios(config)
      .then(function (response) {
        var userProfile = response.data;
        if (userProfile.potentialmatches.includes(randomProfile.username)) {
          if (randomProfile.potentialmatches.includes(userProfile.username)) {
            setMatch(true);
            window.alert("You've got a match!")
          }
        }
      })
  }

  function getRandom(allUsers) {
    // if (bool) {
    //   var axios = require('axios');
    //   var data = {
    //     otherusername: randomProfile.username
    //   };
    //   var headers = {
    //     'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTJmNDFhODEzN2NkNzQ4ZTVlZjI0In0sImlhdCI6MTY1MTEyNjA4MSwiZXhwIjoxNjUxMTM2MDgxfQ.K8EVd31E7NPyPsxA9Kug_z3JeKNzHkBXURyc6lpnvFM'
    //   }

    //   var config = {
    //     method: 'post',
    //     url: 'http://localhost:4000/user/potentialmatches',
    //     data: data
    //   };

    //   axios(config)
    //     .catch(function (error) {
    //       console.log(error);
    //     });

    //   checkMatch();
    // }
    const keys = Object.keys(allUsers);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    const randProfile = allUsers[randKey];
    return randProfile;
  }

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
      <LikeButton func1={() => { setRandomProfile(getRandom(allUsers)) }} />
      < Card name={randomProfile.username} age='22' intro={randomProfile.bio}
        goal='looking for a SWE summer internship' aboutme1='3 years of experience in data science'
        aboutme2='cookie lover' aboutme3='hungry' profilepic="https://news.berkeley.edu/wp-content/uploads/2016/09/Oskicupcake750.jpg"></Card>
    </div>
  );
}
