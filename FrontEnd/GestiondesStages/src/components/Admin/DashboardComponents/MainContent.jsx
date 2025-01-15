import React from 'react';
import { Layout } from 'antd';
import OffresStageList from './OffresStagesLists'; // Liste des offres
import RecentCompaniesList from './RecentCompaniesList'; // Liste des entreprises
import RecentStudentsList from './RecentStudentsList'; // Liste des étudiants

const MainContent = () => {
  return (
    <div style={{ flex: 1 }}>
      <Layout>
        {/* Liste des entreprises récentes */}
        <div style={{ margin: '16px' }}>
          <RecentCompaniesList />
        </div>
        {/* Liste des étudiants récentes */}
        <div style={{ margin: '16px' }}>
          <RecentStudentsList />
        </div>
      </Layout>
    </div>
  );
};

export default MainContent;
