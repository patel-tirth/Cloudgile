import React from 'react';
import { useState,useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import { getProject } from '../Data/Projects/getProject';
import { getCurrentUser } from '../auth';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectDetails() {
  const classes = useStyles();

  const {projectID} = useParams()
  const [project, setProject] = useState(null)

  const loadData = async () => {
    let data = await getProject(getCurrentUser().id, projectID)
    setProject(data)
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    project  ? 
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography  component="h2" variant="h5" gutterBottom>
          Project Details
        </Typography>
        <Typography color="textSecondary" component="h2">
          Project Lead: <b>{project.leadName}</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          Project Category: <b>{project.category}</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          Issues pending: <b>{project.numBacklog}</b>
        </Typography>
        <Typography color="textSecondary" component="h2">
          Issues Resolved: <b>{project.numTimeline}</b>
        </Typography>
      </CardContent>
    </Card>
    : null
  );
}
