import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";

// Import your images here
import dstnyIcon from "./dstny-icon.png";
import dstnyCollapsedIcon from "./dstny-collapsed.png";

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
  {
    key: "Home",
    label: <Link to="/Home">Home</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "Builder",
    label: <Link to="/Builder">Builder</Link>,
    icon: <ToolOutlined />,
  },
];

const AntdNav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dstny-icon">
          {collapsed ? (
            <img
              src={dstnyCollapsedIcon}
              alt="Dstny Engage Collapsed"
              width="auto"
              height="30px"
              style={{
                display: "block",
                margin: "10px 20px 5px 25px",
              }}
            />
          ) : (
            <img
              src={dstnyIcon}
              alt="Dstny Engage"
              width="auto"
              height="50px"
              style={{
                display: "block",
                margin: "15px 20px 5px 38px",
              }}
            />
          )}
        </div>
        <Menu
          items={menuItems}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
        />
        <Footer
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            width: "100%",
            background: "none",
            padding: "10px 0",
            color: "white",
          }}
        >
          © 2023 Dstny Engage.
        </Footer>
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <Button
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
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
