import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8900/api/catalog/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi:", err);
                setLoading(false);
            });
    }, []);
    if (loading) return <div className="text-center mt-5"> ... </div>;
    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4 font-weight-bold text-dark ">Quản Lý Kho Sách</h2>
            <div className="row mb-4 px-2">
                <div className="col-md-6">
                    <div className="input-group shadow-sm bg-white"
                        style={{ borderRadius: '20px', border: '1px solid #e2e8f0', width: '25cm', height: '55px', overflow: 'hidden' }}>
                        <span className="input-group-text bg-white border-0 text-muted px-2" style={{ fontSize: '0.8rem' }}>🔍</span>
                        <input
                            type="text"
                            className="form-control border-0 p-0"
                            placeholder="Tìm..."
                            style={{ boxShadow: 'none', fontSize: '0.85rem', backgroundColor: 'transparent' }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-6 text-right d-flex justify-content-end align-items-center">
                    <button className="btn btn-light shadow-sm mr-2 px-4 " style={{ borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <span className="mr-1">≡</span> Filter
                    </button>
                    <button className="btn btn-primary shadow-sm px-4" style={{ borderRadius: '10px', fontWeight: '500' }}>
                        + Thêm sách
                    </button>
                </div>
            </div>

            <div className="row">
                {products.map(p => (
                    <div className="col-md-3 mb-4" key={p.id}>
                        <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                            <img
                                src={p.imageUrl || 'https://via.placeholder.com/150x200?text=No+Image'}
                                className="card-img-top"
                                alt={p.productName}
                                style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                            />

                            <div className="card-body text-center d-flex flex-column">
                                <h6 className="card-title font-weight-bold text-dark">{p.productName}</h6>
                                <p className="text-muted small mb-1">Tác giả: {p.author}</p>
                                <span className="badge badge-pill badge-info mb-2 mx-auto" style={{ width: 'fit-content' }}>
                                    {p.category}
                                </span>
                                <p className="text-muted small">{p.description}</p>
                                <p className="text-danger font-weight-bold mt-auto">
                                    {p.price?.toLocaleString()} VNĐ
                                </p>

                                <div className="d-flex justify-content-center mt-2">
                                    <button className="btn btn-sm btn-outline-primary mr-2">Sửa</button>
                                    <button className="btn btn-sm btn-outline-danger">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {products.length === 0 && <p className="text-center">Chưa có cuốn sách nào!</p>}
        </div>
    );
};

export default ProductDashboard;