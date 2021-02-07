import { useState } from "react";
import { getCurrentUser } from "../auth";
import { signOut } from "../auth/signOut";
import { Button } from "semantic-ui-react";
import { auth } from "../firebase";


function renderLoggedIn() {
    return (
        <div className="loggedIn-wrapper">
            <div>
                <Button onClick={() => signOut()} color="yellow">
                    Log out
        </Button>
            </div>
        </div>
    );
}

function Dashboard() {
    const [user, setUser] = useState(getCurrentUser());
    auth.onAuthStateChanged((user) => setUser(user));

    return (
        <div>{user ? renderLoggedIn() : null}</div>
        
    )    
}

export default Dashboard;