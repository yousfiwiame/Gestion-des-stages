import React, { useState, useEffect } from 'react';
import { listProducts, deleteProduct, getProductByCategories } from '../../service/ProductService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm, message, Select, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';
import HeaderProduct from './HeaderProduct';
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

const ListProductComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [search, setSearch] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    listProducts().then((response) => {
      setProducts(response.data);
      const uniqueCategories = [...new Set(response.data.map(prod => prod.categorie))];
      setCategories(uniqueCategories);
    }).catch(error => {
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleCategorieChange(value) {
    setSelectedCategorie(value);
    if (value) {
      getProductByCategories(value).then((response) => {
        setProducts(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    } else {
      getAllProducts();
    }
  }

  function addNewProduct() {
    navigator('/add-product');
  }

  function updateProduct(id) {
    navigator(`/update-product/${id}`);
  }

  function viewProduct(id) {
    navigator(`/view-product/${id}`);
  }

  function removeProduct(id) {
    deleteProduct(id).then(() => {
      message.success('Matériel supprimé avec succès');
      getAllProducts();
    }).catch(error => {
      message.error('Une erreur est survenue!');
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredProducts = products.filter(product =>
    product.id.toString().includes(search) ||
    product.numSerie.toLowerCase().includes(search.toLowerCase()) ||
    product.dateAchat.toLowerCase().includes(search.toLowerCase()) ||
    (product.categorie && product.categorie.toLowerCase().includes(search.toLowerCase())) ||
    (product.description && product.description.toLowerCase().includes(search.toLowerCase()))
  );

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Liste des biens informatiques');
    
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Numéro de série', key: 'numSerie', width: 20 },
      { header: 'Date d\'achat', key: 'dateAchat', width: 20 },
      { header: 'Catégorie', key: 'categorie', width: 20 },
      { header: 'Description', key: 'description', width: 40 }
    ];

    filteredProducts.forEach(product => {
      worksheet.addRow({
        id: product.id,
        numSerie: product.numSerie,
        dateAchat: product.dateAchat,
        categorie: product.categorie,
        description: product.description
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des biens informatiques.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Numéro de série',
      dataIndex: 'numSerie',
      key: 'numSerie',
      align: 'center'
    },
    {
      title: 'Date d\'achat',
      dataIndex: 'dateAchat',
      key: 'dateAchat',
      align: 'center'
    },
    {
      title: 'Catégorie',
      dataIndex: 'categorie',
      key: 'categorie',
      align: 'center'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateProduct(record.id)}>Modifier</Button>
          <Popconfirm title="Vous êtes sûr ?" onConfirm={() => removeProduct(record.id)}>
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
          <Button onClick={() => viewProduct(record.id)}>Voir</Button>
        </Space>
      ),
    }
  ];

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
          <HeaderProduct />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <div className="button-container" style={{ marginBottom: '16px', display: 'flex', justifyContent:'space-between' }}>
              <Button type="primary" onClick={addNewProduct}>
                Ajouter un bien informatique
              </Button>
              <Input.Search
                placeholder='Rechercher'
                value={search}
                onChange={handleSearch}
                style={{ width: 200 }}
              />
            </div>
            <div className="select-container" style={{ marginBottom: '16px', display: 'flex', justifyContent:'space-between' }}>
              <Select
                placeholder="Sélectionner une catégorie"
                style={{ width: 200 }}
                onChange={handleCategorieChange}
                allowClear
              >
                <Option value={null}>Aucune catégorie</Option>
                {categories.map(categorie => (
                  <Option key={categorie} value={categorie}>
                    {categorie}
                  </Option>
                ))}
              </Select>

              <Button type="primary" onClick={exportExcelFile} style={{ marginLeft:'16px' }}>
                Télécharger sous format Excel
              </Button>
            </div>
            <Table
              dataSource={filteredProducts}
              columns={columns}
              rowKey="id"
              bordered
              className="product-table"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ListProductComponent;
