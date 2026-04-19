import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import ProductDashboard from './pages/ProductDashboard';
import UserDashboard from './pages/UserDashboard';
import AddProduct from './pages/admin/product/AddProduct';
import EditProduct from './pages/admin/product/EditProduct';
import AddUser from './pages/admin/user/AddUser';
import EditUser from './pages/admin/user/EditUser';
import ClientDashboard from './pages/client/ClientDashboard';
import ProductDetail from './pages/client/ProductDetail';
import Cart from './pages/client/Cart';
import Checkout from './pages/client/Checkout';
function App() {
    const [view, setView] = useState('dashboard');
    const [editingId, setEditingId] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const renderAdminViews = () => {
        switch (view) {
            case 'dashboard': return <AdminDashboard />;
            case 'users': return <UserDashboard setView={setView} setUserEditingId={setEditingId} />;
            case 'add-user': return <AddUser setView={setView} />;
            case 'edit-user': return <EditUser setView={setView} userId={editingId} />;
            case 'products': return <ProductDashboard setView={setView} setEditingId={setEditingId} />;
            case 'add-product': return <AddProduct setView={setView} />;
            case 'edit-product': return <EditProduct setView={setView} productId={editingId} />;
            default: return <AdminDashboard />;
        }
    };

    const isClientPage = ['clients', 'product-detail', 'cart', 'wishlist', 'checkout'].includes(view);
    return (
        <div className="bg-light min-vh-100">
            {!isClientPage ? (
                // admin
                <div className="d-flex">
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
                        {renderAdminViews()}
                    </div>
                </div>
            ) : (
                // client
                <div className="client-area">
                    {view === 'clients' && (
                        <ClientDashboard
                            setView={setView}
                            setEditingId={setEditingId}
                        />
                    )}
                    {view === 'product-detail' && (
                        <ProductDetail productId={editingId} setView={setView} />
                    )}
                    {view === 'cart' && (
                        <Cart
                            setView={setView}
                            setEditingId={setEditingId}
                            setTotalAmount={setTotalAmount}
                        />
                    )}
                    {view === 'wishlist' && (
                        <div className="container py-5">
                            <h2 className="font-weight-bold mb-4">Danh sách yêu thích ❤️</h2>
                            <div className="card shadow-sm border-0 p-5 text-center" style={{ borderRadius: '20px' }}>
                                <p className="text-muted">...</p>
                                <button className="btn btn-primary mx-auto" style={{ width: '200px' }} onClick={() => setView('clients')}>Quay lại mua sắm</button>
                            </div>
                        </div>
                    )}
                    {view === 'checkout' && (
                        <Checkout
                            setView={setView}
                            totalPrice={totalAmount}
                            orderId={editingId}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default App;