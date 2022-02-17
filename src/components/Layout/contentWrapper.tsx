import React from 'react';
import { Row, Col } from 'antd';

const style = { marginRight: '20%', marginLeft: '20%' };

const ContentWrapper = ({ children }: { children: any }) => (
    <Row gutter={16}>
        <Col span={24}>
            <div style={style}>{children}</div>
        </Col>
    </Row>
);

export default ContentWrapper;
