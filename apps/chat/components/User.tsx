import { UserApi } from '@/api';
import useUserStore from '@/hooks/useUser';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';
export default function User() {
  const {
    userImg: user_img,
    userName: user_name,
    setUser,
    userId,
  } = useUserStore();
  const [userName, setUserName] = useState(user_name);
  const [loading, setLoading] = useState(false);
  const [userImg, setUserImg] = useState(user_img);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as any);
    });
    setUploading(true);
    // You can use any AJAX library you like
    // fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFileList([]);
    //     message.success('upload successfully.');
    //   })
    //   .catch(() => {
    //     message.error('upload failed.');
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });
  };

  const props: UploadProps = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  const onFinish = async (values: any) => {
    // console.log('Received values of form: ', values);
    try {
      const { data } = await UserApi.updateUserInfo(userId, {
        username: userName,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      //   getBase64(info.file.originFileObj as FileType, (url) => {
      //     setLoading(false);
      //     setImageUrl(url);
      //   });
      setLoading(false);
      setUserImg(info.file.response.url);
    }
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as any);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <Form
      name="userInfo"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: false, message: 'Please input your Username!' }]}
      >
        <div className="flex items-center gap-2">
          <span className="w-16 text-gray-500">用户名:</span>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </Form.Item>
      <Form.Item
        name="userImg"
        rules={[{ required: true, message: 'Please input your userImg!' }]}
      >
        <div className="flex items-center gap-2">
          <span className="w-16 text-gray-500">头像:</span>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            onChange={handleChange}
            onPreview={onPreview}
          >
            {userImg ? (
              <img
                src={userImg}
                alt="avatar"
                style={{ width: '100%' }}
                className="rounded-full"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </Form.Item>
      {/* 
           确认按钮
          */}
      <Form.Item>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setUser(userName, userImg)}
        >
          确认
        </button>
      </Form.Item>
    </Form>
  );
}
