import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_POLYGON = gql`
   mutation CreatePolygon($name: String!,  $geojson: JSON!, $owner: String!) {
    createPolygonByJson(input: {name: $name, geojson: $geojson, owner: $owner}) {
      polygon{
        id
        name
        geomJson
        owner
      }
    }
  }
`;

export default class SavePolygonName extends Component {

    removeItemFromStorage = (id) => {
      const unsavedFeatures = JSON.parse(localStorage.getItem("features"));
      const remainingUnsavedFeatures = unsavedFeatures.filter((feature) => {
        return feature.id !== id;
      });
      localStorage.setItem("features", JSON.stringify(remainingUnsavedFeatures));
    }

    render() {
        const { styles, handleNameChange, name, user, currentFeature, optimisticSaveFeature, clearSelected, updateStage } = this.props;

        return (
          <div style={{margin: "25px"}}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                  e.preventDefault();
              }
            }}>
                <form noValidate>
                  <TextField
                    id="name"
                    label="Name"
                    autoFocus={true}
                    value={name}
                    onChange={handleNameChange('name')}
                    margin="normal"
                  />
                </form>
                <Mutation mutation={CREATE_POLYGON}>
                    {(createPolygonByJson, {loading, error}) => (
                      <div>
                          {error ? <p style={{color: styles.accent.red}}>"There was an error saving your parcel. Please try again."</p> : null}
                          <Button onClick={() => {
                            createPolygonByJson({variables: {name: name, geojson: currentFeature.geometry, owner: user }});
                            optimisticSaveFeature(currentFeature.id, name);
                            clearSelected(currentFeature.id); // delete from map
                            this.removeItemFromStorage(currentFeature.id);
                            updateStage();
                          }}
                          style={{
                            margin: "25px",
                            backgroundColor: styles.accent.blue,
                            fontFamily: styles.fontFamily,
                            color: styles.primaryColor.color}}>
                          Save Parcel</Button>
                      </div>
                    )}
                  </Mutation>
              </div>
        );
    }
}
