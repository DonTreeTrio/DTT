import React from "react";

const styles = {
    input: "w-full p-2 border border-gray-300 rounded-lg",
    button: "px-4 py-2 text-white rounded-lg",
    cancelButton: "bg-gray-500",
    saveButton: "bg-blue-500",
};

const ProfileModal = ({ closeModal }: any) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">내 정보 수정</h2>

            <div className="mb-4">
                <label className="block mb-2">이름</label>
                <input type="text" className={styles.input} placeholder="이름을 입력하세요" />
            </div>

            <div className="mb-4">
                <label className="block mb-2">닉네임</label>
                <input type="text" className={styles.input} placeholder="닉네임을 입력하세요" />
            </div>

            <div className="mb-4">
                <label className="block mb-2">비밀번호</label>
                <input type="password" className={styles.input} placeholder="비밀번호를 입력하세요" />
            </div>

            <div className="mb-4">
                <label className="block mb-2">프로필 이미지</label>
                <input type="file" className={styles.input} />
            </div>

            <div className="flex justify-end gap-2">
                <button onClick={closeModal} className={`${styles.button} ${styles.cancelButton}`}>
                    취소
                </button>
                <button className={`${styles.button} ${styles.saveButton}`}>저장</button>
            </div>
        </>
    );
};

export default ProfileModal;
