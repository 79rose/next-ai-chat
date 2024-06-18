'use client';

import Modal from '@/components/Modal';
import useUserModal from '@/hooks/useUserModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import Login from './Login';
import User from './User';
const UserModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useUserModal();

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {}, [router, onClose]);
  return (
    <Modal isOpen={isOpen} onChange={onChange} title={'用户中心'}>
      <User></User>
    </Modal>
  );
};

export default UserModal;
