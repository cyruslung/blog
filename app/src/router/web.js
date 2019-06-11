import React, { Component, Fragment } from 'react';
import { Route, Switch, } from 'react-router-dom'
import { Row, Col, Spin } from 'antd';
import Header from '@/component/web/header/index';
import Sider from '@/component/web/sider/index';
import RouterConfig from '@/config/routerConfig';
import { connect } from 'react-redux'
import NotFound from '@/view/common/404';

class Web extends Component {
    render() {
        let { loading, } = this.props
        return (
            <Fragment>
                <Header>header</Header>
                <Row >
                    <Col span={5} > <Sider></Sider></Col>
                    <Col span={19}>
                        <Spin tip="Loading..." spinning={loading}>
                            <div id='main-body' style={{ height: 'calc(100vh - 73px)', overflowY: 'auto' }}>
                                <Switch>
                                    {RouterConfig.web.map((res, key) =>
                                        <Route {...res} key={key} />
                                    )}
                                    <Route component={NotFound} />
                                </Switch>
                            </div>
                        </Spin>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
let mapStateToProps = state => {
    let { loading } = state.common
    return {
        loading
    }
}
export default connect(mapStateToProps)(Web)