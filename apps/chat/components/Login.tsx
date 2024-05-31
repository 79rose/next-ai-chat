'use client';
import useAuthModal from '@/hooks/useAuthModal';
import useUserStore from '@/hooks/useUser';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { toast } from 'react-hot-toast';
const App: React.FC = () => {
  const { onClose } = useAuthModal();
  const { login, setToken } = useUserStore();
  const onFinish = (values: any) => {
    login('leewahjoel', 'leewahjoel');
    setToken('Bear test');
    onClose();
    toast.success('登录成功');
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
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default App;
