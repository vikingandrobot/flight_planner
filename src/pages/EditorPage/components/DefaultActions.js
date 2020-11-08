import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

function DefaultActions({ onNew }) {
  return (
    <Button
      type="primary"
      icon={<PlusCircleOutlined />}
      onClick={onNew}
    >
      New Flight Plan
    </Button>
  )
}

DefaultActions.propTypes = {
  onNew: PropTypes.func.isRequired,
};

export default DefaultActions;
