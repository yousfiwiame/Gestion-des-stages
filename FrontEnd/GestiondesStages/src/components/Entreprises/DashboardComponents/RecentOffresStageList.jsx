import React, { useEffect, useState } from 'react';
import { Table, Typography } from 'antd';
import { listOffresStage } from '../../../service/OffreStageService'; 

const RecentOffresStageList = () => {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    getRecentOffres();
  }, []);

  function getRecentOffres() {
    listOffresStage()
      .then((response) => {
        setOffres(response.data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching stage offers!', error);
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
  ];

  return (
    <div style={{ margin: '0 16px' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Vos offres de stages ajoutées récemment
      </Typography.Title>
      <Table dataSource={offres} columns={columns} rowKey="id" bordered />
    </div>
  );
};

export default RecentOffresStageList;
