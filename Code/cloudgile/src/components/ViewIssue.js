import { Divider, Typography } from '@material-ui/core'
import React from 'react'
import { Modal } from 'react-bootstrap'

export const ViewIssue = (props) => {
    const {issue} = props
    return (
        <Modal
            show={props.show}
            onHide={props.close}
            // backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ textTransform: 'uppercase' }}>{issue.title} <span style={{fontSize: '12px'}}>{issue.open ? "(Open)" : "(Closed)"}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Typography gutterBottom>Updated On: {issue.updatedOn}</Typography>
                <Typography gutterBottom>Created On: {issue.createdOn}</Typography>
                {issue.open ? 
                <>
                    <Typography gutterBottom>Complete By: {issue.completeBy}</Typography>
                    <Typography gutterBottom>Created By: {props.users[issue.createdBy].name} ({props.users[issue.createdBy].email})</Typography>
                    <Typography gutterBottom>Priority: {issue.priority}</Typography>
                    {issue.reOpenedBy && <Typography gutterBottom>Re-opened By: {props.users[issue.reOpenedBy].name} ({props.users[issue.reOpenedBy].email})</Typography>}
                </>
                :
                <>
                    <Typography gutterBottom>Closed On: {issue.closedOn}</Typography>
                    <Typography gutterBottom>Closed By: {props.users[issue.closedBy].name} ({props.users[issue.closedBy].email})</Typography>
                </>
                }
                <Typography gutterBottom/>
                <Typography style={{ textTransform: 'uppercase' }}>Issue Description</Typography>
                <Divider/>
                <Typography> &emsp;&emsp; {issue.description}</Typography>
            </Modal.Body>
        </Modal>
    )
}
