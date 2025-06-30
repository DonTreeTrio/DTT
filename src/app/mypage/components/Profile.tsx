'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import PurchaserModal from './PurchaserModal';

type ModalType = 'profile' | 'purchase' | null;

const styles = {
  container:
    'flex flex-row items-center gap-5 p-5 bg-white shadow-md rounded-lg w-full h-full',
  profileImage:
    'w-24 h-24 bg-black rounded-full flex items-center justify-center text-white',
  header: 'flex flex-row gap-5',
  nickname: 'text-xl font-bold',
  editIcon: 'cursor-pointer text-blue-500',
  rank: 'text-gray-500 shadow-md p-1 rounded-xl',
  infoContainer: 'flex flex-row items-center gap-3',
  purchaseLink: 'cursor-pointer text-blue-500',
  highlightText: 'text-yellow-500',
  modalOverlay:
    'fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50',
  modalContent: 'bg-white p-5 rounded-lg w-96',
};

interface ProfileProps {
  onEditClick: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onEditClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalType(null);
    }, 200);
  };

  const purchaseItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/50',
      name: '상품 1',
      price: 50000,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/50',
      name: '상품 2',
      price: 30000,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/50',
      name: '상품 3',
      price: 20000,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileImage}>프로필 사진</div>
        <div>
          <div className={styles.header}>
            <h1 className={styles.nickname}>
              닉네임{' '}
              <span onClick={onEditClick} className={styles.editIcon}>
                ✏️
              </span>
            </h1>
            <span className={styles.rank}>내 순위: 10위</span>
          </div>
          <div className={styles.infoContainer}>
            <span>
              현재 보유 포인트: <b>100,000,000</b>
            </span>
            <span
              onClick={() => openModal('purchase')}
              className={styles.purchaseLink}
            >
              구매내역
            </span>
          </div>
          <p>
            지금 <span className={styles.highlightText}>🍦 아이스크림 2개</span>{' '}
            살 수 있어요!
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.modalOverlay}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.modalContent}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              {modalType === 'profile' && (
                <ProfileModal closeModal={closeModal} />
              )}
              {modalType === 'purchase' && (
                <PurchaserModal
                  closeModal={closeModal}
                  purchaseItems={purchaseItems}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
