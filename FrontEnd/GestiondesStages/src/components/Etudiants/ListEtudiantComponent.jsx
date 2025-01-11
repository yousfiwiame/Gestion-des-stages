import React, { useState, useEffect } from 'react';
import { listEtudiants, deleteEtudiant, getEtudiantsByFiliere } from '../../service/EtudiantService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm, message, Select, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';
import HeaderEtudiant from './HeaderEtudiant';
import './Etudiant.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

const ListEtudiantComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [etudiants, setEtudiants] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [search, setSearch] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getAllEtudiants();
  }, []);

  function getAllEtudiants() {
    listEtudiants().then((response) => {
      setEtudiants(response.data);
      const uniqueFilieres = [...new Set(response.data.map(emp => emp.filiere))];
      setFilieres(uniqueFilieres);
    }).catch(error => {
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleFiliereChange(value) {
    setSelectedFiliere(value);
    if (value) {
      getEtudiantsByFiliere(value).then((response) => {
        setEtudiants(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    } else {
      getAllEtudiants();
    }
  }

  function addNewEtudiant() {
    navigator('/add-student');
  }

  function updateEtudiant(id) {
    navigator(`/update-student/${id}`);
  }

  function viewEtudiant(id) {
    navigator(`/view-student/${id}`);
  }

  function removeEtudiant(id) {
    deleteEtudiant(id).then(() => {
      message.success('Étudiant supprimé avec succès');
      getAllEtudiants();
    }).catch(error => {
      message.error('Une erreur est survenue!');
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredEtudiants = etudiants.filter(etudiant =>
    etudiant.id.toString().includes(search) ||
    etudiant.firstName.toLowerCase().includes(search.toLowerCase()) ||
    etudiant.lastName.toLowerCase().includes(search.toLowerCase()) ||
    etudiant.sexe.toLowerCase().includes(search.toLowerCase()) ||
    (etudiant.dateNaissance && etudiant.dateNaissance.toString().includes(search)) ||
    (etudiant.telephone && etudiant.telephone.toLowerCase().includes(search.toLowerCase())) ||
    (etudiant.email && etudiant.email.toLowerCase().includes(search.toLowerCase())) ||
    (etudiant.filiere && etudiant.filiere.toLowerCase().includes(search.toLowerCase())) ||
    (etudiant.stages && etudiant.stages.length > 0 
      ? etudiant.stages.some(stage => stage.domaine.toLowerCase().includes(search.toLowerCase())) 
      : 'Aucun stage'.toLowerCase().includes(search.toLowerCase()))
);


  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Liste des étudiants');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Prénom', key: 'firstName', width: 20 },
      { header: 'Nom', key: 'lastName', width: 20 },
      { header: 'Sexe', key: 'sexe', width: 10 },
      { header: 'Date de Naissance', key: 'dateNaissance', width: 20 },
      { header: 'Téléphone', key: 'telephone', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Filière', key: 'filiere', width: 20 },
      { header: 'Stages', key: 'stages', width: 50 }
    ];
    

    filteredEtudiants.forEach((etudiant) => {
      worksheet.addRow({
        id: etudiant.id,
        firstName: etudiant.firstName,
        lastName: etudiant.lastName,
        sexe: etudiant.sexe,
        dateNaissance: etudiant.dateNaissance,
        telephone: etudiant.telephone,
        email: etudiant.email,
        filiere: etudiant.filiere,
        stages: etudiant.stages && etudiant.stages.length > 0
          ? etudiant.stages.map(stage => `${stage.domaine}`).join(', ')
          : 'Aucun stage'
      });
    });
    

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des étudiants.xlsx';
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
      title: 'Prénom',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center'
    },
    {
      title: 'Nom',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center'
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      align: 'center'
    },
    {
      title: 'Date de Naissance',
      dataIndex: 'dateNaissance',
      key: 'dateNaissance',
      align: 'center'
    },
    {
      title: 'Numéro de téléphone',
      dataIndex: 'telephone',
      key: 'telephone',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: 'Filière',
      dataIndex: 'filiere',
      key: 'filiere',
      align: 'center'
    },
    // {
    //   title: 'Biens affectés',
    //   key: 'products',
    //   dataIndex: 'products',
    //   align: 'center',
    //   render: (products) => (
    //     <span>
    //       {products && products.length > 0
    //         ? products.map(product => `- ${product.categorie} (${product.numSerie})`).join(', ')
    //         : 'Aucun bien'}
    //     </span>
    //   ),
    // },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => updateEtudiant(record.id)}>Modifier</Button>
          <Popconfirm title="Vous êtes sûr ?" onConfirm={() => removeEtudiant(record.id)}>
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
          <Button onClick={() => viewEtudiant(record.id)}>Voir</Button>
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
          <HeaderEtudiant />
        </Header>

        <Content style={{ margin: '0 16px' }}>
  <div className="container">
    <div className="button-container">
      <div className="button-group-left" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Select
          placeholder="Sélectionner une filière"
          style={{ width: 200, marginBottom: '8px' }}
          onChange={handleFiliereChange}
          allowClear
        >
          <Option value={null}>Aucune filière</Option>
          {filieres.map(filiere => (
            <Option key={filiere} value={filiere}>
              {filiere}
            </Option>
          ))}
        </Select>
        <Button type="primary" className="custom-button" onClick={addNewEtudiant}>
          Ajouter un étudiant
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
      dataSource={filteredEtudiants}
      columns={columns}
      rowKey="id"
      bordered
      className="etudiant-table"
    />
  </div>
</Content>



      </Layout>
    </Layout>
  );
}

export default ListEtudiantComponent;
