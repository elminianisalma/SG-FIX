'use client';

import React, { useState } from 'react';
import {
    Box,
    Heading,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Button,
    Badge,
    Flex,
    useToast,
    Image as ChakraImage,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

// Liste fictive d'utilisateurs
const initialUsers = [
    {
        id: 'user1',
        name: 'John Doe',
        department: 'IT Security',
        availability: 'Disponible',
        profileImage: '/images/john.jpeg',
        role: 'Administrateur',
    },
    {
        id: 'user2',
        name: 'Jane Smith',
        department: 'HR',
        availability: 'Occupé',
        profileImage: '/images/jane.jpeg',
        role: 'Utilisateur',
    },
    {
        id: 'user3',
        name: 'Mark Johnson',
        department: 'Marketing',
        availability: 'Absent',
        profileImage: '/images/michael.jpeg',
        role: 'Développeur',
    },
    {
        id: 'user4',
        name: 'Emily Davis',
        department: 'Development',
        availability: 'Disponible',
        profileImage: '/images/emily.jpeg',
        role: 'Tech-Lead',
    },
];

// Fonction de couleur dynamique
const getAvailabilityColor = (availability: string) => {
    switch (availability) {
        case 'Disponible':
            return 'green';
        case 'Occupé':
            return 'yellow';
        case 'Absent':
            return 'red';
        default:
            return 'gray';
    }
};

const AdminUserManagement = () => {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter((user) => user.id !== userId));
        toast({
            title: 'Utilisateur supprimé.',
            description: `L'utilisateur avec l'ID ${userId} a été supprimé.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box p={6} bg="white" borderRadius="md" shadow="md">
            <Heading as="h2" size="lg" mb={4}>
                Gestion des Utilisateurs
            </Heading>

            <Input
                placeholder="Rechercher un utilisateur par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={4}
            />

            <Table variant="simple">
                <Thead bg="gray.100">
                    <Tr>
                        <Th>Utilisateur</Th>
                        <Th>Département</Th>
                        <Th>Disponibilité</Th>
                        <Th>Rôle</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredUsers.map((user) => (
                        <Tr key={user.id}>
                            <Td>
                                <Flex alignItems="center">
                                    <ChakraImage
                                        src={user.profileImage}
                                        alt={`Avatar de ${user.name}`}
                                        borderRadius="full"
                                        boxSize="30px"
                                        mr={2}
                                    />
                                    <Text fontWeight="medium">{user.name}</Text>
                                </Flex>
                            </Td>
                            <Td>{user.department}</Td>
                            <Td>
                                <Badge colorScheme={getAvailabilityColor(user.availability)}>
                                    {user.availability}
                                </Badge>
                            </Td>
                            <Td>{user.role}</Td>
                            <Td>
                                <Flex>
                                    <Button
                                        leftIcon={<EditIcon />}
                                        colorScheme="blue"
                                        size="sm"
                                        mr={2}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        leftIcon={<DeleteIcon />}
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Supprimer
                                    </Button>
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default AdminUserManagement;
