import React from 'react';

const AdminDashboard = () => {
    const stats = [
        { title: 'Sản Phẩm', count: '120', color: 'bg-info' },
        { title: 'Người Dùng', count: '45', color: 'bg-success' },
        { title: 'Đơn Hàng', count: '12', color: 'bg-warning' },
    ];

    return (
        <div className="p-4">
            <h3 className="mb-4 font-weight-bold">Chào mừng trở lại!</h3>
            <div className="row">
                {stats.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className={`card text-white shadow border-0 ${item.color}`} style={{ borderRadius: '15px' }}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="text-uppercase small">{item.title}</h6>
                                    <h2 className="font-weight-bold">{item.count}</h2>
                                </div>
                                <span style={{ fontSize: '3rem', opacity: 0.3 }}>{item.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminDashboard;