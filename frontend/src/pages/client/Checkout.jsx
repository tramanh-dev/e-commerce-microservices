import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ setView, totalPrice, orderId }) => {
    const [method, setMethod] = useState('vnpay');

    const handleConfirmPayment = async () => {
        if (method === 'vnpay') {
            try {
                const res = await axios.get(`http://localhost:8900/api/payment/vnpay-link`, {
                    params: { orderId: orderId, amount: totalPrice }
                });
                if (res.data.url) window.location.href = res.data.url;
            } catch (err) {
                alert("Vẫn lỗi 404 VNPay? Check lại tên Service trong Zuul nhé!");
            }
        } else {
            alert("Thanh toán tiền mặt thành công!");
            setView('clients');
        }
    };

    return (
        <div className="container py-5">
            <h2 className="font-weight-bold mb-4">Hình thức thanh toán 💳</h2>

            <div className="row">
                <div className="col-md-8">
                    {/* Lựa chọn VNPay */}
                    <div
                        className={`card mb-3 p-3 shadow-sm border-0 ${method === 'vnpay' ? 'border-primary' : ''}`}
                        style={{ cursor: 'pointer', borderRadius: '15px', border: method === 'vnpay' ? '2px solid #4e73df' : 'none' }}
                        onClick={() => setMethod('vnpay')}
                    >
                        <div className="d-flex align-items-center">
                            <input type="radio" checked={method === 'vnpay'} readOnly className="mr-3" />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 font-weight-bold">Thanh toán qua VNPAY</h6>
                                <small className="text-muted">Thanh toán nhanh bằng QR Code, ATM, Thẻ quốc tế...</small>
                            </div>
                            <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" width="80" alt="vnpay" />
                        </div>
                    </div>

                    {/* Lựa chọn Tiền mặt */}
                    <div
                        className={`card p-3 shadow-sm border-0 ${method === 'cod' ? 'border-primary' : ''}`}
                        style={{ cursor: 'pointer', borderRadius: '15px', border: method === 'cod' ? '2px solid #4e73df' : 'none' }}
                        onClick={() => setMethod('cod')}
                    >
                        <div className="d-flex align-items-center">
                            <input type="radio" checked={method === 'cod'} readOnly className="mr-3" />
                            <div className="flex-grow-1">
                                <h6 className="mb-0 font-weight-bold">Thanh toán tiền mặt (COD)</h6>
                                <small className="text-muted">Trả tiền khi shipper giao sách tận nơi.</small>
                            </div>
                            <span style={{ fontSize: '1.5rem' }}>🚚</span>
                        </div>
                    </div>
                </div>

                {/* Tóm tắt đơn hàng  */}
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '20px', backgroundColor: '#f8fafc' }}>
                        <h5 className="font-weight-bold mb-3">Tổng thanh toán</h5>
                        <h3 className="text-danger font-weight-bold">{totalPrice?.toLocaleString()} VNĐ</h3>
                        <hr />
                        <button
                            className="btn btn-primary btn-block py-3 font-weight-bold"
                            style={{ borderRadius: '15px' }}
                            onClick={handleConfirmPayment}
                        >
                            XÁC NHẬN THANH TOÁN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;