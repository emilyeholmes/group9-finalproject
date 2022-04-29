import React from 'react';
import './Compose.css';
import {
  Input,
  FormControl,
  InputGroup,
  Button
} from "@chakra-ui/react";

export default function Compose(props) {
    return (
      <div className="compose">
        <form onSubmit={(e) => props.sendMessage(e)}>
          <div style={{display:'flex', width:'100%'}}>
            <FormControl>
                <InputGroup>
                    <Input
                      width='70%'
                      outline='none'
                      type="text"
                      className="compose-input"
                      placeholder="Type a message, @name"
                      onChange={event => props.setMessage(event.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <Button
                type="submit"
                variant="solid"
                width="full"
                colorScheme="orange"
            >
                Send
            </Button>
            {/* {
              props.rightItems
            } */}
          </div>
        </form>
      </div>
    );
}