import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ setView, userId }) => {
    const [userData, setUserData] = useState({
        userName: '',
        active: 1,
        role: { id: 2 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8900/api/accounts/users/${userId}`)
                .then(res => {
                    setUserData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Lỗi lấy user:", err);
                    setLoading(false);
                });
        }
    }, [userId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8900/api/accounts/users/${userId}`, userData);
            alert("Cập nhật thành công");
            setView('users');
        } catch (err) {
            console.error("Lỗi cập nhật:", err.response?.data);
            alert("Lỗi rồi: " + (err.response?.data?.message || "Không thể cập nhật"));
        }
    };

    if (loading) return <div className="text-center mt-5">Đang tải...</div>;

    return (
        <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '550px', borderRadius: '15px', border: 'none' }}>
            <h4 className="text-center mb-4 font-weight-bold">Chỉnh Sửa Thành Viên</h4>

            <form onSubmit={handleUpdate}>
                {/* Ô sửa Tên đăng nhập */}
                <div className="mb-3">
                    <label className="small font-weight-bold text-muted">Tên đăng nhập:</label>
                    <input
                        type="text"
                        className="form-control"
                        style={{ borderRadius: '10px' }}
                        value={userData.userName}
                        onChange={e => setUserData({ ...userData, userName: e.target.value })}
                        required
                    />
                </div>

                {/* Ô sửa Vai trò (Role) */}
                <div className="mb-3">
                    <label className="small font-weight-bold text-muted">Vai trò hệ thống:</label>
                    <select
                        className="form-control"
                        style={{ borderRadius: '10px' }}
                        value={userData.role?.id} 
                        onChange={e => setUserData({ ...userData, role: { ...userData.role, id: parseInt(e.target.value) } })}
                    >
                        <option value={1}>Quản trị viên (Admin)</option>
                        <option value={2}>Người dùng (User)</option>
                    </select>
                </div>

                {/* Ô sửa Trạng thái */}
                <div className="mb-4">
                    <label className="small font-weight-bold text-muted">Trạng thái tài khoản:</label>
                    <select
                        className="form-control"
                        style={{ borderRadius: '10px' }}
                        value={userData.active}
                        onChange={e => setUserData({ ...userData, active: parseInt(e.target.value) })}
                    >
                        <option value={1}>Đang hoạt động (Active)</option>
                        <option value={0}>Khóa tài khoản (Blocked)</option>
                    </select>
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1 shadow-sm" style={{ borderRadius: '10px' }}>
                        Lưu thay đổi
                    </button>
                    <button type="button" className="btn btn-light flex-grow-1 shadow-sm ml-2" style={{ borderRadius: '10px' }}
                        onClick={() => setView('users')}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;