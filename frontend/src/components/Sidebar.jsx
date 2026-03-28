import React from 'react';

const Sidebar = ({ setView, currentView, isCollapsed, setIsCollapsed }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Tổng Quan' },
        { id: 'users', label: 'Quản Lý User' },
        { id: 'products', label: 'Quản Lý Product' },
    ];

    return (
        <div className={`bg-dark text-white vh-100 shadow transition-all`}
            style={{
                width: isCollapsed ? '80px' : '250px',
                position: 'fixed',
                transition: 'width 0.3s ease',
                zIndex: 1000
            }}>
            <div className="d-flex align-items-center justify-content-between p-3">
                {!isCollapsed && <span className="font-weight-bold">E-Book</span>}
                <button
                    className="btn btn-dark border-0 p-1"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <div style={{ width: '25px', height: '3px', background: 'white', margin: '4px 0' }}></div>
                    <div style={{ width: '25px', height: '3px', background: 'white', margin: '4px 0' }}></div>
                    <div style={{ width: '25px', height: '3px', background: 'white', margin: '4px 0' }}></div>
                </button>
            </div>

            <hr className="bg-secondary mx-3" />

            <ul className="nav nav-pills flex-column mb-auto px-2">
                {menuItems.map(item => (
                    <li className="nav-item mb-2" key={item.id}>
                        <button
                            className={`nav-link w-100 text-left d-flex align-items-center ${currentView === item.id ? 'active bg-primary' : 'text-white bg-transparent border-0'}`}
                            onClick={() => setView(item.id)}
                            title={item.label}
                            style={{ borderRadius: '10px', padding: '12px' }}
                        >
                            <span style={{ fontSize: '1.5rem', minWidth: '40px' }}>{item.icon}</span>
                            {!isCollapsed && <span className="ml-2" style={{ fontSize: '1rem' }}>{item.label}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;