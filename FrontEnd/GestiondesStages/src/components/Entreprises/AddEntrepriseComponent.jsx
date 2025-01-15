import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout ,Form, Input, Button, Card, Typography, Space, message } from 'antd';
import { addEntreprise, getEntreprise, updateEntreprise} from '../../service/EntrepriseService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderEntreprise from './HeaderEntreprise';
import './Entreprise.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const AddEntrepriseComponent = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEntreprise(id).then(response => {
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    }
  }, [id, form]);

  const onFinish = values => {

    console.log('Current token:', localStorage.getItem('token'));
    console.log('values:', values);
    console.log('role:', 'ENTREPRISE');

    if (id) {
      updateEntreprise(id, values).then(response => {
        message.success('Entreprise modifiée avec succès');
        navigator('/companies/list');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    } else {
      addEntreprise(values).then(response => {
        message.success('Entreprise ajoutée avec succès');
        navigator('/companies/list');
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
          <HeaderEntreprise />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <Card title={<Title level={2}>{id ? 'Modifier les informations de l\'entreprise' : 'Ajouter une entreprise'}</Title>} className="card-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
                style={{ width: '100%' }}
              >
              
              <Form.Item
                  name="username"
                  label="Nom d'utilisateur"
                  rules={[{ required: true, message: 'Le nom d\'utilisateur est obligatoire' }]}
                >
                  <Input placeholder="Nom d'utilisateur" />
                </Form.Item>

                <Form.Item
                  name="raisonSociale"
                  label="Raison sociale"
                  rules={[{ required: true, message: 'La raison sociale est obligatoire' }]}
                >
                  <Input placeholder="Raison sociale" />
                </Form.Item>

                <Form.Item
                  name="formeJuridique"
                  label="Forme juridique"
                  rules={[{ required: true, message: 'La forme juridique est obligatoire' }]}
                >
                  <Input placeholder="Forme juridique" />
                </Form.Item>

                <Form.Item
                  name="faxEntreprise"
                  label="Fax de l'entreprise"
                  rules={[{ required: true, message: 'Le fax de l\'entreprise est obligatoire' }]}
                >
                  <Input placeholder="Fax de l'entreprise" />
                </Form.Item>

                <Form.Item
                  name="adresseEntreprise"
                  label="Adresse de l'entreprise"
                  rules={[{ required: true, message: 'L\'adresse de l\'entreprise est obligatoire' }]}
                >
                  <Input placeholder="Adresse de l'entreprise" />
                </Form.Item>

                <Form.Item
                  name="telephoneEntreprise"
                  label="Téléphone de l'entreprise"
                  rules={[{ required: true, message: 'Le téléphone de l\'entreprise est obligatoire' }]}
                >
                  <Input placeholder="Téléphone de l'entreprise" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'L\'email est obligatoire' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mot de passe"
                  rules={[{ required: true, message: 'Le mot de passe est obligatoire' }]}
                >
                  <Input placeholder="Mot de passe" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" className="custom-button" htmlType="submit">
                      Soumettre
                    </Button>
                    <Button onClick={() => navigator('/companies/list')}>
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

export default AddEntrepriseComponent;