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
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YjMyMDFkMDc5MmYxNjBhNjA2Y2E2In0sImlhdCI6MTY1MTE5MjMyMX0.z_bGh1tr8bGLm-tZ_OF7lGASHeU8JkNZb8iXalLaj2c'
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

  function causeMatch(bool) {
    if (bool) {
      window.alert("You've got a match!");
      setRandomProfile(getRandom(allUsers));
    }
    var axios = require('axios');
    var data = {
      otherusername: randomProfile.username,
      text: "This is the start of your conversation."
    };
    var headers = {
      'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YjMyMDFkMDc5MmYxNjBhNjA2Y2E2In0sImlhdCI6MTY1MTE5MjMyMX0.z_bGh1tr8bGLm-tZ_OF7lGASHeU8JkNZb8iXalLaj2c'
    }

    var config = {
      method: 'post',
      url: 'http://localhost:4000/user/sendmessage',
      data: data
    };

    axios(config)
      .catch(function (error) {
        console.log(error);
      });

  }

  function getRandom(allUsers, bool) {
    if (bool) {
      var axios = require('axios');
      var data = {
        otherusername: randomProfile.username
      };
      var headers = {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YjMyMDFkMDc5MmYxNjBhNjA2Y2E2In0sImlhdCI6MTY1MTE5MjMyMX0.z_bGh1tr8bGLm-tZ_OF7lGASHeU8JkNZb8iXalLaj2c'
      }

      var config = {
        method: 'post',
        url: 'http://localhost:4000/user/potentialmatches',
        data: data
      };

      axios(config)
        .catch(function (error) {
          console.log(error);
        });

      checkMatch();
    }
    const keys = Object.keys(allUsers);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    const randProfile = allUsers[randKey];
    console.log(randProfile);
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
        // const randomProfile = getRandom(allUsers);
        // setAllUsers(response.data);
        const randProfile = getRandom(allUsers);
        if (alreadySeen.includes(randProfile)) {
          if (alreadySeen.length === allUsers.length) {
            setAlreadySeen([]);
          }
          randProfile = getRandom(allUsers);
        }
        setRandomProfile(randProfile);
        setAlreadySeen(alreadySeen.push(randProfile));
        console.log(randProfile);
      })
      .catch(function (error) {
        console.log(error);
      });
    setMatches(allUsers);
  }

  return (
    <div className='App-header'>
      <LikeButton func1={() => { setRandomProfile(getRandom(allUsers)) }} func2={causeMatch} />
      {/* <Card name="Oski Bear" age="81" intro="Go bears!" goal="Looking for a software engineering internship."
        aboutme1="I love Berkeley!" aboutme2="My favorite colors are blue and gold." aboutme3="I interned at Amazon last year."
        profilepic="https://news.berkeley.edu/wp-content/uploads/2016/09/Oskicupcake500-1.jpg"> </Card> */}
      < Card name={randomProfile.username} age={randomProfile.age} intro={randomProfile.bio}
        goal={randomProfile.goal} aboutme1={randomProfile.aboutme1}
        aboutme2={randomProfile.aboutme2} aboutme3={randomProfile.aboutme3} profilepic={randomProfile.profileurl} ></Card>
    </div>
  );

  //profilepic="https://news.berkeley.edu/wp-content/uploads/2016/09/Oskicupcake500-1.jpg"
}
