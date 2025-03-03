"use client";

import { FC } from "react";
import { Cart, Product } from "../page";

const STYLES = {
    modalOverlay: "fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50",
    modalContent: "bg-white p-6 rounded-lg shadow-lg w-1/3",
    modalHeader: "text-lg font-bold mb-4",
    modalFooter: "flex justify-between items-center mt-4",
    modalButton: "bg-green-700 text-white px-4 py-2 rounded",
    productItem: "flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-md",
    productDetails: "flex items-center space-x-4",
    productName: "font-bold",
    productImage: "w-16 h-16 object-cover",
    price: "text-gray-600 text-sm",
    productQuantity: "flex items-center space-x-2",
    quantityButton: "px-2 py-1 bg-gray-200 rounded-lg",
    removeButton: "text-red-500 text-sm",
    cartSummary: "flex justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-md",
    totalText: "font-bold",
    footer: "flex justify-between items-center mt-6",
};

interface CartModalProps {
    cart: Cart;
    products: Product[];
    onClose: () => void;
    onCheckout: () => void;
    onRemoveItem: (id: number) => void;
    onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartModal: FC<CartModalProps> = ({ cart, products, onClose, onCheckout, onRemoveItem, onUpdateQuantity }) => {
    const totalQuantity = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = products.reduce((total, product) => {
        if (cart[product.id]) {
            total += cart[product.id] * product.price;
        }
        return total;
    }, 0);

    return (
        <div className={STYLES.modalOverlay}>
            <div className={STYLES.modalContent}>
                <div className={STYLES.modalHeader}>장바구니</div>
                <div>
                    {Object.entries(cart).map(([id, quantity]) => {
                        const product = products.find((p) => p.id === Number(id));
                        if (!product) return null;

                        return (
                            <div key={id} className={STYLES.productItem}>
                                <div className={STYLES.productDetails}>
                                    <img src={product.image} alt={product.name} className={STYLES.productImage} />
                                    <div>
                                        <div className={STYLES.productName}>{product.name}</div>
                                        <div className={STYLES.price}>₩{product.price} P</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={STYLES.productQuantity}>
                                        <button
                                            className={STYLES.quantityButton}
                                            onClick={() => onUpdateQuantity(product.id, Math.max(quantity - 1, 1))}
                                        >
                                            -
                                        </button>
                                        <span>{quantity}개</span>
                                        <button
                                            className={STYLES.quantityButton}
                                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button className={STYLES.removeButton} onClick={() => onRemoveItem(product.id)}>
                                        삭제
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={STYLES.cartSummary}>
                    <div className={STYLES.totalText}>총 수량: {totalQuantity} 개</div>
                    <div className={STYLES.totalText}>총 금액: ₩{totalPrice.toLocaleString()}</div>
                </div>

                <div className={STYLES.footer}>
                    <button onClick={onClose} className={STYLES.modalButton}>
                        취소
                    </button>
                    <button onClick={onCheckout} className={STYLES.modalButton}>
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
