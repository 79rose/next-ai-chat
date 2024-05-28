'use client';
import AuthModal from '@/components/AuthModal';
import SettingModal from '@/components/SettingModal';
import { useEffect, useState } from 'react';
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AuthModal />
      <SettingModal />
    </>
  );
};

export default ModalProvider;
