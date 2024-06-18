'use client';
import { Auth } from '@/api';
import useAuthModal from '@/hooks/useAuthModal';
import useUserStore from '@/hooks/useUser';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
const App: React.FC = () => {
  const { onClose } = useAuthModal();
  const { login, setToken } = useUserStore();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('login');
  const onFinish = async (_values: any) => {
    try {
      if (type === 'register') {
        const { data } = await Auth.register({
          name: userName,
          password,
        });

        login(data.user_id, userName, data.user_avatar);
        setToken(data.token);
      } else {
        const { data } = await Auth.login({
          name: userName,
          password,
        });
        console.log(data, 'data');
        login(data.user_id, userName, data.user_avatar);
        setToken(data.token);
      }
    } catch (error) {
      console.log(error);
      type === 'login' ? toast.error('登录失败') : toast.error('注册失败');
      return;
    }
    onClose();

    type === 'login' ? toast.success('登录成功') : toast.success('注册成功');
  };
  const toggleType = () => {
    if (type === 'login') {
      setType('register');
    } else {
      setType('login');
    }
  };
  return (
    <>
      <div
        className="
        pt-16 md:pt-0"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>
          {/* <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-form-button"
            >
              {type === 'login' ? 'log in' : ' log up'}
            </Button>
            <div className="ml-auto mt-2 text-right " onClick={toggleType}>
              Or <a>{type === 'login' ? '注册' : '登录'}</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default App;
