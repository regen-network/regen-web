import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import Typography from '@material-ui/core/Typography';

export interface teamItemProps {
  name: string;
  title: string;
  desc: string;
  imgUrl: string;
  linkedUrl: string;
  githubUrl: string;
  twitterUrl: string;
}

const useStyles = makeStyles((theme: Theme) => {});
const teamItem = ({
  name,
  title,
  desc,
  imgUrl,
  linkedUrl,
  githubUrl,
  twitterUrl,
}: teamItemProps): JSX.Element => {
  return (
    <div>
      <img src={imgUrl} alt={name} />
      <Title variant="h4" align="center">
        {name}
      </Title>
      <Typography>{title}</Typography>
      <Typography>{desc}</Typography>
    </div>
  );
};

export default teamItem;
