import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import './ChatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'

export default function ChatBox({ chat, currentUser, setSendMessage, receieveMessage }) {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")


    useEffect(() => {
        if (receieveMessage !== null && receieveMessage?.chatId == chat?._id) {
            setMessages([...messages, receieveMessage])

        }

    }, [receieveMessage])


    //fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/getUser/${userId}`).then(({ data }) => {
                    setUserData(data)

                })
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData()

    }, [chat, currentUser])

    //fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/message/${chat._id}`).then(({ data }) => {
                    setMessages(data)
                })

            } catch (error) {
                console.log(error);

            }

        }
        if (chat !== null) fetchMessages()

    }, [chat])

    const handleChange = (e) => {
        setNewMessage(e.target.value)

    }

    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        //send message to database
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/message`, { message })
            console.log(data)
            setMessages([...messages, data])
            setNewMessage(" ")
        } catch (error) {
            console.log(error);
        }
        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    }
    return (
        <>
            <div className='ChatBox-container'>
                {chat ? (
                    <>
                        <div className='chat-header' >
                            <div className='follower' >
                                <div>
                                    <img src={userData?.profilePicture?userData?.profilePicture:"icons/blankprofile.webp"} alt=''
                                        className='followerImage'
                                        style={{ width: '50px', height: '50px',borderRadius:"10px" }}

                                    />
                                    <div className='name' style={{ fontSize: "0.8rem" }} >
                                        <span>{userData?.first_name}  </span>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ width: '95%', border: '0.1px solid #ececec' }} />
                        </div>
                        {/* chatbox messages */}
                        <div className='chat-body' >
                            {messages.map((message) => (
                                <div className={message.senderId == currentUser ? "message own" : "message"} key={message._id} >
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))}
                        </div>
                        {/* chat sender */}
                        <div className='chat-sender' >
                            <div>+</div>
                            <input
                                value={newMessage}
                                onChange={handleChange}
                            />
                            <div className='send-button button' onClick={handleSend}>Send</div>

                        </div>

                    </>
                ) : (
                    <span className='chatbox-empty-message' >
                        Tap on a Chat to start Conversation...

                    </span>
                )}

            </div>


        </>
    )
}
