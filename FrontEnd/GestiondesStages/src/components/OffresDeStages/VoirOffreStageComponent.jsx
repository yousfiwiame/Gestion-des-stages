import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Card, Descriptions, Button, Typography } from 'antd';
import { getOffreStage } from '../../service/OffreStageService';
import Sidebar from '../Etudiants/DashboardComponents/Sidebar';
import HeaderOffreStage from './HeaderOffreStage'; 
import './Product.css';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

const ViewOffreStageComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [offreStage, setOffreStage] = useState(null);

    useEffect(() => {
        getOffreStage(id).then(response => {
            setOffreStage(response.data);
        }).catch(error => {
            console.error('Une erreur est survenue!', error);
        });
    }, [id]);

    if (!offreStage) {
        return <div>Chargement...</div>;
    }

    const goToListOffres = () => {
        navigate('/offre-stage/list');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider theme="light" trigger={null} collapsible className="sider">
                <Sidebar />
            </Sider>

            <Layout className="site-layout">
                <Header className="header">
                    <HeaderOffreStage />
                </Header>

                <Content style={{ margin: '0 16px' }}>
                    <div className="container">
                        <Card title={<Title level={2}>{`Détails de l'offre de stage ${offreStage.titreOffreStage}`}</Title>} className="card-container">
                            <Descriptions bordered column={1} labelStyle={{ fontWeight: 'bold' }}>
                                <Descriptions.Item label="Titre de l'offre">{offreStage.titreOffreStage}</Descriptions.Item>
                                <Descriptions.Item label="Lieu de l'offre">{offreStage.lieuOffreStage}</Descriptions.Item>
                                <Descriptions.Item label="Domaine">{offreStage.field}</Descriptions.Item>
                                <Descriptions.Item label="Date de début">{offreStage.dateDebut}</Descriptions.Item>
                                <Descriptions.Item label="Date de fin">{offreStage.dateFin}</Descriptions.Item>
                                <Descriptions.Item label="Durée de l'offre">{offreStage.dureeOffreStage}</Descriptions.Item>
                                <Descriptions.Item label="Rémunération">{offreStage.remunerationOffreStage}</Descriptions.Item>
                                <Descriptions.Item label="Description">{offreStage.descriptionOffreStage}</Descriptions.Item>
                            </Descriptions>
                            <div style={{ marginTop: '20px' }}>
                                <Button type="default" onClick={goToListOffres}>
                                    Retour à la liste des offres
                                </Button>
                            </div>
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ViewOffreStageComponent;
