import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ setView }) => {
    const [product, setProduct] = useState({
        productName: '', price: '', category: '', author: '', description: ''
    });
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (e) => { setImageFile(e.target.files[0]); };
    const handleAddProduct = async (e) => {
        e.preventDefault(); if (!imageFile) {
            alert("Chọn ảnh");
            return;
        }
        const formData = new FormData();
        formData.append('product', JSON.stringify({
            productName: product.productName,
            price: product.price,
            category: product.category,
            author: product.author,
            description: product.description,
            availability: 1
        }));
        formData.append('file', imageFile);
        try {
            const response = await axios.post('http://localhost:8900/api/catalog/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201 || response.status === 200) {
                alert("Thêm sách thành công");
                setView('products');
            }
        } catch (err) {
            console.error("Lỗi chi tiết:", err.response?.data);
            alert("Lỗi rồi: " + (err.response?.data?.message || "Lỗi 500 - Kiểm tra lại Redis/Backend nhé!"));
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4" style={{ borderRadius: '15px', maxWidth: '600px', margin: '0 auto' }}>
                <h4 className="text-center mb-4">Thêm Sản Phẩm Mới</h4>
                <form onSubmit={handleAddProduct}>
                    <input type="text" className="form-control mb-2" placeholder="Tên sách" required
                        onChange={e => setProduct({ ...product, productName: e.target.value })} />

                    <input type="text" className="form-control mb-2" placeholder="Tác giả" required
                        onChange={e => setProduct({ ...product, author: e.target.value })} />

                    <input type="number" className="form-control mb-2" placeholder="Giá tiền" required
                        onChange={e => setProduct({ ...product, price: e.target.value })} />

                    <input type="text" className="form-control mb-2" placeholder="Danh mục" required
                        onChange={e => setProduct({ ...product, category: e.target.value })} />

                    <textarea className="form-control mb-3" placeholder="Mô tả ngắn" rows="3"
                        onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>

                    <div className="mb-3">
                        <label className="small text-muted">Chọn ảnh bìa sách:</label>
                        <input type="file" className="form-control-file" onChange={handleFileChange} required />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary w-100 mr-2">Lưu Sản Phẩm</button>
                        <button type="button" className="btn btn-light w-100" onClick={() => setView('products')}>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;