import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SingleSelect from '../select.js';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const entryTypes = [
    {type:'Planting', category: 'PlantRelated'},
    {type:'Harvesting', category: 'PlantRelated'},
    {type:'Tillage'}
];

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

const plants = [
    {name: 'Wheat'},
    {name: 'Rye'},
    {name: 'Soy'},
    {name: 'Corn'},
    {name: 'Buckwheat'}
];

export default class PolygonCropHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { styles, entry, currentFeature, patchNewEntry, onClose } = this.props;
        const { type, species, date } = entry.entry;

        return (
          <div>
              <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                {"What was the last activity that occured in this parcel?"}
              </Typography>
              <DatePicker
                  selected={date}
                  onChange={(date) => {
                    patchNewEntry({date});
                  }}/>
              <SingleSelect
                  placeholder={"Select an action..."}
                  options={entryTypes.map(({type}) => {return {value: type, label: type}})}
                  value={type ? {value: type, label: type} : null}
                  onChange={(e) => {
                    patchNewEntry({type: e.value});
                  }}
              />
              {isPlantRelated(type) ?
                 <SingleSelect
                     placeholder={"Select a crop..."}
                     options={plants.map(({name}) => {return {value: name, label: name}})}
                     value={species ? {value: species, label: species} : ""}
                     onChange={(e) => {
                       patchNewEntry({species: e.value});
                     }}
                 />
                 : null
              }
              <Mutation mutation={LOG_ENTRY}>
                {(logEntry, {loading, error}) => (
                  <div>
                    {error ? <p style={{color: styles.accent.red}}>"There was an error saving your update. Please try again."</p> : null}
                    <Button onClick={() => {
                      console.log(currentFeature);
                      // currentFeature.name = this.state.name;
                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                      onClose();
                    }}
                      style={{
                        margin: "25px",
                        backgroundColor: styles.accent.blue,
                        fontFamily: styles.fontFamily,
                        color: styles.primaryColor.color}}>
                      Submit</Button>
                  </div>
                )}
              </Mutation>
          </div>
        );
    }
}
