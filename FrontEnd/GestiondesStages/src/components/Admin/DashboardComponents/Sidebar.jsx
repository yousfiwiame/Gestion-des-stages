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
        navigate('/admin/dashboard');
        break;
      case '2':
        navigate('/students/list');
        break;
      case '3':
        navigate('/companies/list');
        break;
      // case '4':
      //   navigate('/stages-offres/list');
      //   break;
      case '4':
        navigate('/admin/account');
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
      case currentPath.startsWith('/admin/dashboard'):
        return '1';
      case ['/students/list', '/add-student'].includes(currentPath):
        return '2';
      case currentPath.match(/^\/update-student\/\d+$/) || 
           currentPath.match(/^\/view-student\/\d+$/) || 
           currentPath.match(/^\/assign-products\/\d+$/):
        return '2'; // Updated employee and product related paths to return '2'
      case ['/companies/list', '/add-company'].includes(currentPath):
        return '3';
      case currentPath.match(/^\/update-company\/\d+$/) || 
           currentPath.match(/^\/view-company\/\d+$/) || 
           currentPath.match(/^\/assign-product\/\d+$/):
        return '3';
      // case ['/stages-offres/list', '/add-offre-stage'].includes(currentPath):
      //   return '4';
      // case currentPath.match(/^\/update-offre-stage\/\d+$/) || 
      //      currentPath.match(/^\/view-offre-stage\/\d+$/) || 
      //      currentPath.match(/^\/assign-stages-offres\/\d+$/):
      //   return '4';
      case currentPath === '/admin/account':
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
          Liste des étudiants
        </Menu.Item>
        <Menu.Item key='3' icon={<BankOutlined />}>
          Liste des entreprises
        </Menu.Item>
        {/* <Menu.Item key='4' icon={<SnippetsOutlined />}>
          Liste des offres de stages
        </Menu.Item> */}
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
