import { useState } from 'react';
import { Box } from '@mui/material';

import Sidebar from '../../components/Sidebar/Sidebar';

import ContactList from '../../components/Chat/ContactList';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatBody from '../../components/Chat/ChatBody';
import ChatInput from '../../components/Chat/ChatInput';

function Conversations() {
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedConversation, setSelectedConversation] = useState(null);

    return (

        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}
        >

        <Sidebar />

<Box
    sx={{
        flex: 1,
        display: 'flex'
    }}
>

    <ContactList

    setSelectedContact={setSelectedContact}

    setSelectedConversation={setSelectedConversation}

/>

    <Box
        sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fafafa'
        }}
    >

     <ChatHeader
    selectedContact={selectedContact}
    selectedConversation={selectedConversation}
/>

        <ChatBody
    selectedConversation={selectedConversation}
/>

        <ChatInput
    selectedConversation={selectedConversation}
    selectedContact={selectedContact}
/>

    </Box>

</Box>

        </Box>

    );

}

export default Conversations;