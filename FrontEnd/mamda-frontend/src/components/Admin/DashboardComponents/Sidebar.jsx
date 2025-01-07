import React from 'react';
import { Menu, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, ProfileOutlined, LogoutOutlined, LaptopOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleMenuClick = (e) => {
    switch (e.key) {
      case '1':
        navigate('/dashboard');
        break;
      case '2':
        navigate('/employees');
        break;
      case '3':
        navigate('/products');
        break;
      case '4':
        navigate('/account');
        break;
      case '5':
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
      case currentPath.startsWith('/dashboard'):
        return '1';
      case ['/employees', '/add-employee'].includes(currentPath):
        return '2';
      case currentPath.match(/^\/update-employee\/\d+$/) !== null:
      case currentPath.match(/^\/view-employee\/\d+$/) !== null:
      case currentPath.match(/^\/assign-products\/\d+$/) !== null:
        return '2';
      case ['/products', '/add-product'].includes(currentPath):
        return '3';
      case currentPath.match(/^\/update-product\/\d+$/) !== null:
      case currentPath.match(/^\/view-product\/\d+$/) !== null:
      case currentPath.match(/^\/assign-product\/\d+$/) !== null:
        return '3';
      case currentPath === '/account':
        return '4';
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
        <Menu.Item key='2' icon={<UsergroupAddOutlined />}>
          Liste des employés
        </Menu.Item>
        <Menu.Item key='3' icon={<LaptopOutlined />}>
          Biens informatiques
        </Menu.Item>
        <Menu.Item key='4' icon={<ProfileOutlined />}>
          Compte
        </Menu.Item>
        <Menu.Item key='5' icon={<LogoutOutlined />}>
          Se Déconnecter
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
