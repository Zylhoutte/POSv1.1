import { Button, Form, Input, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()


  function handlerSubmit(e) {
    e.preventDefault();

    axios
      .post('/api/admins/admin', { email, password })
      .then(res => {
        // handle success
        console.log(res.data);
        navigate('/dashboard')
      })
      .catch(err => {
        setError(err.response.data.message);
      });
  }


  return (
    <div className='form'>
        <h2>POS SYSTEM</h2>
        <p>Login Admin</p>
        <div className="form-group">
          <Form layout='vertical' onClick={handlerSubmit}>
            <FormItem name="userId" label="Email Address">
              <Input placeholder='Enter Email Address' onChange={e => setEmail(e.target.value)}
            value={email}/>
            </FormItem>
            <FormItem name="password" label="Password">
              <Input type="password" placeholder='Enter Password' value={password}
            onChange={e => setPassword(e.target.value)}/>
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Login</Button>

            </div>
          </Form>
        </div>
    </div>
  )
}

export default Login
