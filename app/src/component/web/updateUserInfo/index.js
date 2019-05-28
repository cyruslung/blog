import React, { Component } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { updateUser } from '@/store/user/action'
import { connect } from 'react-redux'

class UpdateUserInfo extends Component {
    handleSubmit = e => {
        e.preventDefault()
        let { dispatchUpdateUser, onCancel } = this.props
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                dispatchUpdateUser(values).then(data => {
                    if (data) {
                        if (data.status) {
                            onCancel()
                            message.success('修改成功');
                        }
                    }
                })
            }
        })
    }
    compareToNextPassword = (rule, value, callback) => {
        const { getFieldValue, validateFields } = this.props.form;
        let confirmPassword = getFieldValue('confirmPassword')
        if (!confirmPassword || !value) {
            callback()
        } else {
            validateFields(['confirmPassword'], (errors, values) => { });
        }
        callback()

    }
    compareToFirstPassword = (rule, value, callback) => {
        const { getFieldValue } = this.props.form;
        let password = getFieldValue('password')
        if (!password || !value) {
            callback()
        } else {
            if (value !== password) {
                callback('两次密码输入不一致')
            }
            callback()
        }
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 6, offset: 0 },
            wrapperCol: { span: 17, offset: 0 },
        };
        const submitLayout = {
            wrapperCol: { span: 23, offset: 0 },
        };
        let { isShow, onCancel, username, name } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="修改用户信息"
                visible={isShow}
                onCancel={onCancel}
                width={434}
                footer={null} >
                <Form onSubmit={this.handleSubmit}  {...formItemLayout} className="login-form">
                    <Form.Item label="用户邮箱">
                        <Input disabled value={username} />
                    </Form.Item>
                    <Form.Item label="用户昵称">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {
                                    required: true,
                                    message: '用户昵称',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="原密码" hasFeedback>
                        {getFieldDecorator('oldPassword', {
                            validateFirst: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入原密码',
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="新密码" hasFeedback>
                        {getFieldDecorator('password', {
                            validateFirst: true,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入新密码',
                                },
                                {
                                    min: 6,
                                    message: '密码长度至少为6'
                                },
                                {
                                    validator: this.compareToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入确认密码',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item {...submitLayout}>
                        <Button type="primary" htmlType="submit" style={{ width: '100%', float: 'right' }}>
                            确认修改
                       </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
let mapStateToProps = state => {
    let { username, name } = state.user
    return {
        username,
        name
    }
}
let mapDispatchToProps = dispatch => ({
    dispatchUpdateUser: params => dispatch(updateUser(params)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'updateUserInfo' })(UpdateUserInfo))