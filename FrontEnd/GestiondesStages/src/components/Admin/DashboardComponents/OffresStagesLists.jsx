import React, { useEffect, useState } from 'react';
import { Typography, Table, Select, Button, Input } from 'antd';
import ExcelJS from 'exceljs';
import { useNavigate } from 'react-router-dom';
import { listOffresStage, getOffreStageByField } from '../../../service/OffreStageService';

const { Option } = Select;

const OffresStageList = () => {
  const [offres, setOffres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllOffres();
  }, []);

  function getAllOffres() {
    listOffresStage()
      .then((response) => {
        setOffres(response.data);
        const uniqueCategories = [...new Set(response.data.map((offre) => offre.categorie))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Une erreur est survenue!', error);
      });
  }

  function handleCategorieChange(value) {
    setSelectedCategorie(value);
    if (value) {
      getOffreStageByField(value)
        .then((response) => {
          setOffres(response.data);
        })
        .catch((error) => {
          console.error('Une erreur est survenue!', error);
        });
    } else {
      getAllOffres();
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredOffres = offres.filter((offre) =>
    offre.id.toString().includes(search) ||
    offre.titre.toLowerCase().includes(search.toLowerCase()) ||
    offre.categorie.toLowerCase().includes(search.toLowerCase()) ||
    offre.description.toLowerCase().includes(search.toLowerCase())
  );

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Offres de stage');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Titre', key: 'titre', width: 20 },
      { header: 'Catégorie', key: 'categorie', width: 20 },
      { header: 'Description', key: 'description', width: 40 },
    ];

    filteredOffres.forEach((offre) => {
      worksheet.addRow({
        id: offre.id,
        titre: offre.titre,
        categorie: offre.categorie,
        description: offre.description,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Offres_de_stage.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center'
    },
    {
      title: 'Titre',
      dataIndex: 'titre',
      key: 'titre',
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
    }
  ];

  return (
    <div className="container" style={{ margin: '0 16px' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Liste des offres de stage
      </Typography.Title>
      <div className="select-container" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', marginTop: '26px' }}>
          <Select
            placeholder="Sélectionner une catégorie"
            style={{ width: 200 }}
            onChange={handleCategorieChange}
            allowClear
          >
            <Option value={null}>Aucune catégorie</Option>
            {categories.map((categorie) => (
              <Option key={categorie} value={categorie}>
                {categorie}
              </Option>
            ))}
          </Select>
          <div className="button-container" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <Input.Search
              placeholder="Rechercher"
              value={search}
              onChange={handleSearch}
              style={{ width: 200 }}
            />
            <Button type="primary" onClick={exportExcelFile} style={{ marginLeft: '20px' }}>
              Télécharger sous format Excel
            </Button>
          </div>
        </div>
      </div>
      <Table
        dataSource={filteredOffres}
        columns={columns}
        rowKey="id"
        bordered
        className="offre-table"
      />
    </div>
  );
};

export default OffresStageList;
