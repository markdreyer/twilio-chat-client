import React from 'react';
import { Layout, Button, Input, Icon, Form, Row, Col, Card } from 'antd';
import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg';
import { useAuth0 } from "../providers/Auth0Provider";

const { Content } = Layout;

const LoginPage = ({ form, onSubmit }) => {

    const { loading, user, loginWithPopup } = useAuth0();

    const handleSubmit = async e => {
        e.preventDefault();


        loginWithPopup({}).then(x => {

            form.validateFields((err, values) => {
                if (!err) {
                    const { username } = values;
                    onSubmit(username);
                }
            });
        }
        )
    };

    const { getFieldDecorator } = form;

    const usernameFieldDecorator = getFieldDecorator('username', {
        rules: [{ required: true, message: 'Please input your username!' }],
    });

    return (
        <Layout>
            <Content style={{ height: '100vh' }}>
                <Row type="flex" justify="space-around" align="middle" style={{ height: '100%' }}>
                    <Col span={12} offset={6}>
                        <Card style={{ maxWidth: '404px' }}>
                            <Row type="flex" justify="center" align="middle" style={{ marginBottom: '30px' }}>
                                Welcome, {user || 'Guest'}
                            </Row>

                            <Form onSubmit={(e) => handleSubmit(e)}>
                                <Form.Item>
                                    {usernameFieldDecorator(
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button block type="primary" htmlType="submit">
                                        Sign in
                                        </Button>
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
