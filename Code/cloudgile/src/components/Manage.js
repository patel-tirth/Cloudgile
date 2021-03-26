
import React , {useState,useEffect} from 'react';
import {Button, Dropdown } from '@themesberg/react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/database';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// export const Manage = () => {
//   return (
//       <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//         <Dropdown>
//           <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
//             <span>New</span>
//           </Dropdown.Toggle>
//           <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
//             <Dropdown.Item>
//             </Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//   );
// };

export const Manage = ()=> {
  const [people, setDesigners] = useState([]);
let array = [];
  function getUsers() {
      var users = firebase.database().ref('/users/');
      users.on('value', (snapshot) => {
          snapshot.forEach((snap) => {
              const userObject = snap.val();
             
                  const allUsers = [...people, userObject];
                  array.push(userObject);
                  setDesigners(allUsers);
                
          });
      });
  }
  useEffect(() => {
      getUsers();
  }, []);

  return (
   

      <TableContainer >
      <Table stickyHeader aria-label="sticky table">
      <TableHead> 
          <TableRow> 

            <TableCell>All users</TableCell> 

         </TableRow>
        </TableHead>
        
       <TableBody>
              <TableRow>
              {console.log(people)}
                {people.map((person,id) => {
                 
                  const value = person.email;
                  return (
                    <TableRow key={id} >
                        {/* {console.log(perosn.id)}    */}
                        <TableCell>
                     { value}  
                    
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableRow>
            

        </TableBody>
      </Table>
    </TableContainer>
  );
}