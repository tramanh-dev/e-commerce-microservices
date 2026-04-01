import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = ({ setView, productId }) => {
    const [product, setProduct] = useState({
        productName: '', author: '', price: '', category: '', description: '', availability: 1
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (productId) {
            axios.get(`http://localhost:8900/api/catalog/products/${productId}`)
                .then(res => {
                    setProduct(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Lỗi lấy dữ liệu cũ:", err);
                    alert("Không tìm thấy thông tin sách này!");
                    setLoading(false);
                });
        }
    }, [productId]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:8900/api/catalog/products/${productId}`,
                product
            );

            if (response.status === 200 || response.status === 204) {
                alert("Cập nhật sách thành công");
                setView('products');
            }
        } catch (err) {
            console.error("Lỗi cập nhật:", err.response?.data);
            alert("Lỗi rồi: " + (err.response?.data?.message || "Kiểm tra lại Redis/Server nhé!"));
        }
    };
    const handleDelete = async () => {
        if (window.confirm("Có chắc chắn muốn xóa cuốn sách này không?")) {
            try {
                const response = await axios.delete(`http://localhost:8900/api/catalog/products/${productId}`);

                if (response.status === 200 || response.status === 204) {
                    alert("Đã xóa sách thành công");
                    setView('products');
                }
            } catch (err) {
                console.error("Lỗi khi xóa:", err);
                alert("Không xóa được rồi: " + (err.response?.data?.message || "Lỗi Server"));
            }
        }
    };
    if (loading) return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4" style={{ borderRadius: '15px', maxWidth: '700px', margin: '0 auto', border: 'none' }}>
                <div className="d-flex align-items-center mb-4">
                    <button className="btn btn-light rounded-circle mr-3" onClick={() => setView('products')}>
                        ←
                    </button>
                    <h4 className="mb-0 font-weight-bold">Chỉnh Sửa Thông Tin Sách</h4>
                </div>

                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <label className="small font-weight-bold text-muted">Tên cuốn sách</label>
                            <input type="text" className="form-control" style={{ borderRadius: '10px' }}
                                value={product.productName} required
                                onChange={e => setProduct({ ...product, productName: e.target.value })} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="small font-weight-bold text-muted">Tác giả</label>
                            <input type="text" className="form-control" style={{ borderRadius: '10px' }}
                                value={product.author} required
                                onChange={e => setProduct({ ...product, author: e.target.value })} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="small font-weight-bold text-muted">Danh mục</label>
                            <input type="text" className="form-control" style={{ borderRadius: '10px' }}
                                value={product.category} required
                                onChange={e => setProduct({ ...product, category: e.target.value })} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="small font-weight-bold text-muted">Giá tiền (VNĐ)</label>
                            <input type="number" className="form-control" style={{ borderRadius: '10px' }}
                                value={product.price} required
                                onChange={e => setProduct({ ...product, price: e.target.value })} />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="small font-weight-bold text-muted">Trạng thái kho</label>
                            <select className="form-control" style={{ borderRadius: '10px' }}
                                value={product.availability}
                                onChange={e => setProduct({ ...product, availability: e.target.value })}>
                                <option value={1}>Còn hàng</option>
                                <option value={0}>Hết hàng</option>
                            </select>
                        </div>

                        <div className="col-md-12 mb-4">
                            <label className="small font-weight-bold text-muted">Mô tả nội dung</label>
                            <textarea className="form-control" rows="4" style={{ borderRadius: '10px' }}
                                value={product.description}
                                onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-2 mt-4">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary shadow-sm flex-fill"
                            style={{ borderRadius: '8px', fontWeight: '500', padding: '8px 0' }}
                        >
                            <i className="fas fa-save mr-1"></i> Lưu
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger shadow-sm flex-fill"
                            style={{ borderRadius: '8px', fontWeight: '500', padding: '8px 0' }}
                            onClick={handleDelete}
                        >
                            <i className="fas fa-trash-alt mr-1"></i> Xóa
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-light shadow-sm flex-fill"
                            style={{ borderRadius: '8px', fontWeight: '500', padding: '8px 0', border: '1px solid #e2e8f0' }}
                            onClick={() => setView('products')}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;