import {useState} from 'react';
import{useHistory} from 'react-router-dom'


const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:""});
    let history =useHistory();
  
    const handleSubmit=async(e)=> {
        e.preventDefault();
      
      const  {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            }, 
            body: JSON.stringify({name,email,password })
          });
          const json = await response.json();
          console.log(json);
          if(json.success) {
            //   save the auth token
            localStorage.setItem('token',json.authtoken);
            history.push('/')
            props.showAlert("Account created successfully","success");
          }else{
              props.showAlert("invalid credentials","danger");
          }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange}/>
                    <label htmlFor="exampleInputEmail1 onChange={onChange}">Email address</label>

                    <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}/>
                    <small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

