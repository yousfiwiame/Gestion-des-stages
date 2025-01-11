import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Card, List, Button, Typography, message, Select } from 'antd';
import { getFilieres, getEtudiantsByFiliere, assignProductToEtudiant } from '../../service/EtudiantService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderProduct from './HeaderProduct';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const AssignProductToEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [departements, setDepartements] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDepartements().then(response => {
            setDepartements(response.data);
            setLoading(false);
        }).catch(error => {
            console.error('Une erreur est survenue!', error);
            setLoading(false);
        });
    }, []);

    const handleDepartementChange = (value) => {
        if (value) {
            setSelectedDepartement(value);
            setLoading(true);
            getEmployeesByDepartement(value).then(response => {
                setEmployees(response.data);
                setLoading(false);
            }).catch(error => {
                console.error('Une erreur est survenue!', error);
                setLoading(false);
            });
        } else {
            setSelectedDepartement('');
            setEmployees([]);
        }
    };

    const handleAssign = (employeeId) => {
        assignProductToEmployee(employeeId, { id }).then(() => {
            message.success('Le bien informatique a été affecté avec succès.');
            navigate(`/view-employee/${employeeId}`); 
        }).catch(error => {
            console.error('Une erreur est survenue!', error);
        });
    };

    const returnToProduct = () => {
        navigate(`/view-product/${id}`);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme='light' trigger={null} collapsible className='sider'>
                <Sidebar />
            </Sider>

            <Layout className="site-layout">
                <Header className='header'>
                    <HeaderProduct />
                </Header>

                <Content style={{ margin: '0 16px' }}>
                    <div className="container">
                        <Card title={<Title level={2}>Affecter le bien informatique</Title>} className="card-container">
                            {loading ? (
                                <div>Chargement...</div>
                            ) : (
                                <>
                                    <Select
                                        placeholder="Sélectionnez un département"
                                        value={selectedDepartement || undefined}
                                        onChange={handleDepartementChange}
                                        style={{ width: '100%', marginBottom: '20px' }}
                                    >
                                        <Option key="" value="">Sélectionnez un département</Option>
                                        {departements.map(dept => (
                                            <Option key={dept} value={dept}>{dept}</Option>
                                        ))}
                                    </Select>
                                    <List
                                        bordered
                                        dataSource={employees}
                                        renderItem={employee => (
                                            <List.Item
                                                actions={[
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleAssign(employee.id)}
                                                    >
                                                        Affecter
                                                    </Button>
                                                ]}
                                            >
                                                {`${employee.firstName} ${employee.lastName}`}
                                            </List.Item>
                                        )}
                                    />
                                </>
                            )}
                        </Card>
                        <Button type='default' onClick={returnToProduct}>Retour au bien informatique</Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AssignProductToEmployeeComponent;
