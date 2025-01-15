import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { listEtudiants } from '../../../service/EtudiantService'; 

const RecentStudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getRecentStudents();
  }, []);

  function getRecentStudents() {
    listEtudiants()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching students!', error);
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
        title: 'Nom d\'utilisateur',
        dataIndex: 'username',
        key: 'username',
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
        title: 'Statut',
        dataIndex: 'statut',
        key: 'statut',
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
      }
  ];

  return (
    <div style={{ margin: '0 16px' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>Étudiants Récemment Ajoutés</Typography.Title>
      <Table dataSource={students} columns={columns} rowKey="id" bordered />
    </div>
  );
};

export default RecentStudentsList;
