import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout ,Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { addEmployee, getEmployee, updateEmployee } from '../../service/EmployeeService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderEmployee from './HeaderEmployee';
import './Employee.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const AddEmployeeComponent = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then(response => {
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    }
  }, [id, form]);

  const onFinish = values => {
    if (id) {
      updateEmployee(id, values).then(response => {
        message.success('Employé modifié avec succès');
        navigator('/employees');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    } else {
      addEmployee(values).then(response => {
        message.success('Employé ajouté avec succès');
        navigator('/employees');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme='light'
        trigger={null}
        collapsible
        className='sider'
      >
        <Sidebar />
      </Sider>

      <Layout className="site-layout">
        <Header className='header'>
          <HeaderEmployee />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <Card title={<Title level={2}>{id ? 'Modifier les informations de l\'employé' : 'Ajouter un employé'}</Title>} className="card-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
              >
                <Form.Item
                  name="firstName"
                  label="Prénom"
                  rules={[{ required: true, message: 'Le prénom est obligatoire' }]}
                >
                  <Input placeholder="Prénom" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Nom"
                  rules={[{ required: true, message: 'Le nom est obligatoire' }]}
                >
                  <Input placeholder="Nom" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'L\'email est obligatoire' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="poste"
                  label="Poste"
                  rules={[{ required: true, message: 'Le poste est obligatoire' }]}
                >
                  <Input placeholder="Poste" />
                </Form.Item>

                <Form.Item
                  name="departement"
                  label="Département"
                  rules={[{ required: true, message: 'Le département est obligatoire' }]}
                >
                  <Input placeholder="Département" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Soumettre
                    </Button>
                    <Button onClick={() => navigator('/employees')}>
                      Annuler
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AddEmployeeComponent;