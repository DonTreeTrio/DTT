"use client";

import { useState, useEffect } from "react";
import CartModal from "./components/CartModal";
import { motion } from "framer-motion";

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "맥도날드 기프티콘",
        price: 100000,
        image: "/mcdonalds.png",
        category: "식사",
        description: "맥도날드 1만원 상당의 기프티콘입니다.",
    },
    {
        id: 2,
        name: "맥도날드 기프티콘",
        price: 200000,
        image: "/mcdonalds.png",
        category: "식사",
        description: "맥도날드 2만원 상당의 기프티콘입니다.",
    },
    {
        id: 3,
        name: "배달의 민족 5천원 교환권",
        price: 100000,
        image: "/baemin.png",
        category: "배달",
        description: "배달의 민족 5천원 상당의 교환권입니다.",
    },
    {
        id: 4,
        name: "배달의 민족 만원 교환권",
        price: 200000,
        image: "/baemin.png",
        category: "배달",
        description: "배달의 민족 1만원 상당의 교환권입니다.",
    },
];

export interface Cart {
    [key: number]: number;
}

const STYLES = {
    container: "p-4 sm:p-6 max-w-7xl mx-auto",
    header: "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
    title: "text-xl sm:text-2xl font-bold text-gray-800",
    searchContainer: "relative w-full max-w-md",
    searchInput:
        "w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all",
    searchIcon: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
    categoryContainer: "flex gap-2 mb-6 overflow-x-auto pb-2",
    categoryButton: "px-4 py-2 rounded-full text-sm font-medium transition-all",
    categoryButtonActive: "bg-blue-500 text-white",
    categoryButtonInactive: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
    card: "bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden",
    imageContainer: "relative h-48 overflow-hidden",
    image: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
    cardContent: "p-4",
    productName: "text-lg font-bold text-gray-800 mb-1",
    description: "text-sm text-gray-600 mb-2 line-clamp-2",
    price: "text-lg font-semibold text-blue-600 mb-3",
    button: "w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 font-medium",
    footer: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center",
    cartSummary: "text-lg font-bold text-gray-800",
    checkoutButton:
        "bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium",
    pointBadge: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium",
};

export default function Home() {
    const [cart, setCart] = useState<Cart>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "전체" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory]);

    const categories = ["전체", ...new Set(products.map((product) => product.category))];

    const addToCart = (id: number) => {
        setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCheckout = () => {
        alert("결제가 완료되었습니다!");
        closeModal();
    };

    const removeItem = (id: number) => {
        const newCart = { ...cart };
        delete newCart[id];
        setCart(newCart);
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) => ({ ...prev, [id]: quantity }));
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((total, [id, quantity]) => {
        const product = products.find((p) => p.id === Number(id));
        return total + (product?.price || 0) * quantity;
    }, 0);

    return (
        <div className={STYLES.container}>
            <div className={STYLES.header}>
                <div className="flex items-center gap-3">
                    <h1 className={STYLES.title}>상품 구매</h1>
                    <span className={STYLES.pointBadge}>100,000,000 P</span>
                </div>
                <div className={STYLES.searchContainer}>
                    <span className={STYLES.searchIcon}>🔍</span>
                    <input
                        type="text"
                        placeholder="상품 검색..."
                        className={STYLES.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={STYLES.categoryContainer}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${STYLES.categoryButton} ${
                            selectedCategory === category ? STYLES.categoryButtonActive : STYLES.categoryButtonInactive
                        }`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className={STYLES.grid}>
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        className={STYLES.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={STYLES.imageContainer}>
                            <img src={product.image} alt={product.name} className={STYLES.image} />
                        </div>
                        <div className={STYLES.cardContent}>
                            <div className={STYLES.productName}>{product.name}</div>
                            <p className={STYLES.description}>{product.description}</p>
                            <div className={STYLES.price}>{product.price.toLocaleString()} P</div>
                            <button onClick={() => addToCart(product.id)} className={STYLES.button}>
                                장바구니 담기
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {totalItems > 0 && (
                <div className={STYLES.footer}>
                    <div className={STYLES.cartSummary}>
                        총 {totalItems}개 상품 • {totalPrice.toLocaleString()} P
                    </div>
                    <button className={STYLES.checkoutButton} onClick={openModal}>
                        결제하기
                    </button>
                </div>
            )}

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
