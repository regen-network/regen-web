import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SingleSelect from '../select.js';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';

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
    {type: 'Planting', category: 'PlantRelated'},
    {type: 'Harvesting', category: 'PlantRelated'},
    {type: 'Tillage'},
    {type: 'Natural pasture'},
    {type: 'Other'}
];

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));

const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

const plants = [
    {name: 'Wheat'},
    {name: 'Rye'},
    {name: 'Soy'},
    {name: 'Corn'},
    {name: 'Buckwheat'},
    {name: 'Sorghum'},
    {name: 'Oat'},
    {name: 'Barley'},
    {name: 'Rice'},
    {name: 'Other'}
];

const now = moment().format();
const currentYear = parseInt(moment().format("YYYY"));

const years = [
    {value: now, label: currentYear},
    {value: moment().subtract(1, 'years').format(), label: currentYear - 1},
    {value: moment().subtract(2, 'years').format(),  label: currentYear - 2},
    {value: moment().subtract(3, 'years').format(), label: currentYear - 3}
];

export default class PolygonCropHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          entries: []
        };
    }

    render() {
        const { styles, entry, currentFeature, patchNewEntry, onClose } = this.props;
        const { type, species, date } = entry.entry;

        const entries = this.state.entries.map((entry) =>
          <Typography variant="subheading" key={this.state.entries.indexOf(entry)} style={{fontFamily: styles.fontFamily, margin: "15px"}}>
            {entry}
          </Typography>
        );

        return (
          <div>
              <Typography variant="subheading" style={{fontFamily: styles.title.fontFamily, margin: "15px"}}>
                {`What events occured on the land in the last few years?`}
              </Typography>
              <div>{this.state.entries.length ? entries : null}</div>
              <SingleSelect
                  placeholder={"Select a year..."}
                  options={years}
                  onChange={(e) => {
                    patchNewEntry({date: e.value});
                  }}
              />
              <SingleSelect
                  placeholder={"Select an action..."}
                  options={entryTypes.map(({type}) => {return {value: type, label: type}})}
                  onChange={(e) => {
                    patchNewEntry({type: e.value});
                  }}
              />
              {isPlantRelated(type) ?
                 <SingleSelect
                     placeholder={"Select a crop..."}
                     options={plants.map(({name}) => {return {value: name, label: name}})}
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
                      // TODO reset form
                      // TODO clear species if no longer plant related
                      const update = `${type} ${species || ""} in ${moment(date).format("YYYY")}`;
                      this.setState(prevState => ({
                          entries: [...prevState.entries, update]
                      }));
                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                    }}
                      style={{
                        margin: "25px",
                        backgroundColor: styles.primaryColor.backgroundColor,
                        fontFamily: styles.fontFamily,
                        color: styles.primaryColor.color}}>
                      Add Another</Button>
                    <Button onClick={() => {
                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                      onClose();
                    }}
                      style={{
                        margin: "25px",
                        backgroundColor: styles.accent.blue,
                        fontFamily: styles.fontFamily,
                        color: styles.primaryColor.color}}>
                      Done</Button>
                  </div>
                )}
              </Mutation>
          </div>
        );
    }
}
