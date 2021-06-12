import {EllipsisOutlined} from '@ant-design/icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';


const MyMessage = ({message,chatId})=>{
    if(message?.attachments?.length>0){
        return(
            <div className = "my-img-container" style = {{display:"flex",flexDirection:"row-reverse"}}>
                <img 
                    src = {message.attachments[0].file}
                    alt = "message-attachment"
                    className = "message-image"
                    style = {{float:'right'}}
                />
                <div className="my-image-dropdown" style = {{marginRight:'10px',marginTop:'15px'}}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <EllipsisOutlined />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick = {async (e) => {
                            const username = localStorage.getItem('username');
                            const password = localStorage.getItem('password');
                            const message_id = message.id;
                            const chat_id = chatId;

                            const authObject = {'Project-ID': "{project-id}", 'User-Name':username,'User-Secret':password};
                            try{
                                await axios.delete(`https://api.chatengine.io/chats/${chat_id}/messages/${message_id}/`,{headers:authObject});
                                window.location.reload();
                            }catch(err){
                                console.log('Incorrect username or password');
                            }
                        }}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
        )
    }
    return (
        <div className = "my-text-container" style = {{display:"flex",flexDirection:"row-reverse"}}>
            <div className = "my-message" style = {{marginRight:'18px',color:'white',backgroundColor:'#3B2A50',marginTop:'10px'}}>
                {message.text}
            </div>
            <div className="my-text-dropdown" style = {{marginRight:'10px',marginTop:'20px'}}>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <EllipsisOutlined />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick = {()=>{
                        let messageText = message.text;
                        navigator.clipboard.writeText(messageText);
                    }}>
                        Copy
                    </Dropdown.Item>
                    <Dropdown.Item onClick = {async (e) => {
                        const username = localStorage.getItem('username');
                        const password = localStorage.getItem('password');
                        const message_id = message.id;
                        const chat_id = chatId;

                        const authObject = {'Project-ID': "{project-id}", 'User-Name':username,'User-Secret':password};
                        try{
                            await axios.delete(`https://api.chatengine.io/chats/${chat_id}/messages/${message_id}/`,{headers:authObject});
                            window.location.reload();
                        }catch(err){
                            console.log('Incorrect username or password');
                        }
                    }}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </div>
    )
}

export default MyMessage;