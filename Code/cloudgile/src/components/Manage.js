import React from "react";
import {Button, Dropdown } from '@themesberg/react-bootstrap';

export const Manage = () => {
  return (
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
  );
};