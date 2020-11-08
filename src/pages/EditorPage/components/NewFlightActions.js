import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

function NewFlightActions({ disabled, onCancel, onCreate, }) {
  return (
    <>
      <Button
        type="primary"
        onClick={onCreate}
        disabled={disabled}
        icon={<CheckCircleOutlined />}
      >
        Create Flight Plan
      </Button>
      <Button
        onClick={onCancel}
      >
        Cancel
      </Button>
    </>
  )
}

NewFlightActions.propTypes = {
  disabled: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default NewFlightActions;
