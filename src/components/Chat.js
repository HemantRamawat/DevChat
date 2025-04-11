import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, realtimeDb } from '../firebase';
import { useSelector } from 'react-redux';
import { ref, set, remove, onValue } from 'firebase/database';
import '../App.css'
const Chat = () => {
    const user = useSelector((state) => state?.user?.currentUser);
    const channel = useSelector((state) => state?.channel?.currentChannel);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [typingUsers, setTypingUsers] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        if (!channel) return;
        const q = query(
            collection(db, 'channels', channel.id, 'messages'),
            orderBy('timestamp')
        );
        const unsub = onSnapshot(q, (snapshot) =>
            setMessages(snapshot.docs.map(doc => doc.data()))
        );
        return () => unsub();
    }, [channel]);

    const handleSend = async () => {
        if (!message.trim()) return;
        if (!channel || !channel.id || !user || !user.uid) {
            console.warn('Missing channel or user data');
            return;
        }
        try {
            await addDoc(collection(db, 'channels', channel.id, 'messages'), {
                text: message,
                user: user.displayName,
                avatar: user.photoURL,
                timestamp: serverTimestamp(),
            });
            setMessage('');
            await remove(ref(realtimeDb, `typing/${channel.id}/${user.uid}`));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    const handleTyping = () => {
        if (!user || !channel) return;
        const typingRef = ref(realtimeDb, `typing/${channel.id}/${user.uid}`);
        set(typingRef, user.displayName);
        setTimeout(() => {
            remove(ref(realtimeDb, `typing/${channel.id}/${user.uid}`));
        }, 3000);
    };

    useEffect(() => {
        if (!channel) return;
        const typingRef = ref(realtimeDb, `typing/${channel.id}`);
        onValue(typingRef, (snapshot) => {
            const typingData = snapshot.val() || {};
            const usersTyping = Object.values(typingData).filter((name) => name !== user.displayName);
            setTypingUsers(usersTyping);
        });
    }, [channel, user]);

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h5">{channel?.name || 'Select a Channel'}</Typography>
            <Box sx={{ height: '70vh', overflowY: 'auto', mt: 2 }}>
                {messages.map((msg, index) => {
                    const isOwnMessage = msg.user === user?.displayName;

                    return (
                        <Box
                            key={index}
                            className={`message ${isOwnMessage ? 'own' : 'other'}`}
                        >
                            <img src={msg.avatar} alt="avatar" className="avatar" />
                            <Box className="text-content">
                                <Typography variant="subtitle2">{msg.user}</Typography>
                                <Typography>{msg.text}</Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
            {typingUsers.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                    {typingUsers.join(', ')} typing...
                </Typography>
            )}
            <Box sx={{ display: 'flex', mt: 2 }}>
                <TextField
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                    inputRef={inputRef}
                    placeholder="Type a message"
                />
                <Button onClick={handleSend} variant="contained" sx={{ ml: 1 }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
