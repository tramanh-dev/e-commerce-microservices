import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientDashboard = ({ setView, setEditingId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const PRODUCT_API = "http://localhost:8900/api/catalog/products";

    useEffect(() => {
        axios.get(PRODUCT_API)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi rồi", err);
                setLoading(false);
            });
    }, []);
    const addToCart = (product) => {
        // 1. Lấy giỏ hàng cũ từ máy ra
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // 2. Kiểm tra xem sách này đã có trong giỏ chưa
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            // Có rồi thì tăng số lượng lên 1
            cart[existingIndex].quantity += 1;
        } else {
            // Chưa có thì thêm mới vào giỏ
            cart.push({ ...product, quantity: 1 });
        }

        // 3. Lưu ngược lại vào máy
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Đã thêm " + product.productName + " vào giỏ hàng!");
    };
    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* header */}
            <nav className="navbar navbar-expand-lg navbar-dark shadow-sm mb-4" style={{ backgroundColor: '#4e73df' }}>
                <div className="container">
                    <a className="navbar-brand font-weight-bold" href="#" onClick={() => setView('clients')}>
                        Book Store
                    </a>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-link text-white position-relative mr-3 p-0"
                            onClick={() => setView('wishlist')}
                            title="Yêu thích"
                        >
                            <span style={{ fontSize: '1.5rem' }}>❤️</span>
                            <span className="badge badge-pill badge-light position-absolute" style={{ top: '-5px', right: '-10px', fontSize: '0.6rem' }}>0</span>
                        </button>
                        <button
                            className="btn btn-link text-white position-relative mr-4 p-0"
                            onClick={() => setView('cart')}
                            title="Giỏ hàng"
                        >
                            <span style={{ fontSize: '1.5rem' }}>🛒</span>
                            <span className="badge badge-pill badge-danger position-absolute" style={{ top: '-5px', right: '-10px', fontSize: '0.6rem' }}>!</span>
                        </button>
                        <button className="btn btn-outline-light btn-sm ml-2" onClick={() => setView('dashboard')}>
                            ⚙️
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container pb-5">
                <h3 className="font-weight-bold text-dark mb-4">Danh Mục Sách Mới</h3>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-2 text-muted">Đang lấy sách từ kho...</p>
                    </div>
                ) : (
                    <div className="row">
                        {products.map((p) => (
                            <div className="col-md-3 mb-4" key={p.id}>
                                <div className="card h-100 shadow-sm border-0 card-hover-effect" style=
                                    {{
                                        borderRadius: '15px', overflow: 'hidden'

                                    }}
                                    onClick={() => {
                                        setEditingId(p.id);
                                        setView('product-detail');
                                    }}
                                >
                                    <img
                                        src={
                                            p.imageUrl
                                                ? (p.imageUrl.startsWith('http')
                                                    ? p.imageUrl
                                                    : p.imageUrl.startsWith('/')
                                                        ? p.imageUrl
                                                        : `http://localhost:8810/uploads/${p.imageUrl}`)
                                                : 'https://placehold.co/150x200?text=No+Image'
                                        }
                                        className="card-img-top"
                                        alt={p.productName}
                                        style={{ height: '250px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/150x200?text=Image+Error';
                                        }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title font-weight-bold text-dark text-truncate">{p.productName}</h6>
                                        <p className="text-muted small mb-1">Tác giả: {p.author}</p>
                                        <div className="mt-auto">
                                            <p className="text-danger font-weight-bold mb-2">
                                                {p.price?.toLocaleString()} VNĐ
                                            </p>
                                            <button className="btn btn-outline-primary btn-lg px-5 mr-3" style={{ borderRadius: '12px' }} onClick={() => addToCart(product)}>
                                                🛒 Thêm giỏ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">Kho sách hiện đang trống.</p>
                    </div>
                )}
            </div>

            <style>
                {`
                    .card-hover-effect {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .card-hover-effect:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                    }
                `}
            </style>
        </div>
    );
};

export default ClientDashboard;