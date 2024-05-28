'use client';

import Modal from '@/components/Modal';
import useAuthModal from '@/hooks/useAuthModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Login from './Login';
const AuthModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useAuthModal();

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {}, [router, onClose]);
  return (
    <Modal
      title="Welcome Back!"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Login></Login>
    </Modal>
  );
};

export default AuthModal;
