import { useState } from 'react';
import '@mantine/core/styles.css';
import { Button, Container, MantineProvider, Paper, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import { persistentAtom } from 'hooks/persistentAtom';


export const ResearchTab = () => {
    return (
        <Container
            size={'xl'}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}
        >
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </Container>
    );
};
