import {useState} from 'react';
import{useHistory} from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""});
    let history =useHistory();
  
    const handleSubmit=async(e)=> {
        e.preventDefault();
      
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            }, body: JSON.stringify({email:credentials.email,password:credentials.password })
          });
          const json = await response.json();
          console.log(json);
          if(json.success) {
            //   save the auth token
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Login successfully","success");
            history.push('/')
          }else{
            props.showAlert("invalid details","danger");
          }

    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange}/>
                    <small id="emailHelp" class ="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"name="password" id="password" placeholder="Password" value={credentials.password} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
