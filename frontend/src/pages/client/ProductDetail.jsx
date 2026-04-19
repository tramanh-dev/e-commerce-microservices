import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetail = ({ productId, setView }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const PRODUCT_API = `http://localhost:8900/api/catalog/products/${productId}`;

    useEffect(() => {
        axios.get(PRODUCT_API)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi rồi", err);
                setLoading(false);
            });
    }, [productId]);
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
    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (!product) return <div className="text-center mt-5">Không tìm thấy sách này rồi Trâm Anh ơi! 😢</div>;

    return (
        <div className="container py-5">
            <button className="btn btn-link text-decoration-none mb-4 p-0" onClick={() => setView('clients')}>
                ⬅️ Quay lại danh sách
            </button>

            <div className="row bg-white shadow-sm p-4" style={{ borderRadius: '20px' }}>
                {/* Bên trái: Hình ảnh */}
                <div className="col-md-5 text-center p-3">
                    <img
                        src={
                            product.imageUrl
                                ? (product.imageUrl.startsWith('http')
                                    ? product.imageUrl
                                    : product.imageUrl.startsWith('/')
                                        ? product.imageUrl
                                        : `http://localhost:8810/uploads/${product.imageUrl}`)
                                : 'https://placehold.co/150x200?text=No+Image'
                        }
                        className="card-img-top"
                        alt={product.productName}
                        style={{ height: '700px', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/150x200?text=Image+Error';
                        }}
                    />
                </div>

                {/* Bên phải: Thông tin */}
                <div className="col-md-7 pl-md-5">
                    <span className="badge badge-pill badge-primary mb-2 px-3 py-2">{product.category}</span>
                    <h1 className="font-weight-bold text-dark mb-3">{product.productName}</h1>

                    <div className="d-flex align-items-center mb-3">
                        <span className="text-warning mr-2">⭐⭐⭐⭐⭐</span>
                        <small className="text-muted">(120 đánh giá)</small>
                    </div>

                    <h2 className="text-danger font-weight-bold mb-4">
                        {product.price?.toLocaleString()} VNĐ
                    </h2>

                    <div className="mb-4">
                        <h6 className="font-weight-bold">Thông tin chi tiết:</h6>
                        <ul className="list-unstyled text-muted">
                            <li><strong>Tác giả:</strong> {product.author}</li>
                            <li><strong>Trạng thái:</strong> <span className="text-success">Còn hàng</span></li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h6 className="font-weight-bold">Mô tả sách:</h6>
                        <p className="text-muted" style={{ lineHeight: '1.6' }}>
                            {product.description || "Cuốn sách này hiện chưa có mô tả chi tiết từ nhà xuất bản."}
                        </p>
                    </div>

                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-primary btn-lg px-5 mr-3" style={{ borderRadius: '12px' }} onClick={() => addToCart(product)}>
                            🛒 Thêm giỏ
                        </button>
                        <button className="btn btn-primary btn-lg px-5" style={{ borderRadius: '12px', backgroundColor: '#4e73df' }}>
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="font-weight-bold mb-4">Sách cùng thể loại</h4>
                <div className="text-muted italic">Đang cập nhật thêm...</div>
            </div>
        </div>
    );
};

export default ProductDetail;