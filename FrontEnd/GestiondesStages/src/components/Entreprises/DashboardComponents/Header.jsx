import React from 'react';
import { Avatar, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const CustomHeader = () => {
  const navigate = useNavigate();

  const viewAccount = () => {
    navigate('/company/account');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography.Title level={3} type='secondary'>
        Bienvenue à votre espace entreprise
      </Typography.Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar 
            icon={<UserOutlined />} 
            onClick={viewAccount} 
            style={{ cursor: 'pointer' }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
