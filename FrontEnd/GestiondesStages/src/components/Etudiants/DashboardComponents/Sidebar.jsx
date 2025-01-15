import React from 'react';
import { Menu, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { UserOutlined, ProfileOutlined, LogoutOutlined, UsergroupAddOutlined, BankOutlined, SnippetsOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/student/dashboard');
        break;
      case '2':
        navigate('/offre-stage/list');
        break;
      case '3':
        navigate('/student/account');
        break;
      case '4':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // To clear local storage
    localStorage.removeItem('token');

    // To display logout message
    message.success('Vous vous êtes déconnecté');

    // To redirect to login page
    navigate('/');
  };

  const selectedKey = (() => {
    switch (true) {
      case currentPath.startsWith('/student/dashboard'):
        return '1';
      case ['/offre-stage/list', '/add-offre-stage'].includes(currentPath):
        return '2';
      case currentPath.match(/^\/update-offre-stage\/\d+$/) || 
           currentPath.match(/^\/view-offre-stage\/\d+$/) || 
           currentPath.match(/^\/assign-stages-offres\/\d+$/):
        return '2';
      case currentPath === '/student/account':
        return '2';
      default:
        return '1';
    }
  })();
  

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '16px', textAlign: 'center' }}>
        <div className="logo">
        </div>
      </div>
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        style={{ flex: '1' }}
        onClick={handleMenuClick}
      >
        <Menu.Item key='1' icon={<UserOutlined />}>
          Tableau de Bord
        </Menu.Item>
        <Menu.Item key='2' icon={<SnippetsOutlined />}>
          Les offres de stages
        </Menu.Item>
        <Menu.Item key='3' icon={<ProfileOutlined />}>
          Compte
        </Menu.Item>
        <Menu.Item key='4' icon={<LogoutOutlined />}>
          Se Déconnecter
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
