"use client";

import { useState } from "react";
import CartModal from "./components/CartModal";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const products: Product[] = [
    { id: 1, name: "맥도날드 기프티콘", price: 100000, image: "/mcdonalds.png" },
    { id: 2, name: "맥도날드 기프티콘", price: 200000, image: "/mcdonalds.png" },
    { id: 3, name: "배달의 민족 5천원 교환권", price: 100000, image: "/baemin.png" },
    { id: 4, name: "배달의 민족 만원 교환권", price: 200000, image: "/baemin.png" },
];

export interface Cart {
    [key: number]: number;
}

const STYLES = {
    container: "p-6",
    header: "flex justify-between items-center mb-4",
    title: "text-lg font-bold",
    input: "border p-2 w-full my-4",
    grid: "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", // 반응형 grid 스타일
    card: "border p-4 rounded-lg shadow-md",
    image: "w-full h-32 object-cover",
    productName: "mt-2 font-bold",
    price: "text-gray-600",
    button: "mt-2 bg-green-500 text-white px-4 py-1 rounded",
    footer: "flex justify-between items-center mt-6",
    cartSummary: "text-lg font-bold",
    checkoutButton: "bg-green-700 text-white px-6 py-2 rounded",
};

export default function Home() {
    const [cart, setCart] = useState<Cart>({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (id: number) => {
        setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCheckout = () => {
        // 결제 로직을 여기에 추가할 수 있습니다.
        alert("결제가 완료되었습니다!");
        closeModal();
    };

    // 상품 삭제 함수
    const removeItem = (id: number) => {
        const newCart = { ...cart };
        delete newCart[id];
        setCart(newCart);
    };

    // 수량 수정 함수
    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) => ({ ...prev, [id]: quantity }));
    };

    return (
        <div className={STYLES.container}>
            <div className={STYLES.header}>
                <div className={STYLES.title}>현재 보유 포인트: 100,000,000</div>
                <div className={STYLES.footer}>
                    <div className={STYLES.cartSummary}>
                        총 {Object.values(cart).reduce((a, b) => a + b, 0)} 개의 상품
                    </div>
                    <button className={STYLES.checkoutButton} onClick={openModal}>
                        결제하기
                    </button>
                </div>
            </div>
            <input type="text" placeholder="Search" className={STYLES.input} />
            <div className={STYLES.grid}>
                {products.map((product) => (
                    <div key={product.id} className={STYLES.card}>
                        <img src={product.image} alt={product.name} className={STYLES.image} />
                        <div className={STYLES.productName}>{product.name}</div>
                        <div className={STYLES.price}>₩{product.price} P</div>
                        <button onClick={() => addToCart(product.id)} className={STYLES.button}>
                            담기
                        </button>
                    </div>
                ))}
            </div>

            {/* CartModal 컴포넌트 사용 */}
            {isModalOpen && (
                <CartModal
                    cart={cart}
                    products={products}
                    onClose={closeModal}
                    onCheckout={handleCheckout}
                    onRemoveItem={removeItem}
                    onUpdateQuantity={updateQuantity}
                />
            )}
        </div>
    );
}
