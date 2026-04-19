import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Cart = ({ setView, setEditingId, setTotalAmount }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const updateQuantity = (id, delta) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const removeItem = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };
    const handlePayment = async () => {
        try {
            const userId = 11;
            const cartId = "test1";
            const orderResponse = await axios.post(
                `http://localhost:8900/api/shop/order/${userId}`,
                null,
                { params: { cartId: cartId } }
            );
            if (orderResponse.status === 201 || orderResponse.data) {
                const finalId = orderResponse.data.id || 888;
                setEditingId(finalId);
                setTotalAmount(totalPrice);

                console.log("Nhảy trang Checkout với ID:", finalId);
                setView('checkout');
            }
        } catch (err) {
            console.error("Lỗi tạo đơn:", err);
            alert("Lỗi rồi nhưng hihi vẫn cho sang Checkout test VNPay nha!");
            setEditingId(888);
            setTotalAmount(totalPrice);
            setView('checkout');
        }
    };
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="font-weight-bold">Giỏ hàng của bạn 🛒</h2>
                <button className="btn btn-outline-secondary" onClick={() => setView('clients')}>Tiếp tục mua sắm</button>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-5 shadow-sm bg-white" style={{ borderRadius: '20px' }}>
                    <p className="text-muted">Giỏ hàng trống trơn hà Trâm Anh ơi! 😅</p>
                    <button className="btn btn-primary" onClick={() => setView('clients')}>Đi chọn sách ngay</button>
                </div>
            ) : (
                <div className="row">
                    {/* Danh sách sản phẩm */}
                    <div className="col-md-8">
                        <div className="card border-0 shadow-sm p-3" style={{ borderRadius: '20px' }}>
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr className="text-muted small text-uppercase">
                                        <th>Sách</th>
                                        <th>Giá</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-right">Tổng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id} className="border-bottom">
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={
                                                            item.imageUrl
                                                                ? (item.imageUrl.startsWith('http')
                                                                    ? item.imageUrl
                                                                    : item.imageUrl.startsWith('/')
                                                                        ? item.imageUrl
                                                                        : `http://localhost:8810/uploads/${item.imageUrl}`)
                                                                : 'https://placehold.co/150x200?text=No+Image'
                                                        }
                                                        style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '5px' }}
                                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x200?text=Loi'; }}
                                                    />
                                                    <span className="ml-3 font-weight-bold">{item.productName}</span>
                                                </div>
                                            </td>
                                            <td>{item.price?.toLocaleString()}</td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                                    <button className="btn btn-light" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                    <button className="btn btn-white px-3" disabled>{item.quantity}</button>
                                                    <button className="btn btn-light" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                                </div>
                                            </td>
                                            <td className="text-right font-weight-bold">{(item.price * item.quantity).toLocaleString()}</td>
                                            <td className="text-right">
                                                <button className="btn btn-sm text-danger" onClick={() => removeItem(item.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Tổng cộng & Thanh toán */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', backgroundColor: '#f8fafc' }}>
                            <h5 className="font-weight-bold mb-4">Tóm tắt đơn hàng</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tạm tính:</span>
                                <span>{totalPrice.toLocaleString()} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Phí vận chuyển:</span>
                                <span className="text-success">Miễn phí</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong className="h5">Tổng cộng:</strong>
                                <strong className="h5 text-danger">{totalPrice.toLocaleString()} VNĐ</strong>
                            </div>
                            <button
                                className="btn btn-primary btn-block py-3"
                                style={{ borderRadius: '15px', fontWeight: 'bold' }}
                                onClick={handlePayment}
                            >
                                THANH TOÁN
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;