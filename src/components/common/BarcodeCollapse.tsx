import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BarcodeCollapseProps {
    isOpen: boolean;
    barcode: string;
}

const BarcodeCollapse: React.FC<BarcodeCollapseProps> = ({ isOpen, barcode }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="overflow-hidden border-t border-gray-200 flex justify-center"
                    initial={{ opacity: 0, maxHeight: 0, scale: 0.9 }}
                    animate={{ opacity: 1, maxHeight: 100, scale: 1 }}
                    exit={{ opacity: 0, maxHeight: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <img src={barcode} alt="Barcode" className="w-40 h-auto" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BarcodeCollapse;
