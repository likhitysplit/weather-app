import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const RegisterComponent = ({ setLoggedInUser }) => {
    const { users, setUsers } = useContext(UserContext);
    const [usernameFeedback, setUsernameFeedback] = useState(''); 
    const [passwordFeedback, setPasswordFeedback] = useState(''); 
    const [isUsernameTaken, setIsUsernameTaken] = useState(false); 
    const navigate = useNavigate();

    const registerUser = (values) => {
        const userExists = users.find(user => user.username === values.username);

        if (userExists) {
            setUsernameFeedback("username already exists.");
        } else {
            const password = values.password;
            const isLongEnough = password.length >= 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);

            if (!isLongEnough || !hasUppercase || !hasNumber) {
                alert("password does not meet the requirements. please try again.");
            } else {
                const newUser = { username: values.username, password: values.password, role: values.role };
                setUsers([...users, newUser]);
                alert("registration successful!");
                setLoggedInUser(newUser);
                navigate(`/`);
            }
        }
    };

    const validatePassword = (password) => {
        let feedback = '';
        if (password.length < 8) {
            feedback = 'password must be at least 8 characters.';
        } else if (!/[A-Z]/.test(password)) {
            feedback = 'password must contain at least one uppercase letter.';
        } else if (!/[0-9]/.test(password)) {
            feedback = 'password must contain at least one number.';
        } else {
            feedback = 'password is strong.';
        }
        setPasswordFeedback(feedback);
    };

    const validateUsername = (username) => {
        if (username.length >= 3) {
            const userExists = users.some(user => user.username === username);
            if (userExists) {
                setUsernameFeedback('username already exists.');
                setIsUsernameTaken(true); 
            } else {
                setUsernameFeedback('username is available.');
                setIsUsernameTaken(false); 
            }
        } else {
            setUsernameFeedback('');
            setIsUsernameTaken(false); 
        }
    };

    return (
        <div className="login-container">
            <Formik
                initialValues={{ username: "", password: "", role: "regular" }}
                onSubmit={(values) => registerUser(values)}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <div>
                            <Field
                                className="input"
                                type="text"
                                name="username"
                                placeholder="username"
                                onChange={(e) => {
                                    handleChange(e);
                                    validateUsername(e.target.value); 
                                }}
                            />
                            <div className="username-feedback">{usernameFeedback}</div>
                        </div>
                        <div>
                            <Field
                                className="input"
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={(e) => {
                                    handleChange(e);
                                    validatePassword(e.target.value); 
                                }}
                            />
                            <div className="password-feedback">{passwordFeedback}</div>
                        </div>
                        <Field name="role" component="select" className="input">
                            <option value="regular">regular</option>
                            <option value="admin">admin</option>
                            <option value="restricted">restricted</option>
                        </Field>
                        <button
                            className="login-button"
                            type="submit"
                            disabled={!values.username || !values.password || isUsernameTaken} 
                        >
                            register
                        </button>
                    </Form>
                )}
            </Formik>
            <button onClick={() => navigate("/")}>back to login</button>
        </div>
    );
};

export default RegisterComponent;
