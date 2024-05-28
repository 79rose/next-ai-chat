'use client';

import Modal from '@/components/Modal';
import useSettingModal from '@/hooks/useSettingModal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import Login from './Login';
import Setting from './setting';
const SettingModal = () => {
  const router = useRouter();
  const { isOpen, onClose } = useSettingModal();

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {}, [router, onClose]);
  return (
    <Modal isOpen={isOpen} onChange={onChange} title={'设置'}>
      <Setting></Setting>
    </Modal>
  );
};

export default SettingModal;
