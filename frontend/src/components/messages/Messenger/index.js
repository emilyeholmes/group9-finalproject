import React, {useState} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import NavBar from '../../navbar/NavBar';
import './Messenger.css';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function Messenger({ token }) {
    const [ conversationId, setConversationId ] = useState();

    return (
      <div>
        
        <div className="messenger">
          {/* <Toolbar
            title="Messenger"
            leftItems={[
              <ToolbarButton key="cog" icon="ion-ios-cog" />
            ]}
            rightItems={[
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
            ]}
          /> */}

          {/* <Toolbar
            title="Conversation Title"
            rightItems={[
              <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
              <ToolbarButton key="video" icon="ion-ios-videocam" />,
              <ToolbarButton key="phone" icon="ion-ios-call" />
            ]}
          /> */}

          <div className="scrollable sidebar">
            <ConversationList token={token} key={conversationId} setConversationId={setConversationId} />
          </div>

          <div className="scrollable content">
            <MessageList token={token} key={conversationId} />
          </div>
        </div>
      </div>
    );
}