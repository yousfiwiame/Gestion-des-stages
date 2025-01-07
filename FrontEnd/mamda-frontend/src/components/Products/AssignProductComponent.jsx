import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Card, Button, Select, message, Typography, Checkbox, List } from 'antd';
import { getEmployee, assignProductToEmployee, getAssignedProductsByEmployeeId } from '../../service/EmployeeService';
import { getCategories, getProductByCategories, getAllAssignedProducts } from '../../service/ProductService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderEmployee from '../Employees/HeaderEmployee';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AssignProductsComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [assignedProducts, setAssignedProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // To fetch employee details
        getEmployee(id).then((response) => {
            setEmployee(response.data);
        }).catch((error) => {
            console.error('Une erreur est survenue', error);
        });

        // To fetch categories
        getCategories().then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.error('Une erreur est survenue', error);
        });

        // To fetch all assigned products
        getAllAssignedProducts().then((response) => {
            setAssignedProducts(response.data);
        }).catch((error) => {
            console.error('Une erreur est survenue', error);
        });
    }, [id]);

    useEffect(() => {
        // To fetch and filter available products when category changes
        if (selectedCategory) {
            getProductByCategories(selectedCategory).then((response) => {
                const filteredProducts = response.data.filter(product => 
                    !assignedProducts.some(assigned => assigned.id === product.id)
                );
                setAvailableProducts(filteredProducts);
            }).catch((error) => {
                console.error('Une erreur est survenue', error);
            });
        }
    }, [selectedCategory, assignedProducts]);

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

    const handleProductChange = (checkedValues) => {
        setSelectedProducts(checkedValues);
    };

    const handleAssignProduct = () => {
        if (selectedProducts.length === 0) {
            message.warning('Sélectionnez un bien informatique.');
            return;
        }

        Promise.all(selectedProducts.map(productId => {
            const product = availableProducts.find(p => p.id === productId);
            return assignProductToEmployee(id, product);
        }))
        .then(() => {
            message.success('Le bien informatique a été affecté avec succès.');
            navigate(`/view-employee/${id}`);
        })
        .catch((error) => {
            console.error('Une erreur est survenue', error);
        });
    };

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
                        <Card title={<Title level={2}>{`Affecter les biens à ${employee ? `${employee.firstName} ${employee.lastName}` : 'Employee'}`}</Title>} className="card-container">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Sélectionnez une catégorie"
                                onChange={handleCategoryChange}
                            >
                                {categories.map(categorie => (
                                    <Option key={categorie} value={categorie}>
                                        {categorie}
                                    </Option>
                                ))}
                            </Select>
                            <List
                                bordered
                                dataSource={availableProducts}
                                renderItem={product => (
                                    <List.Item key={product.id}>
                                        <Checkbox
                                            value={product.id}
                                            onChange={(e) => handleProductChange(e.target.checked ? [...selectedProducts, product.id] : selectedProducts.filter(id => id !== product.id))}
                                        >
                                            {product.numSerie} - {product.description}
                                        </Checkbox>
                                    </List.Item>
                                )}
                                style={{ marginTop: 20 }}
                            />
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="primary" onClick={handleAssignProduct}>
                                    Affecter le bien informatique
                                </Button>
                                <Button type="default" onClick={() => navigate(`/view-employee/${id}`)}>
                                    Retour
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AssignProductsComponent;
