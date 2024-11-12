import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const LoginComponent = ({ setLoggedInUser }) => {
    const { users } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (values) => {
        const { username, password, country } = values;
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            if (user.role === "restricted") {
                alert("you do not have permission to access this application.");
            } else {
                setIsLoggedIn(true);
                setLoggedInUser({ ...user, country });
                navigate(`/${username}?country=${country}&role=${user.role}`);
            }
        } else {
            alert("invalid username or password.");
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div className="login-container">
                    <Formik
                        initialValues={{ username: "", password: "", country: "USA" }}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        {({ values }) => (
                            <Form>
                                <div>
                                    <Field className="input" type="text" name="username" placeholder="username" />
                                </div>
                                <br />
                                <div>
                                    <Field className="input" type="password" name="password" placeholder="password" />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="country">country:</label>
                                    <Field as="select" name="country" className="input">
                                        <option value="USA">USA (fahrenheit)</option>
                                        <option value="Elsewhere">elsewhere (celsius)</option>
                                    </Field>
                                </div>
                                <br />
                                <button className="login-button" type="submit" disabled={!values.username || !values.password}>
                                    login
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <button onClick={() => navigate("/register")}>register</button>
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
