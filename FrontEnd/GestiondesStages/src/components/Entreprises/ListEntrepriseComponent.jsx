import React, { useState, useEffect } from 'react';
import { listEntreprises, deleteEntreprise, getEntreprisesByRaisonSociale } from '../../service/EntrepriseService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm, message, Select, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';
import HeaderEntreprise from './HeaderEntreprise';
import './Entreprise.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

const ListEntrepriseComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [entreprises, setEntreprises] = useState([]);
  const [raisonsociales, setRaisonSociales] = useState([]);
  const [selectedRaisonSociale, setSelectedRaisonSociale] = useState(null);
  const [search, setSearch] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getAllEntreprises();
  }, []);

  function getAllEntreprises() {
    listEntreprises().then((response) => {
      setEntreprises(response.data);
      const uniqueRaisonSociales = [...new Set(response.data.map(emp => emp.raisonsociales))];
      setRaisonSociales(uniqueRaisonSociales);
    }).catch(error => {
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleRaisonSocialeChange(value) {
    setSelectedRaisonSociale(value);
    if (value) {
        getEntreprisesByRaisonSociale(value).then((response) => {
        setEntreprises(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    } else {
      getAllEntreprises();
    }
  }

  function addNewEntreprise() {
    navigator('/add-company');
  }

  function updateEntreprise(id) {
    navigator(`/update-company/${id}`);
  }

  function viewEntreprise(id) {
    navigator(`/view-company/${id}`);
  }

  function removeEntreprise(id) {
    deleteEntreprise(id).then(() => {
      message.success('Entreprise supprimée avec succès');
      getAllEntreprises();
    }).catch(error => {
      message.error('Une erreur est survenue!');
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredEntreprises = entreprises.filter(entreprise =>
    entreprise.id.toString().includes(search) ||
    entreprise.formeJuridique.toLowerCase().includes(search.toLowerCase()) ||
    entreprise.faxEntreprise.toLowerCase().includes(search.toLowerCase()) ||
    entreprise.adresseEntreprise.toLowerCase().includes(search.toLowerCase()) ||
    entreprise.telephoneEntreprise.toLowerCase().includes(search.toLowerCase()) ||
    entreprise.emailEntreprise.toLowerCase().includes(search.toLowerCase()) ||
    entreprise.raisonSociale.toLowerCase().includes(search.toLowerCase()) ||
    (entreprise.offreStages && entreprise.offreStages.length > 0 
      ? entreprise.offreStages.some(stage => stage.domaine.toLowerCase().includes(search.toLowerCase())) 
      : 'Aucune offre de stage'.toLowerCase().includes(search.toLowerCase()))
);



  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Liste des entreprises');

    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Raison Sociale', key: 'raisonSociale', width: 30 },
        { header: 'Forme Juridique', key: 'formeJuridique', width: 20 },
        { header: 'Fax Entreprise', key: 'faxEntreprise', width: 20 },
        { header: 'Adresse Entreprise', key: 'adresseEntreprise', width: 30 },
        { header: 'Téléphone Entreprise', key: 'telephoneEntreprise', width: 20 },
        { header: 'Offres de Stages', key: 'offreStages', width: 50 },
      ];
      
    

      filteredEntreprises.forEach((entreprise) => {
        worksheet.addRow({
          id: entreprise.id,
          raisonSociale: entreprise.raisonSociale,
          formeJuridique: entreprise.formeJuridique,
          faxEntreprise: entreprise.faxEntreprise,
          adresseEntreprise: entreprise.adresseEntreprise,
          telephoneEntreprise: entreprise.telephoneEntreprise,
          offreStages: entreprise.offreStages,
        });
      });
      
    

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des entreprises.xlsx';
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
      title: 'Raison Sociale',
      dataIndex: 'raisonSociale',
      key: 'raisonSociale',
      align: 'center'
    },
    {
      title: 'Forme Juridique',
      dataIndex: 'formeJuridique',
      key: 'formeJuridique',
      align: 'center'
    },
    {
      title: 'Fax Entreprise',
      dataIndex: 'faxEntreprise',
      key: 'faxEntreprise',
      align: 'center'
    },
    {
      title: 'Adresse Entreprise',
      dataIndex: 'adresseEntreprise',
      key: 'adresseEntreprise',
      align: 'center'
    },
    {
      title: 'Téléphone Entreprise',
      dataIndex: 'telephoneEntreprise',
      key: 'telephoneEntreprise',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: 'Offres de Stages',
      key: 'offreStages',
      dataIndex: 'offreStages',
      align: 'center',
      render: (products) => (
        <span>
          {products && products.length > 0
            ? products.map(product => `- ${product.categorie} (${product.numSerie})`).join(', ')
            : 'Aucun bien'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateEntreprise(record.id)}>Modifier</Button>
          <Popconfirm title="Vous êtes sûr ?" onConfirm={() => removeEntreprise(record.id)}>
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
          <Button onClick={() => viewEntreprise(record.id)}>Voir</Button>
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
          <HeaderEntreprise />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <div className="button-container" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" className="custom-button" onClick={addNewEntreprise}>
                Ajouter une entreprise
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
                placeholder="Sélectionner une raison sociale"
                style={{ width: 200 }}
                onChange={handleRaisonSocialeChange}
                allowClear
              >
                <Option value={null}>Aucune raison sociale</Option>
                {raisonsociales.map(raisonSociale => (
                  <Option key={raisonSociale} value={raisonSociale}>
                    {raisonSociale}
                  </Option>
                ))}
              </Select>

              <Button type="primary" className="custom-button" onClick={exportExcelFile} style={{ marginLeft:'16px' }}>
                Télécharger sous format Excel
              </Button>
            </div>
            <Table
              dataSource={filteredEntreprises}
              columns={columns}
              rowKey="id"
              bordered
              className="entreprise-table"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ListEntrepriseComponent;
