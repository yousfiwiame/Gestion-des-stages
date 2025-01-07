import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Space, message} from 'antd';
import { addProduct, getProduct, updateProduct } from '../../service/ProductService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import HeaderProduct from './HeaderProduct';
import { Layout } from 'antd';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const AddProductComponent = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getProduct(id).then(response => {
        setInitialValues(response.data);
        form.setFieldsValue(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    }
  }, [id, form]);

  const onFinish = values => {
  
    if (id) {
      updateProduct(id, values).then(response => {
        message.success('Matériel informatique modifié avec succès');
        navigator('/products');
      }).catch(error => {
        message.error('Une erreur est survenue!');
        console.error('Une erreur est survenue!', error);
      });
    } else {
      addProduct(values).then(response => {
        message.success('Matériel informatique ajouté avec succès');
        navigator('/products');
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
          <HeaderProduct />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <Card title={<Title level={2}>{id ? 'Modifier les informations du matériel ' : 'Ajouter un bien informatique'}</Title>} className="card-container">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={initialValues}
              >
                <Form.Item
                  name="numSerie"
                  label="Numéro de série"
                  rules={[{ required: true, message: 'Le numéro de série est obligatoire' }]}
                >
                  <Input placeholder="Numéro de série" />
                </Form.Item>

                <Form.Item
                  name="dateAchat"
                  label="Date d'achat"
                  rules={[{ required: true, message: 'La date d\'achat est obligatoire' }]}
                >
                  <Input type="date" placeholder="Date d'achat" />
                </Form.Item>

                <Form.Item
                  name="categorie"
                  label="Catégorie"
                  rules={[{ required: true, message: 'La catégorie est obligatoire' }]}
                >
                  <Input placeholder="Catégorie" />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'La description est obligatoire' }]}
                >
                  <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Soumettre
                    </Button>
                    <Button onClick={() => navigator('/products')}>
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

export default AddProductComponent;
