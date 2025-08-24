import { useState } from "react";


function RegisterForm(){
const[emailAddress,SetEmail] = useState("")
return(
    <div>
        <form>
            <h2>Register</h2>
            <label>First Name</label>
            <input type="text"></input>
            <label>Last Name</label>
            <input type="text"></input>
            <label>Email Address</label>
            <input type="email" value={emailAddress} onChange={(e) => SetEmail(e.target.value)}></input>
            <label>Password</label>
            <input type="password"></input>
            <label>Confirm Password</label>
            <input type="password"></input>
        </form>
    </div>
)

}

export default RegisterForm;