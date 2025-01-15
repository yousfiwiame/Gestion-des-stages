import React, { useState, useEffect } from 'react';
import { listOffresStage, deleteOffreStage, getOffreStageByField } from '../../service/OffreStageService'; 
import Sidebar from '../Entreprises/DashboardComponents/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm, message, Select, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';
import HeaderOffreStage from './HeaderOffreStage'; 
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

const ListOffreStageComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [offresStage, setOffresStage] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [search, setSearch] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getAllOffresStage();
  }, []);

  function getAllOffresStage() {
    listOffresStage().then((response) => {
      setOffresStage(response.data);
      const uniqueFields = [...new Set(response.data.map(offer => offer.field))]; 
      setFields(uniqueFields);
    }).catch(error => {
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleFieldChange(value) {
    setSelectedField(value);
    if (value) {
      getOffreStageByField(value).then((response) => {
        setOffresStage(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    } else {
      getAllOffresStage();
    }
  }

  function addNewOffreStage() {
    navigator('/add-offre-stage');
  }

  function updateOffreStage(id) {
    navigator(`/update-offre-stage/${id}`);
  }

  function viewOffreStage(id) {
    navigator(`/view-offre-stage/${id}`);
  }

  function removeOffreStage(id) {
    deleteOffreStage(id).then(() => {
      message.success('Offre de stage supprimée avec succès');
      getAllOffresStage();
    }).catch(error => {
      message.error('Une erreur est survenue!');
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredOffresStage = offresStage.filter(offer =>
    offer.id.toString().includes(search) ||
    offer.titreOffreStage.toLowerCase().includes(search.toLowerCase()) ||
    offer.lieuOffreStage.toLowerCase().includes(search.toLowerCase()) ||
    offer.field.toLowerCase().includes(search.toLowerCase()) ||
    offer.remunerationOffreStage.toLowerCase().includes(search.toLowerCase()) ||
    offer.descriptionOffreStage.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Liste des offres de stage');
    
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Titre', key: 'titreOffreStage', width: 20 },
      { header: 'Lieu', key: 'lieuOffreStage', width: 20 },
      { header: 'Domaine', key: 'field', width: 20 },
      { header: 'Date de début', key: 'dateDebut', width: 20 },
      { header: 'Date de fin', key: 'dateFin', width: 20 },
      { header: 'Remuneration', key: 'remunerationOffreStage', width: 20 },
      { header: 'Description', key: 'descriptionOffreStage', width: 40 }
    ];

    filteredOffresStage.forEach(offer => {
      worksheet.addRow({
        id: offer.id,
        titreOffreStage: offer.titreOffreStage,
        lieuOffreStage: offer.lieuOffreStage,
        field: offer.field,
        dateDebut: offer.dateDebut,
        dateFin: offer.dateFin,
        remunerationOffreStage: offer.remunerationOffreStage,
        descriptionOffreStage: offer.descriptionOffreStage
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des offres de stage.xlsx';
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
      title: 'Titre',
      dataIndex: 'titreOffreStage',
      key: 'titreOffreStage',
      align: 'center'
    },
    {
      title: 'Lieu',
      dataIndex: 'lieuOffreStage',
      key: 'lieuOffreStage',
      align: 'center'
    },
    {
      title: 'Domaine',
      dataIndex: 'field',
      key: 'field',
      align: 'center'
    },
    {
      title: 'Date de début',
      dataIndex: 'dateDebut',
      key: 'dateDebut',
      align: 'center'
    },
    {
      title: 'Date de fin',
      dataIndex: 'dateFin',
      key: 'dateFin',
      align: 'center'
    },
    {
      title: 'Remuneration',
      dataIndex: 'remunerationOffreStage',
      key: 'remunerationOffreStage',
      align: 'center'
    },
    {
      title: 'Description',
      dataIndex: 'descriptionOffreStage',
      key: 'descriptionOffreStage',
      align: 'center'
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" className="custom-button" onClick={() => updateOffreStage(record.id)}>Modifier</Button>
          <Popconfirm title="Vous êtes sûr ?" onConfirm={() => removeOffreStage(record.id)}>
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
          <Button onClick={() => viewOffreStage(record.id)}>Voir</Button>
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
          <HeaderOffreStage />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <div className="button-container">
                  <div className="button-group-left" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Select
                      placeholder="Sélectionner un domaine"
                      style={{ width: 200, marginBottom: '8px' }}
                      onChange={handleFieldChange}
                      allowClear
                    >
                      <Option value={null}>Aucun domaine</Option>
                      {fields.map(field => (
                        <Option key={field} value={field}>
                          {field}
                        </Option>
                      ))}
                    </Select>
                    <Button type="primary" className="custom-button" onClick={addNewOffreStage}>
                      Ajouter une offre de stage
                    </Button>
                  </div>
            
                  <div className="button-group-right" style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Input.Search
                      placeholder="Rechercher"
                      value={search}
                      onChange={handleSearch}
                      style={{ width: 200, marginBottom: '8px' }}
                    />
                    <Button type="primary" className="custom-button" onClick={exportExcelFile}>
                      Télécharger sous format Excel
                    </Button>
                  </div>
                </div>
        
            <Table
              dataSource={filteredOffresStage}
              columns={columns}
              rowKey="id"
              bordered
              className="offre-stage-table"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ListOffreStageComponent;
