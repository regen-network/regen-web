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

const fieldPractices = [
  {type: "cropRotation", label: "Crop rotation"},
  {type: "intercropping", label: "Intercropping", category: "PlantRelated"},
  {type: "coverCropping", label: "Cover cropping", category: "PlantRelated"},
  {type: "agroforestry", label: "Agroforestry", category: "PlantRelated"},
  {type: "organicAnnualCrops", label: "Organic annual crops", category: "PlantRelated"},
  {type: "perennialCrops", label: "Perennial crops", category: "PlantRelated"},
  {type: "silvopasture", label: "Silvopasture", category: "PlantRelated"},
  {type: "pastureCropping", label: "Pasture cropping", category: "PlantRelated"},
  {type: "holisticManagement", label: "Holistic management"},
  {type: "tilling", label: "Tilling", category: "Tilling"},
  {type: "conservationTill", label: "Conservation till", category: "Tilling"},
  {type: "noTill", label: "No-till", category: "Tilling"}
]

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

        return (
          <div>
            <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
              {"Please choose if any of these are practiced within the parcel limits:"}
            </Typography>
            <Mutation mutation={LOG_ENTRY}>
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
