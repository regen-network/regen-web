import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const DELETE_POLYGON = gql`
   mutation DeletePolygon($id: UUID!) {
    deletePolygonById(input: {id: $id}) {
      deletedPolygonId
    }
  }
`;

const GET_POLYGONS = gql`
{
  allPolygons {
    nodes {
      id
      name
      geomJson
      owner
    }
  }
}
`;

class DeletePolygonConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { open, onClose, theme, deletedFeature } = this.props;

    const styles = {
      primaryColor: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
      accent: {
        blue: theme.palette.accent.blue
      },
      font: theme.title.fontFamily
    };

     return (

      <Modal open={open}
         onClose={onClose}>
          <div className="modal-add-entry">
            <div style={{margin: "25px"}}>
              <Typography variant="title" style={{fontFamily: styles.font}}>
                {"Are you sure you want to delete this parcel?"}
              </Typography>
              <Mutation mutation={DELETE_POLYGON}
                refetchQueries={[{query: GET_POLYGONS}]}>
                  {(deletePolygonById, {loading, error}) => (
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                      <Button
                        onClick={onClose}
                        style={{
                          marginTop: "25px",
                          backgroundColor: styles.accent.blue,
                          fontFamily: styles.font,
                          color: styles.primaryColor.color}}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          deletePolygonById({variables: {id: deletedFeature.id}});
                          onClose();
                        }}
                        style={{
                          marginTop: "25px",
                          backgroundColor: styles.primaryColor.backgroundColor,
                          fontFamily: styles.font,
                          color: styles.primaryColor.color}}>
                        Delete
                      </Button>
                    </div>
                  )}
                </Mutation>
            </div>
          </div>
      </Modal>
    );
  }
}

export default withTheme()(DeletePolygonConfirmation);
