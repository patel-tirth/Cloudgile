import { makeStyles, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@material-ui/core"
import { getCurrentUser } from "../auth";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { removeFromSprint } from "../data/Scrum/RemoveFromSprint";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        }
    }
});

export const Sprint = ({project, refresh}) => {
    const classes = useRowStyles();
    const current = getCurrentUser().id

    return (
        <TableContainer id="backlogTable" style={{maxHeight: '300px'}} component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {project.sprint && project.sprint.map((issue, key) => {
                        return (
                            <TableRow key={key} className={classes.root}>
                                <TableCell>{project.issues[issue].title}</TableCell>
                                <TableCell align="right">
                                    {(current === (project.issues[issue].assignedTo) || (current === project.leadId)) &&
                                        <>
                                            <IconButton aria-label="expand row" size="small" onClick={() => {
                                                removeFromSprint(project.id, issue);
                                                refresh();
                                            }}>
                                            <Tooltip title="Remove From Sprint">
                                                <RemoveCircleIcon style={{color: 'darkorange'}}/>
                                            </Tooltip>
                                            </IconButton>
                                        </>
                                    }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
