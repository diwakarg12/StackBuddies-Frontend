import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../Components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, subscribeToMessages, unSubscribeFromMessages } from "../Utils/messageSlice";
import axios from "axios";
import { BASE_URL } from "../Components/Constants";
import { initializeSocket } from "../Socket/socket.client";

const Chat = () => {
    const [isLoadingMyMatches, setIsLoadingMyMatches] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const messages = useSelector(store => store.message);
    const connection = useSelector(store => store.connection);
    const { userId } = useParams();
    const match = connection?.find((m) => m?._id.toString() === userId.toString());

    // Create a ref for the chat area (message container)
    const chatAreaRef = useRef(null);

    // Function to scroll the chat area to the bottom
    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };

    // Scroll to bottom whenever messages are updated
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (user && userId) {
            initializeSocket(user._id);
            const fetchMessages = async () => {
                try {
                    setIsLoadingMyMatches(true);
                    const res = await axios.get(`${BASE_URL}/message/getConversation/${userId}`, { withCredentials: true });
                    console.log('Fetched messages:', res?.data?.messages);
                    dispatch(setMessages(res?.data?.messages));
                } catch (error) {
                    console.log('Error:', error?.response?.data);
                } finally {
                    setIsLoadingMyMatches(false);
                }
            };
            fetchMessages();
            dispatch(subscribeToMessages());
            return () => {
                dispatch(unSubscribeFromMessages());
            };
        }
    }, [user, userId, dispatch]);

    if (isLoadingMyMatches) return <LoadingMessagesUI />;
    if (!match) return <MatchNotFound />;

    return (
        <div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
            <div className='flex-grow flex flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full'>
                {/* Header */}
                <div className='flex items-center mb-4 bg-white rounded-lg shadow p-3'>
                    <img
                        src={match.profileUrl || "/avatar.png"}
                        className='w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-300'
                    />
                    <h2 className='text-xl font-semibold text-gray-800'>{`${match.firstName} ${match.lastName}`}</h2>
                </div>

                {/* Chat Area (Message Container) */}
                <div
                    ref={chatAreaRef} // Attach the ref to the chat area
                    className='flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4'
                >
                    {messages?.length === 0 ? (
                        <p className='text-center text-gray-700 py-8'>
                            Start your conversation with <span className="font-medium">{`${match.firstName} ${match.lastName}`}</span>
                        </p>
                    ) : (
                        messages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-3 ${msg.sender === user?._id ? "text-right" : "text-left"}`}
                            >
                                <span
                                    className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${msg.sender === user._id
                                        ? "bg-pink-500 text-white"
                                        : "bg-gray-200 text-gray-800"}`}
                                >
                                    {msg?.content}
                                </span>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Input */}
                <MessageInput match={match} />
            </div>
        </div>
    );
};
export default Chat;

const MatchNotFound = () => (
  <div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern'>
    <div className='bg-white p-8 rounded-lg shadow-md text-center'>
      <UserX size={64} className='mx-auto text-pink-500 mb-4' />
      <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Match Not Found</h2>
      <p className='text-gray-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
      <Link
        to='/'
        className='mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors 
        focus:outline-none focus:ring-2 focus:ring-pink-300 inline-block'
      >
        Go Back To Home
      </Link>
    </div>
  </div>
);

const LoadingMessagesUI = () => (
  <div className='h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50'>
    <div className='bg-white p-8 rounded-lg shadow-md text-center'>
      <Loader size={48} className='mx-auto text-pink-500 animate-spin mb-4' />
      <h2 className='text-2xl font-semibold text-gray-800 mb-2'>Loading Chat</h2>
      <p className='text-gray-600'>Please wait while we fetch your conversation...</p>
      <div className='mt-6 flex justify-center space-x-2'>
        <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
        <div
          className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);
