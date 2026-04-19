import React from 'react';

const ProfileOverview = ({ user }) => {
    return (
        <div>
            <h5 className="font-weight-bold mb-1">Hồ sơ của tôi</h5>
            <p className="text-muted small">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
            
            <div className="row mt-4">
                <div className="col-md-8">
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label text-muted">Tên đăng nhập</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control-plaintext font-weight-bold" value={user?.userName || ''} readOnly />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label text-muted">Họ và tên</label>
                            <div className="col-sm-9">
                                <input 
                                    type="text" 
                                    className="form-control shadow-none" 
                                    style={{ borderRadius: '8px' }}
                                    defaultValue={user?.fullname || ''} 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label text-muted">Email</label>
                            <div className="col-sm-9">
                                <div className="d-flex align-items-center">
                                    <span className="mr-2">{user?.email || 'tramanh@example.com'}</span>
                                    <button className="btn btn-link btn-sm p-0">Thay đổi</button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-primary px-4 py-2" style={{ borderRadius: '8px', backgroundColor: '#4e73df' }}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Phần Avatar bên phải */}
                <div className="col-md-4 text-center border-left">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.fullname || 'U'}&size=128&background=4e73df&color=fff`} 
                        className="rounded-circle shadow-sm mb-3"
                        style={{ width: '100px' }}
                    />
                    <br />
                    <button className="btn btn-outline-secondary btn-sm px-3">Chọn ảnh</button>
                    <div className="text-muted small mt-2">Dụng lượng file tối đa 1 MB<br/>Định dạng: .JPEG, .PNG</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOverview;