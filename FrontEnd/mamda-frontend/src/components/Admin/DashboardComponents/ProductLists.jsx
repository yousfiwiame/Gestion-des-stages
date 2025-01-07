import React, { useEffect, useState } from 'react';
import { Typography, Table, Select, Button, Input } from 'antd';
import ExcelJS from 'exceljs';
import { useNavigate } from 'react-router-dom';
import { listProducts, getProductByCategories } from '../../../service/ProductService';

const { Option } = Select;

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    listProducts()
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = [...new Set(response.data.map((prod) => prod.categorie))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Une erreur est survenue!', error);
      });
  }

  function handleCategorieChange(value) {
    setSelectedCategorie(value);
    if (value) {
      getProductByCategories(value)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Une erreur est survenue!', error);
        });
    } else {
      getAllProducts();
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredProducts = products.filter((product) =>
    product.id.toString().includes(search) ||
    product.numSerie.toLowerCase().includes(search.toLowerCase()) ||
    (product.employee && (
      product.employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      product.employee.lastName.toLowerCase().includes(search.toLowerCase()) ||
      product.departement.toLowerCase().includes(search.toLowerCase())
    )) ||
    (product.categorie && product.categorie.toLowerCase().includes(search.toLowerCase())) 
  );

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Biens informatiques affectés');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Numéro de série', key: 'numSerie', width: 20 },
      { header: 'Catégorie', key: 'categorie', width: 20 },
      { header: 'Description', key: 'description', width: 20 },
    ];

    filteredProducts.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        numSerie: product.numSerie,
        categorie: product.categorie,
        description: product.description,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Biens informatiques affectés.xlsx';
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
      title: 'Numéro de série',
      dataIndex: 'numSerie',
      key: 'numSerie',
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
        Biens informatiques affectés
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
            <Button type="primary" onClick={exportExcelFile} style={{ marginLeft: '20px'}}>
              Télécharger sous format Excel
            </Button>
          </div>
        </div>
      </div>
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        bordered
        className="product-table"
      />
    </div>
  );
};

export default ProductLists;
