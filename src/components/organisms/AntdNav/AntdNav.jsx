import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ToolOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: 'Home',
    label: <Link to='/Home'>Home</Link>,
    icon: <UserOutlined />,
  },
  {
    key: 'Builder',
    label: <Link to='/Builder'>Builder</Link>,
    icon: <ToolOutlined />,
  },
];

const AntdNav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu items={menuItems} theme="dark" mode="inline" defaultSelectedKeys={['0']} /> 
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '16px',
            minHeight: 280,
            maxHeight: '90vh',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AntdNav;
