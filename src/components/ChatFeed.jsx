import {useEffect,useRef,useState} from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import DownOutlined from '@ant-design/icons';
import {Avatar} from 'react-chat-engine'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'


const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages} = props;
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(() => {
    scrollToBottom()
  },[messages]);

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(messages);
    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} chatId = {chat.id}/>
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat){
    function logout(){
      localStorage.clear();
      window.location.reload();
  }
    return( 
    <div className = "emptyChat" style = {{backgroundColor:"white",width:'100%',height:'100vh',textAlign:"center"}}>
      <div style = {{position:"fixed",top:"40%",left:"60%",transform:"translate(-50%,-50%)"}}>
                <div style = {{fontSize:"3rem",marginBottom:"25px"}}>No Chats to display</div>
                <div>
                <Button variant="primary" size="lg" style = {{backgroundColor:"#7554a0",outline:"none",boxShadow:"none",borderColor:"#f0f0f0"}} onClick = {()=>{logout()}} >
                    Logout
                </Button>{' '}
                </div>
                    </div>
      </div>
    );
  }

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
            <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div ref={messagesEndRef} />
      <div style={{ height: '100px' }}/>
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;