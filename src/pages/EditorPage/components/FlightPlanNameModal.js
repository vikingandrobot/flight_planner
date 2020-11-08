import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';

function FlightPlanNameModal({ onSubmit, onCancel }) {

  const [name, setName] = useState(null);

  function handleCreate() {
    onSubmit(name);
  }

  return (
    <Modal
      okButtonProps={{
        disabled: !name,
      }}
      okText="Create Flight Plan"
      onCancel={onCancel}
      onOk={handleCreate}
      title="Please enter a name for your Flight Plan"
      visible
    >
      <Input
        onChange={(e) => { setName(e.target.value); }}
        placeholder="Flight Plan name"
      />
    </Modal>
  )
}

FlightPlanNameModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FlightPlanNameModal;
