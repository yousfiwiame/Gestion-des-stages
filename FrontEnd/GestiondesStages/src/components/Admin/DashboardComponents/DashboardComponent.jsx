import React, {useState} from 'react';
import { Button, Layout, Flex } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import CustomHeader from './Header';
import MainContent from './MainContent';
import './Dashboard.css';


const { Sider, Header, Content } = Layout;
const DashboardComponent = () => {

    const [collapsed, setCollapsed] = useState(false);

    return<Layout>
        <Sider 
               theme='light' 
               trigger={null} 
               collapsible 
               collapsed={collapsed} 
               className='sider'>
        <Sidebar />

        <Button 
               type='text' 
               icon={collapsed ? <MenuUnfoldOutlined /> :<MenuFoldOutlined />}
               onClick={() => setCollapsed(!collapsed)} 
               className='trigger-btn'/>
        </Sider>
        <Layout>
            <Header className='header'>
                <CustomHeader />
            </Header>
            <Content className='content'>
                <Flex gap='large'>
                    <MainContent />
                </Flex>
            </Content>
        </Layout>
    </Layout>
}

export default DashboardComponent;