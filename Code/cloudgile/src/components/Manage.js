// export const Manage = () => {
//     return (
//         <div>Manage members</div>
//     );
    
// }

import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
// import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
// import { GeneralInfoForm } from "../components/Forms";



export const Manage = () => {
  return (
    // <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Member
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        
      </div>

  );
};