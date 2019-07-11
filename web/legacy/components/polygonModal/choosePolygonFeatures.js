import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as moment from 'moment';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOG_ENTRY = gql`
   mutation LogEntry($type: String!, $comment: String, $polygon: JSON!, $point: JSON, $species: String, $unit: String, $numericValue: BigFloat, $happenedAt: Datetime) {
    logEntry(input: {type: $type, comment: $comment, polygon: $polygon, point: $point, species: $species, unit: $unit, numericValue: $numericValue, happenedAt: $happenedAt}) {
      entry{
        id
        type
        polygon
        species
        when
      }
    }
  }
`;

const GET_ENTRIES = gql`
  query FindEntries($polygon: JSON!) {
    findEntries(polygon: $polygon) {
      nodes {
        when
        type
        unit
        point
        comment
        species
        numericValue
        id
      }
      totalCount
    }
  }
`;

const fieldFeatures = [
  {type: "Trees", label: "Area with trees"},
  {type: "Watercourse", label: "Watercourse"},
  {type: "Wetland", label: "Wetland"},
  {type: "Native Buffer", label: "Native or wild vegetation buffer strip"},
  {type: "Wildlife Corridor", label: "Wildlife corridor"},
];

export default class ChoosePolygonFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hasTrees: false,
          hasWatercourse: false,
          hasWetland: false,
          hasNativeBuffer: false,
          hasWildlifeCorridor: false
        };
    }

    handleFeatureChange = (e, name) => {
      this.setState({ [name]: e.target.checked });
    };

    render() {
        const {styles, currentFeature, updateStage} = this.props;
        const now = moment().format();
        const polygon = currentFeature.geometry;

        return (
          <div>
            <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
              {"Please choose if any of these features are present within the parcel limits:"}
            </Typography>
            <Mutation mutation={LOG_ENTRY}
              refetchQueries={[{query: GET_ENTRIES, variables: {polygon}}]}>
            {(logEntry, {loading, error}) => (
              <FormGroup row>
                {
                  fieldFeatures.map((feature) => {
                    return <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state[feature.type]}
                                onChange={(e) => {
                                  this.handleFeatureChange(e, feature.type);
                                  logEntry({variables: {type: feature.type, polygon: currentFeature.geometry, happenedAt: now }});
                                }}
                                value={feature.type}
                                color="primary"
                              />
                            }
                            label={feature.label}
                            key={feature.type}
                          />
                  })
                }
              </FormGroup>
            )}
            </Mutation>
            <Button onClick={() => {
              this.setState({
                hasTrees: false,
                hasWatercourse: false,
                hasWetland: false,
                hasNativeBuffer: false,
                hasWildlifeCorridor: false,
              });
              updateStage();
            }}
            style={{
              margin: "25px",
              backgroundColor: styles.accent.blue,
              fontFamily: styles.fontFamily,
              color: styles.primaryColor.color}}>
            Submit</Button>
          </div>
        );
    }
}
