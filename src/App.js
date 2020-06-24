import React from 'react';
import ChatApp from './components/ChatApp';
import './assets/App.css';
import 'antd/dist/antd.css';
import Spin from "antd/lib/spin";
import { Layout, Row, Col } from 'antd';
import { useAuth0 } from "./providers/Auth0Provider";

const { Content } = Layout;

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return (

      <Layout>
        <Content style={{ height: '100vh' }}>
          <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
            <Col span={12} offset={6}>
              <Spin size="large" />
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
  return <ChatApp />
}

export default App;
