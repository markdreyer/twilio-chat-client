import React from 'react';
import { Layout, Button, Form, Row, Col, Card } from 'antd';
import { useAuth0 } from "../providers/Auth0Provider";

const { Content } = Layout;

const LoginPage = ({ form, onSubmit }) => {

    const { loading, user, loginWithPopup, isAuthenticated } = useAuth0();
    const { getFieldDecorator } = form;

    return (
        <Layout>
            <Content style={{ height: '100vh' }}>
                <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
                    <Col span={12} offset={6}>
                        <Card style={{ maxWidth: '404px' }}>
                            <Row type="flex" justify="center" align="middle" style={{ marginBottom: '30px' }}>
                                <h3>Welcome, {user?.name || 'Guest'}</h3>
                            </Row>
                            <Row type="flex" justify="center" align="middle" style={{ marginBottom: '30px' }}>
                                Please sign in to start chatting.
                            </Row>
                            <Form >
                                <Form.Item>
                                    <Button onClick={() => onSubmit()} block type="primary" htmlType="submit">Sign in</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default Form.create({ name: 'login' })(LoginPage);
