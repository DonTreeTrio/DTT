import React from "react";

const ProfileModal = ({ closeModal }: any) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">내 정보 수정</h2>

            <div className="mb-4">
                <label className="block mb-2">이름</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="이름을 입력하세요"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">닉네임</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="닉네임을 입력하세요"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">비밀번호</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="비밀번호를 입력하세요"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">프로필 이미지</label>
                <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>

            <div className="flex justify-end gap-2">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                    취소
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">저장</button>
            </div>
        </>
    );
};

export default ProfileModal;
