import MUIDataTable from "mui-datatables";
import {storiesOf} from "@storybook/react";
import * as React from "react";

const columns = [
  {
    name: "claim",
    label: "Claim",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "time",
    label: "Time",
    options: {
      filter: true,
      sort: false,
    }
  },
];

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
];

storiesOf("Components|Tables/mui-datatables", module)
  .add("default", () =>
    <MUIDataTable
      title={"Employee List"}
      data={data}
      columns={columns}
      options={{pagination:false}}
    />
  );

