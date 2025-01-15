import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { listEntreprises } from '../../../service/EntrepriseService'; 

const RecentCompaniesList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getRecentCompanies();
  }, []);

  function getRecentCompanies() {
    listEntreprises()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching companies!', error);
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
          title: 'Nom d\'utilisateur',
          dataIndex: 'username',
          key: 'username',
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
        }
  ];

  return (
    <div style={{ margin: '0 16px' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>Entreprises ajoutées récemment</Typography.Title>
      <Table dataSource={companies} columns={columns} rowKey="id" bordered />
    </div>
  );
};

export default RecentCompaniesList;
