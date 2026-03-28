import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AdminDashboard from './pages/AdminDashboard';
import ProductDashboard from './pages/ProductDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
    const [view, setView] = useState('dashboard'); 
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="d-flex bg-light min-vh-100">
            <Sidebar 
                setView={setView} 
                currentView={view} 
                isCollapsed={isCollapsed} 
                setIsCollapsed={setIsCollapsed} 
            />

            <div className="flex-grow-1" style={{marginLeft: isCollapsed ? '80px' : '280px', transition: 'margin 0.3s ease', padding: '0' }}>
                {view === 'dashboard' && <AdminDashboard />}
                {view === 'users' && <UserDashboard />}
                {view === 'products' && <ProductDashboard />}
            </div>
        </div>
    );
}

export default App;