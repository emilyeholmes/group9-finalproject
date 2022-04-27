import React, { useEffect, useState } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'sally';

var tempMessages = [];
var conversations;
var message;

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages();
  }, [])


  const  getMessages = async () => {
    console.log("I FIRE ONCE");
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://localhost:4000/user/profile',
      headers: {
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2OTkzZWZjYjViMTY0OGQ5NjIxYjE5In0sImlhdCI6MTY1MTA4NjMxOSwiZXhwIjoxNjUxMDk2MzE5fQ.ZiN3E65WvugINviYnowLHOuDPq-dnJ-REpAxFzIzVFg'
      },
      data: data
    };

    await axios(config)
            .then(function (response) {
              conversations = response.data.conversations;
              console.log("Response: ", conversations.length);
            })
            .catch(function (error) {
              console.log(error);
            });

    message = conversations[0];
    
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
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2OTkzZWZjYjViMTY0OGQ5NjIxYjE5In0sImlhdCI6MTY1MTA4NjMxOSwiZXhwIjoxNjUxMDk2MzE5fQ.ZiN3E65WvugINviYnowLHOuDPq-dnJ-REpAxFzIzVFg'
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

      <Compose rightItems={[
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