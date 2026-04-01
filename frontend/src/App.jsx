import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import ProductDashboard from './pages/ProductDashboard';
import UserDashboard from './pages/UserDashboard';
import AddProduct from './pages/product/AddProduct';
import EditProduct from './pages/product/EditProduct';

function App() {
    const [view, setView] = useState('dashboard');
    const [editingId, setEditingId] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="d-flex bg-light min-vh-100">
            <Sidebar
                setView={setView}
                currentView={view}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            <div
                className="flex-grow-1"
                style={{
                    marginLeft: isCollapsed ? '80px' : '280px',
                    transition: 'margin 0.3s ease',
                    padding: '20px'
                }}
            >
                {view === 'dashboard' && <AdminDashboard />}
                {view === 'users' && <UserDashboard />}

                {view === 'products' && (
                    <ProductDashboard setView={setView} setEditingId={setEditingId} />
                )}

                {view === 'add-product' && (
                    <AddProduct setView={setView} />
                )}

                {view === 'edit-product' && (
                    <EditProduct setView={setView} productId={editingId} />
                )}
            </div>
        </div>
    );
}

export default App;