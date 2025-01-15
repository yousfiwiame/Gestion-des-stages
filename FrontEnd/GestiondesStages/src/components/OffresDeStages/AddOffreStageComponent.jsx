import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Space, message, DatePicker } from 'antd';
import { addOffreStage, getOffreStage, updateOffreStage } from '../../service/OffreStageService';
import Sidebar from '../Entreprises/DashboardComponents/Sidebar';
import HeaderOffreStage from './HeaderOffreStage';
import { Layout } from 'antd';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const AddOffreStageComponent = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOffreStage(id).then(response => {
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    }
  }, [id, form]);

  const onFinish = values => {
    if (id) {
      updateOffreStage(id, values).then(response => {
        message.success('Offre de stage modifiée avec succès');
        navigate('/stages-offres/list');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    } else {
      addOffreStage(values).then(response => {
        message.success('Offre de stage ajoutée avec succès');
        navigate('/stages-offres/list');
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
          <HeaderOffreStage />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <Card title={<Title level={2}>{id ? 'Modifier les informations de l\'offre de stage' : 'Ajouter une offre de stage'}</Title>} className="card-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
              >
                <Form.Item
                  name="titreOffreStage"
                  label="Titre de l'offre de stage"
                  rules={[{ required: true, message: 'Le titre de l\'offre de stage est obligatoire' }]}
                >
                  <Input placeholder="Titre de l'offre de stage" />
                </Form.Item>

                <Form.Item
                  name="lieuOffreStage"
                  label="Lieu de l'offre de stage"
                  rules={[{ required: true, message: 'Le lieu de l\'offre de stage est obligatoire' }]}
                >
                  <Input placeholder="Lieu de l'offre de stage" />
                </Form.Item>

                <Form.Item
                  name="field"
                  label="Domaine"
                  rules={[{ required: true, message: 'Le domaine est obligatoire' }]}
                >
                  <Input placeholder="Domaine" />
                </Form.Item>

                <Form.Item
                  name="dateDebut"
                  label="Date de début"
                  rules={[{ required: true, message: 'La date de début est obligatoire' }]}
                >
                  <DatePicker format="DD-MM-YYYY" placeholder="Date de début" />
                </Form.Item>

                <Form.Item
                  name="dateFin"
                  label="Date de fin"
                  rules={[{ required: true, message: 'La date de fin est obligatoire' }]}
                >
                  <DatePicker format="DD-MM-YYYY" placeholder="Date de fin" />
                </Form.Item>

                <Form.Item
                  name="dureeOffreStage"
                  label="Durée de l'offre de stage"
                  rules={[{ required: true, message: 'La durée de l\'offre de stage est obligatoire' }]}
                >
                  <Input placeholder="Durée de l'offre de stage" />
                </Form.Item>

                <Form.Item
                  name="remunerationOffreStage"
                  label="Rémunération"
                  rules={[{ required: true, message: 'La rémunération est obligatoire' }]}
                >
                  <Input placeholder="Rémunération" />
                </Form.Item>

                <Form.Item
                  name="descriptionOffreStage"
                  label="Description"
                  rules={[{ required: true, message: 'La description est obligatoire' }]}
                >
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                  name="entreprise_id"
                  label="Entreprise"
                  rules={[{ required: true, message: 'L\'entreprise est obligatoire' }]}
                >
                  <Input placeholder="ID de l'entreprise" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" className="custom-button" htmlType="submit">
                      Soumettre
                    </Button>
                    <Button onClick={() => navigate('/stages-offres/list')}>
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
};

export default AddOffreStageComponent;
