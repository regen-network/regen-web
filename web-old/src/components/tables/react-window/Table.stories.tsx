import * as React from 'react';
import {FixedSizeList as List} from 'react-window';
import {storiesOf} from "@storybook/react";
import {TableRow, TableCell, Paper, TableHead} from "@material-ui/core";
import AutoSizer from 'react-virtualized-auto-sizer';


const Row = ({index, style}: any) => (
  <div style={style}>
    <TableRow>
      <TableCell>Reforestation Event</TableCell>
      <TableCell>10 hours ago</TableCell>
    </TableRow>
  </div>
);


const Example = () => (
  <Paper style={{height:"100%", width:"100%"}}>
    <TableHead>
      <TableRow>
        <TableCell>Claim</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
    </TableHead>
    <AutoSizer>
      {({height, width}) =>
        <List height={height} itemCount={1000} itemSize={35} width={width}>
          {Row}
        </List>
      }
    </AutoSizer>
  </Paper>

);

storiesOf("Components|Tables/react-window", module)
  .add("default", () => <Example/>);
