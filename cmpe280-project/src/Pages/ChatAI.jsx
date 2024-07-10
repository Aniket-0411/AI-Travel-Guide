import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState } from "react"
import {
  MainContainer,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

function convertToModel(userID, userName, text){
  const message = {
    user: {
      id: userID,
      name: userName
    },
    text: text
  }
  return message
}



export default function Chat(){
  const [messages, addMessage] = useState([{
    user:{
      id: "AI",
      name: "AI Travel Assistant",
    },
    text: "Hi! How may I assist you?"
  }])

  function sendMessage(text){
    const message = convertToModel("user", "You", text)
  
    addMessage(messages => [...messages, message])

    //Initiate API request
    AIprompt(text);
    console.log(messages)
  }

  async function AIprompt(text){
    try{
      await fetch(`${process.env.REACT_APP_SERVER_URL}/chat`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            prompt: text
          })
        }
      ).then(response => response.json())
      .then(json => {
        let message = convertToModel("AI", "AI Travel Assistant", json)
        addMessage(messages => [...messages, message])
      })
    } catch(error){
      console.log("error", error)
      alert(error)
    }
    
  }
  return(
    <div style={{display: "flex", justifyContent:"center"}}>
      <MainContainer
        responsive={true}
        style={{
          height: "50vh",
          width: "70vw",
          maxWidth:"700px"
        }}
      >
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content
              userName="AI Travel Assistant"
            />
          </ConversationHeader>
          <MessageList>
            {messages &&
              messages.map((message) => {
              return message.user.id === "AI" ? (
                  <Message
                    model={{
                    direction: "incoming",
                    message: message.text,
                    sender: message.user.name,
                    }}
                />
              ) : (
              <div style={{ justifyContent: "flex-end", display: "flex" }}>
                <Message
                  model={{
                  direction: "outgoing",
                  message: message.text,
                  sender: message.user.name,
                  }}
                />
              </div>
              );
            })}
          </MessageList>
          <MessageInput
            onSend={(_, textContent) => sendMessage(textContent)}
          placeholder="Type message here"
          attachButton={false}
          sendButton={true}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}