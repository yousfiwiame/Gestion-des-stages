import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Card, Descriptions, Button, Typography } from 'antd';
import { getProduct } from '../../service/ProductService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderProduct from './HeaderProduct';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const ViewProductComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [alreadyAssigned, setAlreadyAssigned] = useState(false);
    const [deleteButton, setDeleteButton] = useState(true);

    useEffect(() => {
        getProduct(id).then(response => {
            setProduct(response.data);
            setAlreadyAssigned(response.data.assigned);
        }).catch(error => {
            console.error('Une erreur est survenue!', error);
        });
    }, [id]);

    if (!product) {
        return <div>Chargement...</div>;
    }

    const goToListProducts = () => {
        navigate('/products');
    };

    const goUpdateProduct = () => {
        navigate(`/update-product/${id}`);
    };

    const goAssignProduct = () => {
        if (alreadyAssigned) {
            setDeleteButton(false);
        } else {
            setDeleteButton(true);
            navigate(`/assign-product/${id}`);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                theme="light"
                trigger={null}
                collapsible
                className="sider"
            >
                <Sidebar />
            </Sider>

            <Layout className="site-layout">
                <Header className="header">
                    <HeaderProduct />
                </Header>

                <Content style={{ margin: '0 16px' }}>
                    <div className="container">
                        <Card title={<Title level={2}>{`Détails du produit ${product.numSerie}`}</Title>} className="card-container">
                            <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
                                <Descriptions.Item label="Numéro de série">{product.numSerie}</Descriptions.Item>
                                <Descriptions.Item label="Date d'achat">{product.dateAchat}</Descriptions.Item>
                                <Descriptions.Item label="Catégorie">{product.categorie}</Descriptions.Item>
                                <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                            </Descriptions>
                            <div style={{ marginTop: '20px' }}>
                                <Button type="default" onClick={goToListProducts}>
                                    Retour à la liste des produits
                                </Button>
                                <Button type="primary" onClick={goUpdateProduct} style={{ marginLeft: '10px' }}>
                                    Modifier le produit
                                </Button>
                                {deleteButton && (
                                    <Button type="default" onClick={goAssignProduct} style={{ marginLeft: '10px' }} di>
                                        Affecter à un employé
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ViewProductComponent;
