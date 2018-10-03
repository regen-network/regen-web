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

const fieldPractices = [
  {type: "Crop Rotation", label: "Crop rotation"},
  {type: "Intercropping", label: "Intercropping", category: "PlantRelated"},
  {type: "Cover Cropping", label: "Cover cropping", category: "PlantRelated"},
  {type: "Agroforestry", label: "Agroforestry", category: "PlantRelated"},
  {type: "Keyline Planting", label: "Keyline planting", category: "PlantRelated"},
  {type: "Organic Annual Crops", label: "Organic annual crops", category: "PlantRelated"},
  {type: "Perennial Crops", label: "Perennial crops", category: "PlantRelated"},
  {type: "Silvopasture", label: "Silvopasture", category: "PlantRelated"},
  {type: "Pasture Cropping", label: "Pasture cropping", category: "PlantRelated"},
  {type: "Holistic Management", label: "Holistic management"},
  {type: "Tilling", label: "Tilling", category: "Tilling"},
  {type: "Conservation Till", label: "Conservation till", category: "Tilling"},
  {type: "No-Till", label: "No-till", category: "Tilling"}
];

export default class ChoosePolygonPractices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
              {"Please choose if any of these are practiced within the parcel limits:"}
            </Typography>
            <Mutation mutation={LOG_ENTRY}
              refetchQueries={[{query: GET_ENTRIES, variables: {polygon}}]}>
            {(logEntry, {loading, error}) => (
              <FormGroup row>
                {
                  fieldPractices.map((practice) => {
                    return <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state[practice.type]}
                                onChange={(e) => {
                                  this.handleFeatureChange(e, practice.type);
                                  logEntry({variables: {type: practice.type, polygon: currentFeature.geometry, happenedAt: now }});
                                }}
                                value={practice.type}
                                color="primary"
                              />
                            }
                            label={practice.label}
                            key={practice.type}
                          />
                  })
                }
              </FormGroup>
            )}
            </Mutation>
            <Button onClick={() => {
              this.setState({});
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
