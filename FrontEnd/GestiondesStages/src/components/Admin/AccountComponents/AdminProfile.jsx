import React, { useState, useEffect } from 'react';
import { Layout, Card, Descriptions, Row, Col, Button, Avatar, Typography, Modal, Form, Input, message } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { getUserProfile, updateUserProfile } from '../../../service/ProfileService';
import Sidebar from '../DashboardComponents/Sidebar';
import HeaderAdmin from './HeaderAdmin';
import './AdminProfile.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [editing, setEditing] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const adminId = 1;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getUserProfile(adminId);
                setAdmin(profileData.data);
            } catch (error) {
                console.error('Échec du chargement du profil', error);
            }
        };
        fetchProfile();
    }, [adminId]);

    const showEditModal = (field) => {
        setFieldToEdit(field);
        setIsModalVisible(true);
    };

    const handleUpdate = async () => {
        try {
            const updatedAdmin = { ...admin, ...editing };
            const response = await updateUserProfile(adminId, updatedAdmin);
            setAdmin(response.data);
            setEditing({});
            setIsModalVisible(false);
            message.success('Profil mis à jour avec succès');
        } catch (error) {
            console.error('Échec de la mise à jour du profil', error);
            message.error('Échec de la mise à jour du profil');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    if (!admin) {
        return <div>Loading...</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                theme='light'
                trigger={null}
                collapsible
                collapsed={collapsed}
                className='sider'
            >
                <Sidebar />
                <Button
                    type='text'
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className='trigger-btn'
                />
            </Sider>

            <Layout className="site-layout">
                <Header className='header'>
                    <HeaderAdmin />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="container">
                        <Card title={<Title level={2}>Vos informations</Title>} className="card-container">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Avatar size={128} src={admin.imageUrl} />
                                </Col>
                                <Col span={16}>
                                    <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
                                        <Descriptions.Item label="Nom d'utilisateur">
                                            {admin.username}
                                            <Button type="primary" onClick={() => showEditModal('le nom d\'utilisateur')}>
                                                Modifier
                                            </Button>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Email">
                                            {admin.email}
                                            <Button type="primary" onClick={() => showEditModal('l\'email')}>
                                                Modifier
                                            </Button>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Mot de passe" contentStyle={{ textAlign: 'center' }}>
                                            <Button type="primary" onClick={() => showEditModal('le mor de passe')}>
                                                Modifier
                                            </Button>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Content>
            </Layout>
            <Modal
                title={`Modifier ${fieldToEdit}`}
                visible={isModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label={fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)}>
                        <Input
                            value={editing[fieldToEdit]}
                            onChange={(e) => setEditing({ ...editing, [fieldToEdit]: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default AdminProfile;
