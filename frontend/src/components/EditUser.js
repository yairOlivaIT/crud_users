import React, { useState } from 'react';
import {
    Flex,
    Heading,
    Container,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2'; 
import Error from './Error';


const EditUser = (props) => {

    const bg = useColorModeValue("gray.800", "gray.200")
    const color = useColorModeValue("gray.200", "gray.700")

    const { editUser : { _id,username , email , rol , age , country} } = props;

    const [error , setError ] = useState(false);

    const [ userUpdate , setUserUpdate] = useState({
        userEdit : username,
        emailEdit : email,
        rolEdit: rol,
        ageEdit: age,
        countryEdit: country 
    });

    
 

    const { userEdit , emailEdit , rolEdit , ageEdit , countryEdit } = userUpdate

    const actualizarState = e => {
        setUserUpdate({
            ...userUpdate,
            [e.target.name] : e.target.value
        })
    }


    const updateUser = e => {
        e.preventDefault();

        if(userEdit.trim() === '' || emailEdit.trim() === '' || rolEdit.trim() === '' || ageEdit.trim() === '' || countryEdit.trim() === ''){
            setError(true);
            setTimeout(() => setError(false),3000);
            return;
        }

        clienteAxios.put(`/users/${_id}`, userUpdate)
        .then(respuesta => {

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User update successfully.',
                showConfirmButton: false,
                timer: 2000
              });

            props.setConsult(true);
            props.history.push('/');
        });
    }

    return ( 

        <Container
            width={[
                "100%", // 0-30em
                "100%", // 30em-48em
                "100%", // 48em-62em
                "100%", // 62em+
            ]}
            maxW="container.2xl"
            paddingBottom="5rem"
            bg={bg}
            p={5}
            >
            <Flex color={color} justifyContent="center" alignContent="center" alignItems="center">
                <Heading size="md"
                    fontSize={["xl", "xl", "2xl", "3xl"]}
                    fontWeight="extrabold"
                    textAlign="center"
                    textTransform="uppercase"
                >Create  user</Heading>
            </Flex>

            <Flex 
                width={[
                    "80%", // 0-30em
                    "80%", // 30em-48em
                    "70%", // 48em-62em
                    "50%", // 62em+
                ]} 
                justifyContent="center" flexWrap="wrap" alignContent="center" alignItems="center" color={color} margin='0 auto' 
            >
                <form
                    className="formulario"
                    onSubmit= {updateUser}
                >
                     { error ? 
                       <Error 
                            message="All fields are required or this email or username is already registered and remember that it must be a valid email "/>
                        : null }
                    <FormControl id="username"  mt={10} >
                        <FormLabel>Username</FormLabel>
                            <Input 
                                type="text"
                                borderColor="gray.700"
                                _hover={{borderColor:'gray.500'}}
                                placeholder="Username"
                                id="username"
                                name="username"
                                onChange={actualizarState}
                                defaultValue={userEdit}/>
                    </FormControl>
                    <FormControl id="email"  mt={10} >
                        <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                borderColor="gray.700"
                                _hover={{borderColor:'gray.500'}}
                                placeholder="Email"
                                id="email"
                                name="email"
                                defaultValue={emailEdit}
                                onChange={actualizarState} 
                                disabled='true'
                                />
                    </FormControl>
                    <FormControl id="rol"  mt={10} >
                        <FormLabel>Rol</FormLabel>
                            <Input
                                type="text"
                                borderColor="gray.700"
                                _hover={{borderColor:'gray.500'}}
                                placeholder="Rol"
                                id="rol"
                                name="rol"
                                defaultValue={rolEdit}
                                onChange={actualizarState}
                                />
                    </FormControl>
                    <FormControl id="age"  mt={10} >
                        <FormLabel>Age</FormLabel>
                            <Input
                                type="text"
                                borderColor="gray.700"
                                _hover={{borderColor:'gray.500'}}
                                placeholder="Age"
                                id="age"
                                name="age"
                                defaultValue={ageEdit}
                                onChange={actualizarState}
                                />
                    </FormControl>
                    <FormControl id="country"  mt={10} >
                        <FormLabel>Country</FormLabel>
                            <Input
                                type="text"
                                borderColor="gray.700"
                                _hover={{borderColor:'gray.500'}}
                                placeholder="Country"
                                id="country"
                                name="country"
                                defaultValue={countryEdit}
                                onChange={actualizarState}
                                />
                    </FormControl>
                    <div className="inputs">
                        <Input
                            margin="0 auto"
                            mt={10}
                            type="submit"
                            bg={'gray.700'}
                            color={'whiteAlpha.900'}
                            fontWeight='500'
                            width='30%'
                            m={2}
                            _hover={{cursor:'pointer' , color: '#000' , bg: 'gray.500'}}
                            value="Submit"
                        />

                        <Link width="100%" to='/'>
                            <Input
                                margin="0 auto"
                                mt={10}
                                type="submit"
                                bg={'red.600'}
                                color={'whiteAlpha.900'}
                                fontWeight='500'
                                width='30%'
                                m={2}
                                _hover={{cursor:'pointer' , color: '#000' , bg: 'red.400'}}
                                value="Cancel"
                            />
                        </Link>
                    </div>
                </form>

            </Flex>
        </Container>
     );
}
 
export default withRouter(EditUser);