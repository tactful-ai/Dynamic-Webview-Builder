import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Layout, Menu, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ToolOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;

const menuItems = [
  { to: '/home', text: 'Home', icon: <UserOutlined />, alt: 'Home Icon' },
  { to: '/builder', text: 'Builder', icon: <ToolOutlined />, alt: 'Builder Icon' },
];

const AntdNav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {menuItems.map((item, index) => (
            <Menu.Item key={index} icon={item.icon}>
              <Link to={item.to}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
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
        <Content className="content" style={{ background: colorBgContainer }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
AntdNav.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AntdNav;
