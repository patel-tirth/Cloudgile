import React from 'react';
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
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const handleCellClick = (e) => {
    e.preventDefault()
   history.push(`/projects/${row.id}`);
}
  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={handleCellClick} button>
        <TableCell>
          {row.issues && <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>}
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.lead}</TableCell>
        <TableCell align="right">{row.category}</TableCell>
        <TableCell align="right">{row.URL}</TableCell>
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
                    <TableCell>Updated By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.issues.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">{historyRow.issueName}</TableCell>
                      <TableCell>{historyRow.updatedOn}</TableCell>
                      <TableCell>{historyRow.updatedBy}</TableCell>
                      <TableCell>{historyRow.createdOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>}
    </React.Fragment>
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
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Project name</TableCell>
            <TableCell align="right">Project type</TableCell>
            <TableCell align="right">Project lead</TableCell>
            <TableCell align="right">Project category</TableCell>
            <TableCell align="right">URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.length > 0 && props.rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
