import React from 'react';
import PropTypes from 'prop-types';

import { List, Typography, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import styles from './FlightPlanList.module.scss';

const { Title } = Typography;

function FlightPlan({ item, onClick }) {
  return (
    <List.Item
      key={item.id}
      actions={[
        <Button
          type="text"
          size="small"
          key="view-action"
          onClick={() => onClick(item)}
          icon={<EyeOutlined />}
        >
          View
        </Button>,
      ]}
    >
      <List.Item.Meta
        title={item.title}
      />
    </List.Item>
  )
}

function FlightPlanList({
  className = '',
  flightPlans = [],
  loading,
  onRowClick,
}) {

  function handleClick(item) {
    if (onRowClick) {
      onRowClick(item);
    }
  }

  return (
    <section className={`${styles.flightPlanList} ${className}`}>
      <Title level={4} style={{ padding: '10px 10px 0 10px'}}>
        Your Flight Plans
      </Title>
      <section className={styles.listContainer}>
        <List
          itemLayout="horizontal"
          dataSource={flightPlans}
          rowKey="id"
          bordered
          loading={loading}
          renderItem={item => <FlightPlan key={item.id} item={item} onClick={handleClick} />}
        />
      </section>
    </section>
  );
}

FlightPlanList.propTypes = {
  className: PropTypes.string,
  flightPlans: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
  })),
  loading: PropTypes.bool,
  onRowClick: PropTypes.func,
};

export default FlightPlanList;
