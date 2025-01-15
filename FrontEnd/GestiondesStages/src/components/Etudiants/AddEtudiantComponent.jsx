import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Form, Input, Button, Card, Typography, Space, message, DatePicker } from 'antd';
import { addEtudiant, getEtudiant, updateEtudiant } from '../../service/EtudiantService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderEtudiant from './HeaderEtudiant';
import './Etudiant.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;


const AddEtudiantComponent = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEtudiant(id).then(response => {
        response.data.dateNaissance = response.data.dateNaissance ? moment(response.data.dateNaissance) : null;
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
    console.log('role:', 'ETUDIANT');

    if (id) {
      updateEtudiant(id, values).then(response => {
        message.success('Étudiant modifié avec succès');
        navigator('/students/list');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    } else {
      addEtudiant(values).then(response => {
        message.success('Étudiant ajouté avec succès');
        navigator('/students/list');
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
          <HeaderEtudiant />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <Card title={<Title level={2}>{id ? 'Modifier les informations de l\'étudiant' : 'Ajouter un étudiant'}</Title>} className="card-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
                style={{ width: '100%' }}
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
                  name="username"
                  label="Nom d'utilisateur"
                  rules={[{ required: true, message: 'Le nom d\'utilisateur est obligatoire' }]}
                >
                  <Input placeholder="Nom d'utilisateur" />
                </Form.Item>

                <Form.Item
                  name="sexe"
                  label="Sexe"
                  rules={[{ required: true, message: 'Le sexe est obligatoire' }]}
                >
                  <Input placeholder="Sexe" />
                </Form.Item>

                <Form.Item
                  name="dateNaissance"
                  label="Date de naissance"
                  rules={[
                    { required: true, message: 'La date de naissance est obligatoire' },
                    { pattern: /^\d{4}-\d{2}-\d{2}$/, message: 'La date doit être au format yyyy-mm-dd' }
                  ]}
                >
                  <Input placeholder="yyyy-mm-dd" />
                </Form.Item>

                <Form.Item
                  name="telephone"
                  label="Numéro de téléphone"
                  rules={[{ required: true, message: 'Le numéro de téléphone est obligatoire' }]}
                >
                  <Input placeholder="Numéro de téléphone" />
                </Form.Item>

                <Form.Item
                  name="filiere"
                  label="Filière"
                  rules={[{ required: true, message: 'La filière est obligatoire' }]}
                >
                  <Input placeholder="Filière" />
                </Form.Item>

                <Form.Item
                  name="statut"
                  label="Statut de stage"
                >
                  <Input placeholder="Statut de stage" />
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
                    <Button onClick={() => navigator('/students/list')}>
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

export default AddEtudiantComponent;