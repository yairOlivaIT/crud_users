import React from 'react';
import {
    Alert,
    AlertIcon,
} from "@chakra-ui/react";

const Error = ({message}) => {
    return ( 
        <Alert mt={5} status="error" bg={'red.400'} color={'whiteAlpha.900'}>
            <AlertIcon color={'whiteAlpha.900'} />
                {message}
        </Alert>
     );
}
 
export default Error;