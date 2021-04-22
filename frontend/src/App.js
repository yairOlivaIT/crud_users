import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import Crud from './components/Crud';
import NewUser from './components/NewUser';
import clienteAxios from './config/axios';
import EditUser from './components/EditUser';

function App() {

  const [ users , setUsers ] = useState([]);
  const [ consult , setConsult ] = useState(true);


  useEffect(() => {
    if(consult) {
      const consultApi = () => {
        clienteAxios.get('/users')
          .then(response => {
            setUsers(response.data)
            setConsult(false);
          })
          .catch(error => {
            console.log(error);
          })
      }
      consultApi();
    }
  }, [consult]);

  return(
      <Router>
        <Switch>
          <Route 
            exact path="/"
            component={() => <Crud users={users} setConsult={setConsult} />}
          />

          <Route
            exact path="/new-user"
            component={() =>  <NewUser users={users} setConsult={setConsult} />}
          />


          <Route 
            exact
            path= '/edit-user/:id'
            render={(props) => {
                const editUser = users.filter(user => user._id === props.match.params.id );


                return(
                  <EditUser
                      editUser = {editUser[0]}
                    setConsult= {setConsult}
                  />
                )
            }}
          />
        </Switch>
      </Router>
  )
  
}

export default App;
