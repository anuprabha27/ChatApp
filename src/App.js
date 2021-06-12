import {ChatEngine,Avatar} from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import OptionsSettings from './components/OptionsSettings';
import PeopleSettings from './components/PeopleSettings';

import './App.css';
import { CalculatorFilled } from '@ant-design/icons';



const App = ()=>{
    if(!localStorage.getItem('username')) return <LoginForm />
    return (
        <div className = "begin" style = {{height:"100vh"}}>
            <ChatEngine 
                height = "100vh"
                projectID = "{project-id}"
                userName = {localStorage.getItem('username')}
                userSecret = {localStorage.getItem('password')}
                renderChatFeed = {(chatAppProps) => <ChatFeed{...chatAppProps}/>}
                renderPeopleSettings={(chatAppProps) => <PeopleSettings{...chatAppProps}/>}
                renderOptionsSettings = {(chatAppProps)=><OptionsSettings{...chatAppProps}/>}
                onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
            />
        </div>
    )
}

export default App;