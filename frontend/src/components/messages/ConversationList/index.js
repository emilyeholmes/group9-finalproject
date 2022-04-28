import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ConversationList.css';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations()
  },[])

 const getConversations = async () => {
    axios.get('http://localhost:4000/user/profile', {
      headers: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2OTkzZDRjYjViMTY0OGQ5NjIxYjE2In0sImlhdCI6MTY1MTExOTE0MCwiZXhwIjoxNjUxMTIyNzQwfQ.pwgjv2-va0go2fZEst7cHNBHq31R_7H8YIsTmCdyTOc'}
    }).then(async response => {
      let newConversations = await Promise.all(response.data.conversations.map(async result => {
        let other = result.receiver === response.username ? result.sender : result.receiver;
        let otherbio = await axios.get('http://localhost:4000/allusers/access').then(response => {
          return response.data[other].bio;
        });
        console.log(otherbio);
        return {
          photo: 'https://randomuser.me/api/portraits/men/64.jpg',
          name: other,
          text: otherbio
        }
      }));
      setConversations(newConversations);
    })
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Matches"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
}