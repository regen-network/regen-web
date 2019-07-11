import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SingleSelect from '../../../src/components/select.js';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as moment from 'moment';
import { entryTypes, plants } from '../../constants';

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

const entryTypeCategories = new Map(entryTypes.map(({type,category}) => [type, category]));
const isPlantRelated = (type) => entryTypeCategories.get(type) === 'PlantRelated';

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
        const { styles, entry, currentFeature, patchNewEntry, onClose, clearEntry } = this.props;
        const { type, species, date } = entry.entry;
        const polygon = currentFeature.geometry;

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
                    patchNewEntry({type: e.value, species: isPlantRelated(e.value) ? species : null});
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
              <Mutation mutation={LOG_ENTRY}
                refetchQueries={[{query: GET_ENTRIES, variables: {polygon}}]}>
                {(logEntry, {loading, error}) => (
                  <div>
                    {error ? <p style={{color: styles.accent.red}}>"There was an error saving your update. Please try again."</p> : null}
                    <Button onClick={() => {
                      const update = `${type} ${species || ""} in ${moment(date).format("YYYY")}`;
                      this.setState(prevState => ({
                          entries: [...prevState.entries, update]
                      }));
                      logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                      clearEntry();
                    }}
                      style={{
                        margin: "25px",
                        backgroundColor: styles.primaryColor.backgroundColor,
                        fontFamily: styles.fontFamily,
                        color: styles.primaryColor.color}}>
                      Save and Add Another</Button>
                    <Button onClick={() => {
                      if (type) {
                        logEntry({variables: {type: type, polygon: currentFeature.geometry, species: species, happenedAt: date }});
                        clearEntry();
                      }
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
