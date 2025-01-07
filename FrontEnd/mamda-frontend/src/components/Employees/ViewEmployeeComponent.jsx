import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Card, Descriptions, Row, Col, Button, Table, Avatar, Typography, Modal } from 'antd';
import { getEmployee, getProductsByEmployeeId, deleteProductFromEmployee } from '../../service/EmployeeService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderEmployee from './HeaderEmployee';
import './Employee.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const ViewEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [products, setProducts] = useState([]);

    const columns = [
        {
            title: 'Catégorie',
            dataIndex: 'categorie',
            key: 'categorie',
            align: 'center'
        },
        {
            title: 'Numéro de série',
            dataIndex: 'numSerie',
            key: 'numSerie',
            align: 'center'
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (text, product) => (
                <>
                    <Button
                        type="text"
                        danger
                        onClick={() => handleDeleteProduct(product.id)}
                    >
                        Supprimer
                    </Button>
                    <Button
                        type="link"
                        onClick={() => navigate(`/view-product/${product.id}`)}
                    >
                        Voir
                    </Button>
                </>
            )
        }
    ];

    useEffect(() => {
        getEmployee(id).then((response) => {
            setEmployee(response.data);
        }).catch((error) => {
            console.error('Une erreur est survenue', error);
        });

        getProductsByEmployeeId(id).then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.error('Une erreur est survenue', error);
        });
    }, [id]);

    const handleDeleteProduct = (productId) => {
        Modal.confirm({
            title: 'Êtes-vous sûr?',
            content: 'Voulez-vous vraiment supprimer ce produit?',
            okText: 'Oui',
            cancelText: 'Non',
            onOk: () => {
                deleteProductFromEmployee(id, productId)
                    .then(() => {
                        setProducts(products.filter(product => product.id !== productId));
                    })
                    .catch((error) => {
                        console.error('Une erreur est survenue', error);
                    });
            }
        });
    };

    if (!employee) {
        return <div>Chargement...</div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' trigger={null} collapsible className='sider'>
                <Sidebar />
            </Sider>
            <Layout className="site-layout">
                <Header className='header'>
                    <HeaderEmployee />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div className="container">
                        <Card title={<Title level={2}>Détails de {employee.firstName} {employee.lastName}</Title>} className="card-container">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Avatar size={128} src={employee.imageUrl} />
                                </Col>
                                <Col span={16}>
                                    <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
                                        <Descriptions.Item label="Id">{employee.id}</Descriptions.Item>
                                        <Descriptions.Item label="Prénom">{employee.firstName}</Descriptions.Item>
                                        <Descriptions.Item label="Nom">{employee.lastName}</Descriptions.Item>
                                        <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
                                        <Descriptions.Item label="Poste Occupé">{employee.poste}</Descriptions.Item>
                                        <Descriptions.Item label="Département">{employee.departement}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '20px' }}>
                                <Col span={24}>
                                    <h3>Biens informatiques affectés</h3>
                                    <Table
                                        columns={columns}
                                        dataSource={products}
                                        rowKey="id"
                                    />
                                </Col>
                            </Row>
                            <Row justify="space-between" style={{ marginTop: '20px' }}>
                                <Col>
                                    <Button type="default" onClick={() => navigate('/employees')}>
                                        Retour à la liste des employés
                                    </Button>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={() => navigate(`/assign-products/${id}`)}>
                                        Affecter des biens informatiques
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default ViewEmployeeComponent;
