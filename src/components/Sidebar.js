import React, { useEffect, useState } from 'react';
import {
    Drawer, List, ListItem, ListItemText,
    IconButton, Dialog, DialogTitle, TextField, Button
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setChannel } from '../redux/channelSlice';
import '../App.css';

const Sidebar = () => {
    const [channels, setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const [channelName, setChannelName] = useState('');
    const dispatch = useDispatch();
    const themeColor = useSelector((state) => state.theme.color);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'channels'), (snapshot) =>
            setChannels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        );
        return () => unsubscribe();
    }, []);

    const createChannel = async () => {
        if (!channelName.trim()) return;
        await addDoc(collection(db, 'channels'), {
            name: channelName,
        });
        setChannelName('');
        setOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: themeColor || '#1976d2',
                    color: '#fff',
                },
            }}
        >
            <List>
                <ListItem>
                    <IconButton onClick={() => setOpen(true)} sx={{ color: '#fff' }}>
                        <Add />
                    </IconButton>
                </ListItem>
                {channels.map((channel) => (
                    <ListItem
                        button
                        key={channel.id}
                        onClick={() => dispatch(setChannel(channel))}
                        className="channel-item"
                    >
                        <ListItemText primary={channel.name} />
                    </ListItem>
                ))}
            </List>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="channel-dialog">
                <DialogTitle>Create New Channel</DialogTitle>
                <TextField
                    autoFocus
                    fullWidth
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    label="Channel Name"
                    variant="outlined"
                    className="custom-textfield"
                    sx={{ m: 2 }}/>
                <Button
                    onClick={createChannel}
                    className="create-btn"
                    sx={{ m: 2 }}
                    variant="contained">
                    Create
                </Button>
            </Dialog>
        </Drawer>
    );
};

export default Sidebar;
