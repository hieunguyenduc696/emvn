import { Layout, Menu, theme } from "antd";
import { HomeOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import { Link } from "react-router-dom";
import { useTrackContext } from "../context";
import { useEffect, useState } from "react";

const { Content, Sider, Footer } = Layout;

export const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { currentTrack } = useTrackContext();
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    if (currentTrack) {
      setAudioSrc(`http://localhost:8000/static/${currentTrack?.audio}`);
    }
  }, [currentTrack]);

  return (
    <Layout className="layout">
      <Sider
        style={{
          padding: "1rem 0",
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname === "/" ? "1" : "2"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: <Link to="/">Track Management</Link>,
            },
            {
              key: "2",
              icon: <UnorderedListOutlined />,
              label: <Link to="/playlist">Playlist</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>

        <Footer>
          {!audioSrc ? (
            "No track selected"
          ) : (
            <>
              <div>
                <audio
                  controls
                  style={{ width: "100%" }}
                  autoPlay
                  src={audioSrc}
                ></audio>
              </div>
            </>
          )}
        </Footer>
      </Layout>
    </Layout>
  );
};
