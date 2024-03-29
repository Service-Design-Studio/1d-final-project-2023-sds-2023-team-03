import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { Box, Group, Button } from '@mantine/core'
import { TextInput, PasswordInput } from '@mantine/core';
import axios from 'axios'
import { useDisclosure } from '@mantine/hooks';
import ErrorModal from '../components/ErrorModal.jsx'

function Login({handleLogin}) {
    const nav = useNavigate();
    const [details, setDetails] = useState({
        username: "",
        password: "",
        errors: ""
    })
    const [errorModal, errorModalHandler] = useDisclosure(false);
    const loginForm = useForm({
        initialValues: {
            username: '',
            password: ''
        },

        validate: (values) => ({
            username: !(/^[A-Za-z0-9]*$/.test(values.username))
                      ? "Username must be alphanumeric"
                      : !(/[A-Za-z0-9]{4,}/.test(values.username))
                      ? "Username must have 4 or more characters"
                      : values.username.length < 1
                      ? "Username is blank"
                      : null
        })
    })

    function handleSubmit(loginDetails) {
        const user = {
            username: loginDetails.username,
            password: loginDetails.password
        }

        axios.post('https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/session', {user}, {withCredentials: true})
            .then((res) => {
                if (res.data.logged_in) {
                    handleLogin(res.data);
                    nav("/");
                } else {
                    setDetails({
                        errors: res.data.errors
                    })
                    errorModalHandler.open()
                }
            })
            .catch((err) => {
                console.log("Login error", err);
                errorModalHandler.open();
            })
    }

    return (
      <div>
          <h1>Login</h1>
          <ErrorModal opened={errorModal} open={errorModalHandler.open} close={errorModalHandler.close} title="Login failed" content="Your credentials are invalid, or your network may be down."/>
          <Box maw={300} mx="auto">
            <form onSubmit={loginForm.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                  withAsterisk
                  label="Username"
                  placeholder="EnterYourUsername"
                  id="username-input"
                  {...loginForm.getInputProps('username')}
                />

                <PasswordInput
                  withAsterisk
                  label="Password"
                  placeholder="*******"
                  id = "password-input"
                  {...loginForm.getInputProps('password')}
                />

                <Group position="right" mt="md">
                    <Button id="submit-button" type="submit">Submit</Button>
                </Group>
            </form>
          </Box>
      </div>
    );
}

export default Login;
