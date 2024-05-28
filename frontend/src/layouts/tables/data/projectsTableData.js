/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import { IconButton, Menu, MenuItem, ButtonGroup} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
export default function data() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApprove = () => {
    console.log('Approved');
    handleClose();
  };

  const handleReject = () => {
    console.log('Rejected');
    handleClose();
  };

  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Actions = () => (
    <div>
      {/* <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton> */}
      {/* <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleApprove}>Approve</MenuItem>
        <MenuItem onClick={handleReject}>Reject</MenuItem>
      </Menu> */}
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <MDButton style={{ backgroundColor: '#39c939', color: 'white' }}>Approve</MDButton>
          <MDButton style={{ backgroundColor: '#bd180c', color: 'white' }}>Reject</MDButton>
          </ButtonGroup>
    </div>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "domain", accessor: "domain", width: "30%", align: "left" },
      { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "system", accessor: "system", align: "left" },
      { Header: "record type", accessor: "recordtype", align: "left" },
      { Header: "record name", accessor: "recordname", align: "left" },
      { Header: "Approval task", accessor: "approvaltask", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "assigned date", accessor: "assigneddate", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
      {
        domain: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"> Validation Test</MDTypography>),
        project:  (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Mind Pros esign
          </MDTypography>
        ),
        system: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            JIRA
          </MDTypography>
        ),
        recordtype: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Jira Story
          </MDTypography>
        ),
        recordname: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Vera-1 - Test for validation
          </MDTypography>
        ),
        approvaltask: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           Lead data Manger approval
          </MDTypography>
        ),
        assigneddate: (
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
           5/26/2024
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            In Progress
          </MDTypography>
        ),
        completion: <Progress color="info" value={60} />,
        action: <Actions style={{ position: 'absolute', top: '14rem', left: '68rem' }}/>,
      },
    ],
  };
}
