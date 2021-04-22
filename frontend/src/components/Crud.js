import React from 'react';
import { MoonIcon , AddIcon , EditIcon , DeleteIcon} from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box, 
    Stack, 
    useColorMode, 
    Button, 
    useColorModeValue,
    Flex,
    Heading,
    Container,
    Spacer,
    ButtonGroup,
    Center,
    Alert,
    AlertIcon,
  } from "@chakra-ui/react"
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Crud = (props) => {

    const {  toggleColorMode } = useColorMode();
    const bg = useColorModeValue("gray.800", "gray.200")
    const color = useColorModeValue("gray.200", "gray.700")
    const bgButton = useColorModeValue('gray.200','gray.800');
    const colorButton = useColorModeValue('gray.800', 'gray.200');
    const bgButtonHover = useColorModeValue('gray.400','gray.600');


    const { users } = props;

    const deleteUser = id => {
        Swal.fire({
            title: 'You sure?',
            text: "The user cannot be recovered",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes , deleted',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
                //Alerta de eliminado
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
              )
                clienteAxios.delete(`/users/${id}`)
                    .then( response => {
                        props.setConsult(true);
                        props.history.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    }
    


    return (
        <Container
            maxHeight="2xl"
            bg={bg}
            maxW="container.2xl"
            color={color}
            paddingBottom="5rem"
            paddingTop="3rem"
            >
            <Flex>
                <Box mt="6">
                <Heading size="md"
                    fontSize={["xl", "xl", "2xl", "3xl"]}
                    fontWeight="extrabold"
                    textAlign="center"
                    textTransform="uppercase"
                    >Crud users</Heading>
                </Box>
                <Spacer />
                <Box>
                <Button 
                    textAlign="center" 
                    margin="0 auto"
                    display="flex" 
                    mt={{base:"1rem" , md:"1.2rem" , lg:"1.5rem"}}
                    w={8} h={8}  
                    onClick={toggleColorMode}
                    bg={bg} _hover={{ bg: bg }}
                    >
                    <MoonIcon color={color} w={4} h={4} /> 
                </Button>
                </Box>
            </Flex>

            <Stack direction="row" spacing={4} mt={8}>
                <Link to={'/new-user'}>
                    <Button bg={bgButton} _hover={{ bg: bgButtonHover }} color={colorButton} rightIcon={<AddIcon w={3} h={4} />} variant="solid">
                        Create User
                    </Button>
                </Link>
            </Stack>
            
            { users.length === 0 ?
                <Center mt={10}>
                    <Stack>
                    <Alert fontSize="2xl" bg={bg}>
                        <AlertIcon color={color} />
                        There are no results in the table! 
                        Create user to record results.
                    </Alert>
                    </Stack>
                </Center>
            :
                <Table variant="simple" marginTop="5rem" size="sm">
                    <Thead>
                        <Tr>
                            <Th color={color} textAlign="center">Username</Th>
                            <Th color={color} textAlign="center">Email</Th>
                            <Th color={color} textAlign="center">Rol</Th>
                            <Th color={color} textAlign="center">Age</Th>
                            <Th color={color} textAlign="center">Country</Th>
                            <Th color={color} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody  bg={bg} color={color}>
                        {users.map(user => (
                            <React.Fragment key={user._id}>
                                <Tr bg={bg} color={color}>
                                    <Td textAlign="center" textTransform="uppercase" fontWeight="700">{user.username}</Td>
                                    <Td textAlign="center" fontWeight="500">{user.email}</Td>
                                    <Td textAlign="center" fontWeight="500">{user.rol}</Td>
                                    <Td textAlign="center" fontWeight="500">{user.age}</Td>
                                    <Td textAlign="center" fontWeight="500">{user.country}</Td>
                                    <Td>
                                        <Flex>
                                            <ButtonGroup margin="0 auto" spacing="4">
                                                <Link to={`/edit-user/${user._id}`}>
                                                    <Button backgroundColor="#3B79E5" border="none" color="#fff" _hover={{bg:"#7FA9F2"}} ><EditIcon/></Button>
                                                </Link>
                                                <Button 
                                                    backgroundColor="#B71919" border="none" color="#fff" _hover={{bg:"#DE5134"}}
                                                    onClick = {() =>  deleteUser(user._id) }
                                                ><DeleteIcon/></Button>
                                            </ButtonGroup>
                                        </Flex>
                                    </Td>
                                </Tr>
                            </React.Fragment>
                        ))}
                    </Tbody>
                </Table>
            }


        </Container>
  );
}
 
export default withRouter(Crud);




// width={[
//     "100%", // 0-30em
//     "100%", // 30em-48em
//     "100%", // 48em-62em
//     "100%", // 62em+
// ]}