import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ setView }) => {
    const [userData, setUserData] = useState({
        userName: '',
        userPassword: '',
        active: 1,
        role: { id: 2 }
    });

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            console.log("Dữ liệu gửi đi:", userData);

            const response = await axios.post('http://localhost:8900/api/accounts/users', userData);

            if (response.status === 201 || response.status === 200) {
                alert("Thêm User thành công");
                setView('users');
            }
        } catch (err) {
            console.error("Lỗi chi tiết:", err.response?.data);
            alert("Lỗi rồi: " + (err.response?.data?.message || "Sai cấu trúc dữ liệu"));
        }
    };

    return (
        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '500px', borderRadius: '15px' }}>
            <h4 className="mb-4 text-center">Tạo Tài Khoản Mới</h4>
            <form onSubmit={handleAdd}>
                <label className="small font-weight-bold">Tên đăng nhập:</label>
                <input type="text" className="form-control mb-3" placeholder="Nhập username..." required
                    onChange={e => setUserData({ ...userData, userName: e.target.value })} />

                <label className="small font-weight-bold">Mật khẩu:</label>
                <input type="password" className="form-control mb-3" placeholder="Nhập mật khẩu..." required
                    onChange={e => setUserData({ ...userData, userPassword: e.target.value })} />

                <label className="small font-weight-bold">Vai trò:</label>
                <select className="form-control mb-3"
                    onChange={e => setUserData({ ...userData, role: { id: parseInt(e.target.value) } })}>
                    <option value={2}>Người dùng (User)</option>
                    <option value={1}>Quản trị viên (Admin)</option>
                </select>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary flex-grow-1">Lưu</button>
                    <button type="button" className="btn btn-light flex-grow-1" onClick={() => setView('users')}>Hủy</button>
                </div>
            </form>
        </div>
    );
};
export default AddUser;