import React from "react";

const styles = {
    container: "bg-white shadow-md rounded-lg p-5 min-h-full flex flex-col",
    header: "bg-white z-10",
    title: "text-lg font-bold border-b pb-2 mb-4",
    content: "flex-1 overflow-y-auto",
};

const Card = ({ title, children, className = "" }: any) => (
    <div className={`${styles.container} ${className}`}>
        <div className={styles.header}>
            <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.content}>{children}</div>
    </div>
);

export default Card;
