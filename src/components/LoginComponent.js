import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ setLoggedInUser }) => {
    const users = [
        { username: "likhi", password: "127" },
        { username: "flynn", password: "papillon" },
    ];

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (values) => {
        const { username, password } = values;
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            setIsLoggedIn(true);
            setLoggedInUser(username);
            navigate(`/${username}`); 
        } else {
            alert("invalid username or password.");
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div className="login-container">
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        <Form>
                            <div>
                                <Field className="input" type="text" name="username" placeholder="username" />
                            </div>
                            <br />
                            <div>
                                <Field className="input" type="password" name="password" placeholder="password" />
                            </div>
                            <br />
                            <button className="login-button" type="submit">login</button>
                        </Form>
                    </Formik>
                </div>
            ) : (
                <div>
                    <h2>you are logged in!</h2>
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
