import React, { useEffect, useState } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import {
  Input,
  FormControl,
  InputGroup
} from "@chakra-ui/react";

import './MessageList.css';
import axios from 'axios';

let MY_USER_ID = '';

var tempMessages = [];
var conversations;
var message;

export default function MessageList({ token, key }) {
  const [otherPerson, setOtherPerson] = useState([]);
  const [messages, setMessages] = useState([]);
  const [nextMessage, setNextMessage] = useState([]); 

  useEffect(() => {
    getMessages();
  }, [])

  const sendMessage = async(e) => {
    e.preventDefault();
    var config = {
      method: 'POST',
      url: 'http://localhost:4000/user/sendmessage',
      headers: {
        'token': token,
      },
      data: {
        otherusername: otherPerson,
        text: nextMessage
      }
    }

    await axios(config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const  getMessages = async () => {
    console.log(key);

    if (true) {
      console.log("I FIRE ONCE");
      var axios = require('axios');
      var data = '';
      tempMessages = [];

      var config = {
        method: 'get',
        url: 'http://localhost:4000/user/profile',
        headers: {
          'token': token,
        },
        data: data
      };

      await axios(config)
              .then(function (response) {
                conversations = response.data.conversations;
                MY_USER_ID = response.data.username;
                console.log(MY_USER_ID);
                console.log("Response: ", conversations.length);
              })
              .catch(function (error) {
                console.log(error);
              });

      message = conversations[0];
      setOtherPerson(MY_USER_ID === conversations[0].sender ? conversations[0].receiver : conversations[0].receiver);      

      let counter = 20;
      while (message != null && counter > 0) {
        tempMessages.unshift(message);
        console.log(counter, message);

        if (message.previous == null) {
          break;
        }

        let config2 = {
          method: 'get',
          url: 'http://localhost:4000/user/showmessage',
          headers: {
            'token': token
          },
          params: {
            id : message.previous
          }
        }

        await axios(config2)
          .then(function (response) {
            message = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        counter -= 1;
      }
      
      setMessages(tempMessages);
    } else {
      setMessages([]);
    }
    // var tempMessages = [
    //   {
    //     id: 1,
    //     author: 'apple',
    //     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 2,
    //     author: 'orange',
    //     message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 3,
    //     author: 'orange',
    //     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 4,
    //     author: 'apple',
    //     message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 5,
    //     author: 'apple',
    //     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 6,
    //     author: 'apple',
    //     message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 7,
    //     author: 'orange',
    //     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 8,
    //     author: 'orange',
    //     message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 9,
    //     author: 'apple',
    //     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
    //     timestamp: new Date().getTime()
    //   },
    //   {
    //     id: 10,
    //     author: 'orange',
    //     message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
    //     timestamp: new Date().getTime()
    //   },
    // ]
    // setMessages([...messages, ...tempMessages]);
  }

  const renderMessages = () => {
    try {
      let i = 0;
      let messageCount = messages.length;
      let tempMessages = [];

      while (i < messageCount) {
        let previous = messages[i - 1];
        let current = messages[i];
        let next = messages[i + 1];
        let isMine = current.sender === MY_USER_ID;
        let currentMoment = moment(current.timestamp);
        let prevBySameAuthor = false;
        let nextBySameAuthor = false;
        let startsSequence = true;
        let endsSequence = true;
        let showTimestamp = true;

        if (previous) {
          let previousMoment = moment(previous.timestamp);
          let previousDuration = moment.duration(currentMoment.diff(previousMoment));
          prevBySameAuthor = previous.sender === current.sender;

          if (prevBySameAuthor && previousDuration.as('hours') < 1) {
            startsSequence = false;
          }

          if (previousDuration.as('hours') < 1) {
            showTimestamp = false;
          }
        }

        if (next) {
          let nextMoment = moment(next.timestamp);
          let nextDuration = moment.duration(nextMoment.diff(currentMoment));
          nextBySameAuthor = next.sender === current.sender;

          if (nextBySameAuthor && nextDuration.as('hours') < 1) {
            endsSequence = false;
          }
        }

        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
          />
        );

        // Proceed to the next message.
        i += 1;
      }

      return tempMessages;
    } catch (error) {
      console.log(error);
    };
  }

  return (
    <div className="message-list">
      <Toolbar
        title="Name"
        rightItems={[
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
          <ToolbarButton key="video" icon="ion-ios-videocam" />,
          <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <input
            outline='none'
            type="text"
            className="compose-input"
            placeholder="Type a message, @name"
            onchange={(e) => console.log("ASDASDA")}
          />

      <Compose setMessage={setNextMessage} sendMessage={sendMessage} rightItems={[
        <ToolbarButton key="photo" icon="ion-ios-camera" />,
        <ToolbarButton key="image" icon="ion-ios-image" />,
        <ToolbarButton key="audio" icon="ion-ios-mic" />,
        <ToolbarButton key="money" icon="ion-ios-card" />,
        <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
        <ToolbarButton key="emoji" icon="ion-ios-happy" />
      ]} />
    </div>
  );
}