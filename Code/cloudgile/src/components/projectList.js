import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Tooltip } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    "&:hover": {
      backgroundColor: 'rgb(202, 202, 202, 0.42)',
      cursor: 'pointer'
    }
  }
});

function Row(props) {
  const history = useHistory();
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const handleCellClick = (e) => {
    e.preventDefault()
    history.push(`/projects/${row.id}`);
  }
  
  return (
    <Fragment>
      <TableRow className={classes.root} button>
        <TableCell component="th" scope="row" onClick={handleCellClick}>{row.name}</TableCell>
        <TableCell align="right" onClick={handleCellClick}>{row.type}</TableCell>
        <TableCell align="right" onClick={handleCellClick}>{row.leadName}</TableCell>
        <TableCell align="right" onClick={handleCellClick}>{row.category}</TableCell>
        <TableCell align="right" onClick={handleCellClick}>{row.id}</TableCell>
        <TableCell align="right">
          <Tooltip title="Copy ID to clipboard">
            <AssignmentIcon style={{ color: 'black' }}/>
          </Tooltip>
          { <IconButton aria-label="expand row" size="small" style={{marginLeft: 10}} onClick={() => setOpen(!open)}>
            {open ? 
            <Tooltip title="Shrink">
              <KeyboardArrowUpIcon  style={{color: 'black'}}/>
            </Tooltip>
            : 
            <Tooltip title="expand">
              <KeyboardArrowDownIcon  style={{color: 'black'}}/>
            </Tooltip>}
          </IconButton>}
        </TableCell>
      </TableRow>
      {row.issues && <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History   
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Issue</TableCell>
                    <TableCell>Created On</TableCell>
                    <TableCell>Updated On</TableCell>
                    <TableCell>Complete By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.backlog.map((issue) => (
                    <TableRow>
                      <TableCell component="th" scope="row">{row.issues[issue].title}</TableCell>
                      <TableCell>{row.issues[issue].createdOn}</TableCell>
                      <TableCell>{row.issues[issue].updatedOn}</TableCell>
                      <TableCell>{row.issues[issue].completeBy}</TableCell>
                    </TableRow>
                  ))}
                  {false && row.timeline.map((issue) => (
                    <TableRow>
                      <TableCell component="th" scope="row">{row.issues[issue].title}</TableCell>
                      <TableCell>{row.issues[issue].createdOn}</TableCell>
                      <TableCell>{row.issues[issue].updatedOn}</TableCell>
                      <TableCell>{row.issues[issue].completeBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>}
    </Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    type: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    issues: PropTypes.arrayOf(
      PropTypes.shape({
        issueName: PropTypes.string.isRequired,
        createdOn: PropTypes.string.isRequired,
        updatedOn: PropTypes.string.isRequired,
        updatedBy: PropTypes.string.isRequired
      }),
    ),
    name: PropTypes.string.isRequired,
    URL: PropTypes.string,
  }).isRequired,
};

export default function CollapsibleTable(props) {  
  return (
    <section style={{ padding: '0px 10px' }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Project name</TableCell>
              <TableCell align="right">Project type</TableCell>
              <TableCell align="right">Project lead</TableCell>
              <TableCell align="right">Project category</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.length > 0 && props.rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}
