import React, { Component } from 'react';
import './AddEntryModal.css';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GET_POLYGONS = gql`
{
  getCurrentUser
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

class UploadModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('accessToken', this.props.accessToken);

        fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: data,
        }).then((res) => {
            console.log("res=",res);
            console.log("data=",data);
            console.log("accessToken=",this.props.accessToken);
        });
    }

    componentWillMount() {
        console.log("component iwll mount");
        this.host = "localhost:5000";
    }

    render() {
        const {open, onClose, theme, accessToken } = this.props;

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
                    {"Select a .kmz file."}
                  </Typography>
                  {/* <Query query={GET_POLYGONS} refetchQueries={[{query: GET_POLYGONS}]}> */}

                    <form encType="multipart/form-data" onSubmit={this.handleUpload} >
                      <div>
                        <input ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".kmz" />
                        <input type="hidden" ref={(input) => { this.actionInput = input }} name="accessToken" value="{accessToken}"/>
                      </div>
                      <br />
                      <div>
                        <input type="submit"/>
                      </div>
                    </form>
                    {/* </Query> */}

                </div>
              </div>
            </Modal>
        );
    }
}

export default withTheme()(UploadModal);
