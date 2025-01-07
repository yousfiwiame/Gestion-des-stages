import React, { useState, useEffect } from 'react';
import { listEmployees, deleteEmployee, getEmployeesByDepartement } from '../../service/EmployeeService';
import Sidebar from '../Admin/DashboardComponents/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Layout, Button, Table, Space, Popconfirm, message, Select, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ExcelJS from 'exceljs';
import HeaderEmployee from './HeaderEmployee';
import './Employee.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

const ListEmployeeComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [selectedDepartement, setSelectedDepartement] = useState(null);
  const [search, setSearch] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    listEmployees().then((response) => {
      setEmployees(response.data);
      const uniqueDepartements = [...new Set(response.data.map(emp => emp.departement))];
      setDepartements(uniqueDepartements);
    }).catch(error => {
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleDepartementChange(value) {
    setSelectedDepartement(value);
    if (value) {
      getEmployeesByDepartement(value).then((response) => {
        setEmployees(response.data);
      }).catch(error => {
        console.error('Une erreur est survenue!', error);
      });
    } else {
      getAllEmployees();
    }
  }

  function addNewEmployee() {
    navigator('/add-employee');
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`);
  }

  function viewEmployee(id) {
    navigator(`/view-employee/${id}`);
  }

  function removeEmployee(id) {
    deleteEmployee(id).then(() => {
      message.success('Employé supprimé avec succès');
      getAllEmployees();
    }).catch(error => {
      message.error('Une erreur est survenue!');
      console.error('Une erreur est survenue!', error);
    });
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredEmployees = employees.filter(employee =>
    employee.id.toString().includes(search) ||
    employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
    employee.email.toLowerCase().includes(search.toLowerCase()) ||
    (employee.departement && employee.departement.toLowerCase().includes(search.toLowerCase())) ||
    (employee.poste && employee.poste.toLowerCase().includes(search.toLowerCase())) ||
    (employee.products && employee.products.length > 0 
      ? employee.products.some(product => product.categorie.toLowerCase().includes(search.toLowerCase())) 
      : 'Aucun bien'.toLowerCase().includes(search.toLowerCase()))
  );

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Liste des employés');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Prénom', key: 'firstName', width: 20 },
      { header: 'Nom', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Poste Occupé', key: 'poste', width: 20 },
      { header: 'Département', key: 'departement', width: 20 },
      { header: 'Biens affectés', key: 'products', width: 50 }
    ];

    filteredEmployees.forEach((employee) => {
      worksheet.addRow({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        poste: employee.poste,
        departement: employee.departement,
        products: employee.products && employee.products.length > 0
          ? employee.products.map(product => `${product.categorie} (${product.numSerie})`).join(', ')
          : 'Aucun bien'
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Liste des employés.xlsx';
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: 'Poste Occupé',
      dataIndex: 'poste',
      key: 'poste',
      align: 'center'
    },
    {
      title: 'Département',
      dataIndex: 'departement',
      key: 'departement',
      align: 'center'
    },
    {
      title: 'Biens affectés',
      key: 'products',
      dataIndex: 'products',
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
          <Button type="primary" onClick={() => updateEmployee(record.id)}>Modifier</Button>
          <Popconfirm title="Vous êtes sûr ?" onConfirm={() => removeEmployee(record.id)}>
            <Button type="danger">Supprimer</Button>
          </Popconfirm>
          <Button onClick={() => viewEmployee(record.id)}>Voir</Button>
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
          <HeaderEmployee />
        </Header>

        <Content style={{ margin: '0 16px' }}>
          <div className="container">
            <div className="button-container" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" onClick={addNewEmployee}>
                Ajouter un employé
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
                placeholder="Sélectionner un département"
                style={{ width: 200 }}
                onChange={handleDepartementChange}
                allowClear
              >
                <Option value={null}>Aucun département</Option>
                {departements.map(departement => (
                  <Option key={departement} value={departement}>
                    {departement}
                  </Option>
                ))}
              </Select>

              <Button type="primary" onClick={exportExcelFile} style={{ marginLeft:'16px' }}>
                Télécharger sous format Excel
              </Button>
            </div>
            <Table
              dataSource={filteredEmployees}
              columns={columns}
              rowKey="id"
              bordered
              className="employee-table"
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ListEmployeeComponent;
