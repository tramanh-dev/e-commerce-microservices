import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8900/api/accounts/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    return (
        <div className="container-fluid py-4" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <h2 className="font-weight-bold text-dark m-0">Quản lý Người dùng</h2>
            </div>
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
            {/* Table Section */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #f1f5f9' }}>
                            <tr>
                                <th className="border-0 px-4 py-3 text-muted small text-uppercase">Avatar</th>
                                <th className="border-0 py-3 text-muted small text-uppercase">Tên đăng nhập</th>
                                <th className="border-0 py-3 text-muted small text-uppercase">Quyền</th>
                                <th className="border-0 py-3 text-muted small text-uppercase">Trạng thái</th>
                                <th className="border-0 py-3 text-muted small text-uppercase text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ transition: '0.2s' }}>
                                    <td className="px-4 align-middle">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.userName}&background=random&color=fff&rounded=true`}
                                            alt="avatar"
                                            style={{ width: '38px', height: '38px' }}
                                        />
                                    </td>
                                    <td className="align-middle font-weight-bold text-dark">{user.userName}</td>
                                    <td className="align-middle text-muted">
                                        {user.role ? user.role.roleName : 'N/A'}
                                    </td>
                                    <td className="align-middle">
                                        <span className={`badge px-3 py-2`} style={{
                                            borderRadius: '8px',
                                            backgroundColor: user.active === 1 ? '#dcfce7' : '#fee2e2',
                                            color: user.active === 1 ? '#166534' : '#991b1b',
                                            fontWeight: '600'
                                        }}>
                                            {user.active === 1 ? 'Đang hoạt động' : 'Khóa'}
                                        </span>
                                    </td>
                                    <td className="align-middle text-center">
                                        <button className="btn btn-sm btn-outline-primary mr-2">Sửa</button>
                                        <button className="btn btn-sm btn-outline-danger">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white border-0 py-3 d-flex justify-content-end align-items-center">
                    <nav>
                        <ul className="pagination pagination-sm m-0">
                            <li className="page-item disabled"><span className="page-link border-0">1</span></li>
                            <li className="page-item"><span className="page-link border-0 text-dark">2</span></li>
                            <li className="page-item"><span className="page-link border-0 text-dark">3</span></li>
                            <li className="page-item"><span className="page-link border-0 text-dark">Next →</span></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;