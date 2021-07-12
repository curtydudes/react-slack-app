import { useState, useContext } from 'react'
import { UserContext } from '../../context/userContext';
import { loginUser } from '../../API/useFetchPost'
import { useHistory } from "react-router-dom";
import './LoginForm.scss'

const LoginForm = () => {
    const { getHeaders } = useContext(UserContext);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(values)
        .then(data => {
            getHeaders(data)
            history.push("/client");
            alert('You are logged in')
        })
        .catch(error => console.log(error));
    }
    return (
    <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-content">
                <input 
                    className="login-input" 
                    type="email"
                    name="email"
                    // autoComplete="off"
                    placeholder="Enter Email"
                    required  
                    value={values.email}
                    onChange={handleChange}
                />
            </div>
            <div className="login-content">
                <input 
                    className="login-input" 
                    type="password"
                    name="password"
                    // autoComplete="off"
                    placeholder="Enter Password"
                    required
                    value={values.password}
                    onChange={handleChange}
                />
            </div>
            <button className='login-btn' type='submit'>LOGIN</button>
        </form>
    </div>
    )
}

export default LoginForm;