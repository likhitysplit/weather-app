import React, { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const RegisterComponent = ({ setLoggedInUser }) => {
    const { users, setUsers } = useContext(UserContext);
    const [user, setUser] = useState({ username: "", password: "", role: "regular" });
    const navigate = useNavigate();

    const registerUser = (values) => {
        const userExists = users.find(user => user.username === values.username);

        if (userExists) {
            alert("username already exists");
        } else {
            const password = values.password;
            const isLongEnough = password.length >= 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);

            if (!isLongEnough) {
                alert("password must be at least 8 characters long.");
            } else if (!hasUppercase) {
                alert("password must contain at least one capital letter.");
            } else if (!hasNumber) {
                alert("password must contain at least one number.");
            } else {
                const newUser = { username: values.username, password: values.password, role: values.role };
                setUsers([...users, newUser]);
                alert("registration successful!");
                setLoggedInUser(newUser);
                navigate(`/`);
            }
        }
    };

    return (
        <div className="login-container">
            <Formik
                initialValues={{ username: "", password: "", role: "regular" }}
                onSubmit={(values) => registerUser(values)}
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <Field className="input" type="text" name="username" placeholder="username" />
                        </div>
                        <div>
                            <Field className="input" type="password" name="password" placeholder="password" />
                        </div>
                        <Field name="role" component="select">
                            <option value="regular">regular</option>
                            <option value="admin">admin</option>
                            <option value="restricted">restricted</option>
                        </Field>
                        <button className="login-button" type="submit" disabled={!values.username || !values.password}>register</button>
                    </Form>
                )}
            </Formik>
            <button onClick={() => navigate("/")}>login</button>
        </div>
    );
};

export default RegisterComponent;
