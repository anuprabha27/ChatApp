import {CopyFilled, EllipsisOutlined} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';

const TheirMessage = ({lastMessage,message})=>{
    const isFirstMessageByUser = !lastMessage||lastMessage.sender.username!==message.sender.username;
    return (
        <div className = "message-row">
            <div className = "their-message-container">
            {isFirstMessageByUser&&(
                <div 
                    className = "message-avatar"
                    style={{backgroundImage:`url(${message?.sender?.avatar})`}}
                />
            )}
            {message?.attachments?.length>0
                    ?(
                            <img 
                                src = {message.attachments[0].file}
                                alt = "message-attachment"
                                className = "message-image"
                                style = {{marginLeft:isFirstMessageByUser?'4px':'48px'}}
                            />
                    ):(
                            <div className = "their-message" style = {{float:'left',backgroundColor:'#CABCDC',marginLeft:isFirstMessageByUser?'4px':'48px'}}>
                                {message.text}
                            </div>
                    )
            }
            {message?.attachments?.length>0
                ?(
                    <div className="their-image-dropdown" style = {{marginLeft:'10px',marginTop:'6px'}}/>
                ):(
                    <div className="their-text-dropdown" style = {{marginLeft:'10px',marginTop:'6px'}}>
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
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default TheirMessage;