"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Cart } from "../page";

interface CartModalProps {
    cart: Cart;
    products: Product[];
    onClose: () => void;
    onCheckout: () => void;
    onRemoveItem: (id: number) => void;
    onUpdateQuantity: (id: number, quantity: number) => void;
}

const STYLES = {
    overlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4",
    modal: "bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden",
    header: "p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center",
    title: "text-lg sm:text-xl font-bold text-gray-800",
    closeButton: "text-gray-500 hover:text-gray-700 transition-colors p-1",
    content: "p-3 sm:p-4 overflow-y-auto max-h-[calc(90vh-180px)] sm:max-h-[calc(90vh-200px)]",
    item: "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b border-gray-100 last:border-0",
    itemImage: "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg",
    itemInfo: "flex-1 min-w-0",
    itemName: "font-medium text-gray-800 text-sm sm:text-base truncate",
    itemPrice: "text-blue-600 font-semibold text-sm sm:text-base",
    quantityContainer: "flex items-center gap-1 sm:gap-2 mt-2",
    quantityButton:
        "w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-sm sm:text-base",
    quantityInput: "w-10 sm:w-12 text-center border border-gray-300 rounded-lg p-1 text-sm sm:text-base",
    removeButton: "text-red-500 hover:text-red-700 transition-colors text-sm sm:text-base ml-2",
    footer: "p-3 sm:p-4 border-t border-gray-200 bg-gray-50",
    total: "flex justify-between items-center mb-3 sm:mb-4",
    totalLabel: "text-gray-600 text-sm sm:text-base",
    totalAmount: "text-lg sm:text-xl font-bold text-gray-800",
    checkoutButton:
        "w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base",
    emptyCart: "text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base",
};

const CartModal: React.FC<CartModalProps> = ({
    cart,
    products,
    onClose,
    onCheckout,
    onRemoveItem,
    onUpdateQuantity,
}) => {
    const cartItems = Object.entries(cart)
        .map(([id, quantity]) => {
            const product = products.find((p) => p.id === Number(id));
            if (!product) return null;
            return { ...product, quantity };
        })
        .filter((item): item is Product & { quantity: number } => item !== null);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={STYLES.overlay}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className={STYLES.modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={STYLES.header}>
                        <h2 className={STYLES.title}>장바구니</h2>
                        <button onClick={onClose} className={STYLES.closeButton}>
                            ✕
                        </button>
                    </div>

                    <div className={STYLES.content}>
                        {cartItems.length === 0 ? (
                            <div className={STYLES.emptyCart}>장바구니가 비어있습니다</div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className={STYLES.item}>
                                    <img src={item.image} alt={item.name} className={STYLES.itemImage} />
                                    <div className={STYLES.itemInfo}>
                                        <div className={STYLES.itemName}>{item.name}</div>
                                        <div className={STYLES.itemPrice}>{item.price.toLocaleString()} P</div>
                                        <div className={STYLES.quantityContainer}>
                                            <button
                                                className={STYLES.quantityButton}
                                                onClick={() =>
                                                    onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                                                }
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="0"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    onUpdateQuantity(item.id, parseInt(e.target.value) || 0)
                                                }
                                                className={STYLES.quantityInput}
                                            />
                                            <button
                                                className={STYLES.quantityButton}
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className={STYLES.removeButton}
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className={STYLES.footer}>
                            <div className={STYLES.total}>
                                <span className={STYLES.totalLabel}>총 결제금액</span>
                                <span className={STYLES.totalAmount}>{totalAmount.toLocaleString()} P</span>
                            </div>
                            <button className={STYLES.checkoutButton} onClick={onCheckout}>
                                결제하기
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CartModal;
