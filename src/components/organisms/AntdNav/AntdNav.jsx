import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Layout, Menu, Button, theme } from "antd";
import {
  LeftOutlined,
  RightOutlined,
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background:
            "linear-gradient(149.16deg, rgb(17, 129, 153) 26.81%, rgb(0, 73, 107) 93.24%)",
        }}
      >
        <div className="dstny-icon">
          {collapsed ? (
            <img
              src={dstnyCollapsedIcon}
              alt="Dstny Engage Collapsed"
              width="auto"
              height="60px"
              style={{
                display: "block",
                margin: "10px 20px 5px 15px",
              }}
            />
          ) : (
            <img
              src={dstnyIcon}
              alt="Dstny Engage"
              width="auto"
              height="60px"
              style={{
                display: "block",
                margin: "15px 20px 5px 38px",
              }}
            />
          )}
        </div>
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "12px",
            width: 30,
            height: 30,
            background: "rgb(17, 129, 153)",
            color: "white",
            position: "fixed",
            margin: collapsed ? "-50px 20px 0px 60px" : "-50px 20px 0px 180px",
          }}
        />
        <Menu
          items={menuItems}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          style={{
            background: "rgb(17, 129, 153)",
            color: "white",
          }}
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
        ></Header>
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
