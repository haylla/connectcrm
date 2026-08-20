import { useState } from 'react';

import { Box } from '@mui/material';

import ContactList from '../../components/Chat/ContactList';
import ChatHeader from '../../components/Chat/ChatHeader';
import ChatBody from '../../components/Chat/ChatBody';
import ChatInput from '../../components/Chat/ChatInput';

function Conversations() {

    const [selectedContact, setSelectedContact] = useState(null);

    const [selectedConversation, setSelectedConversation] =
        useState(null);

    return (

        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                backgroundColor: '#f5f5f5'
            }}
        >

            <ContactList

                setSelectedContact={setSelectedContact}

                setSelectedConversation={
                    setSelectedConversation
                }

            />

            <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#fafafa'
                }}
            >

                <ChatHeader

                    selectedContact={
                        selectedContact
                    }

                    selectedConversation={
                        selectedConversation
                    }

                />

                <ChatBody

                    selectedConversation={
                        selectedConversation
                    }

                />

                <ChatInput

                    selectedConversation={
                        selectedConversation
                    }

                    selectedContact={
                        selectedContact
                    }

                />

            </Box>

        </Box>

    );

}

export default Conversations;