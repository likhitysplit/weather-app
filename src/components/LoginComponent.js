import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import CryptoJS from 'crypto-js';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const SECRET_KEY = 'pleasedebutduanxingxing';

const LoginComponent = ({ setLoggedInUser }) => {
    const { users } = useContext(UserContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usernameFeedback, setUsernameFeedback] = useState('');
    const navigate = useNavigate();

    const decryptData = (encryptedData) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    const handleLogin = (values) => {
        const { username, password, country } = values;

        const savedUsers = sessionStorage.getItem('users');
        let usersList = [];

        if (savedUsers) {
            try {
                const decryptedUsers = decryptData(savedUsers);
                usersList = JSON.parse(decryptedUsers);
            } catch {
                console.log("failed to decrypt users, check again!");
            }
        }

        const user = usersList.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            if (user.role === 'restricted') {
                alert('you do not have permission to access this application.');
            } else {
                setIsLoggedIn(true);
                setLoggedInUser({ ...user, country });
                navigate(`/${username}?country=${country}&role=${user.role}`);
            }
        } else {
            setUsernameFeedback('invalid username or password.');
        }
    };

    const validateUsername = (username) => {
        if (username.length >= 3) {
            const userExists = users.some((user) => user.username === username);
            if (userExists) {
                setUsernameFeedback('username exists.');
            } else {
                setUsernameFeedback("username isn't found.");
            }
        } else {
            setUsernameFeedback('');
        }
    };

    // FIX ALL OF THIS !! check OAuth perms b/c of 401 unauthorized error 
    const handleGoogleLoginSuccess = async (response) => {
        try {
            console.log('google login response:', response); 
            
            const { credential } = response; 
    
            if (!credential) {
                console.log('no credential??');
            }
    
            const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${credential}`,
                },
            });
    
            const profile = res.data;  
            console.log('google profile data:', profile);
    
            setLoggedInUser({
                username: profile.name,
                email: profile.email,
                country: 'USA',
                role: 'regular',
            });
    
            setIsLoggedIn(true);
            navigate(`/${profile.name}?country=USA&role=regular`);
        } catch (error) {
            console.error('google login error:', error);
            alert('failed to log in with Google. please try again.');
        }
    };
    

    const handleGoogleLoginError = (error) => {
        console.error('google login error:', error);
        alert('google login failed. please try again.');
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div className="login-container">
                    <Formik
                        initialValues={{ username: '', password: '', country: 'USA' }}
                        onSubmit={(values) => handleLogin(values)}
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
                                <br />
                                <div>
                                    <Field
                                        className="input"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                    />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="country">country:</label>
                                    <Field as="select" name="country" className="input">
                                        <option value="USA">USA (fahrenheit)</option>
                                        <option value="elsewhere">elsewhere (celsius)</option>
                                    </Field>
                                </div>
                                <br />
                                <button
                                    className="login-button"
                                    type="submit"
                                    disabled={!values.username || !values.password}
                                >
                                    login
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="google-login">
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                        />
                    </div>

                    <button onClick={() => navigate('/register')}>back to register</button>
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
