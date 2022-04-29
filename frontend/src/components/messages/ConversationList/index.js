import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';

import './ConversationList.css';

export default function ConversationList({ token, key, setConversationId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getConversations()
  },[])

 const getConversations = async () => {
    axios.get('http://localhost:4000/user/profile', {
      headers: {token: token}
    }).then(async response => {
      let newConversations = await Promise.all(response.data.conversations.map(async result => {
        let other = result.receiver === response.data.username ? result.sender : result.receiver;
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
      if (conversations.length > 0) {
        let data = {
          index: 0
        }
        setConversationId({...data});
      }
    })
  }

  const updateConversations = async (index) => {
    let data = {
      index: index
    }
    await setConversationId({...data});
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
        conversations.map((conversation, index) =>
          <ConversationListItem
            key={conversation.name}
            data={conversation}
            onClick={async (e) => await updateConversations(index)}
            id={index}
          />
        )
      }
    </div>
  );
}