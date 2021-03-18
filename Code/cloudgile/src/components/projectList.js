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
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(projectName, projectType, projectLead, projectCategory, URL,projectId) {
    if(projectId === 1){
      return {
        projectName,
        projectType,
        projectLead,
        projectCategory,
        URL,
        history: [
          { date: '2020-01-02', clientId: 'CS 440' },
        ],
      };
}
else if (projectId==2)
{
    return {
        projectName,
        projectType,
        projectLead,
        projectCategory,
        URL,
        history: [
          { date: '2021-02s-02', clientId: 'Test client ' },
        ],
      };
}
}

function Row(props) {
    const history = useHistory();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const handleCellClick = (e) => {
   history.push(`/${row.projectName}`);
  }
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell  component="th" scope="row">
        <ListItem onClick={handleCellClick} button>
                {row.projectName}
          </ListItem>
        </TableCell>
        <TableCell align="right">{row.projectType}</TableCell>
        <TableCell align="right">{row.projectLead}</TableCell>
        <TableCell align="right">{row.projectCategory}</TableCell>
        <TableCell align="right">{row.URL}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History   
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Recent update</TableCell>
                    <TableCell>Client</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.clientId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    projectType: PropTypes.string.isRequired,
    projectLead: PropTypes.string.isRequired,
    projectCategory: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        clientId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    projectName: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
    
  createData('cloudgile', 'Scrum development', 'Tirth', 'Spring 2021', 'none',1),
  createData('speechAnalyzer', 'Basic software development', 'Akshant', 'No category', 'none',2 ),
];

export default function CollapsibleTable() {
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
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
