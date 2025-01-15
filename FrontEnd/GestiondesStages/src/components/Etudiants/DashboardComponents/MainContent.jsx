import React from 'react';
import { Layout } from 'antd';
import RecentOffresStage from './RecentOffresStageList';
const MainContent = () => {
  return (
    <div style={{ flex: 1 }}>
      <Layout>
        <RecentOffresStage />
      </Layout>
    </div>
  );
};

export default MainContent;
