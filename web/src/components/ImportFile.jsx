import React, { Component } from 'react';


class ImportFile extends React.Component {
//    const {open, onClose, theme, importedFile} = this.props;
//    private readonly inputOpenFileRef : RefObject<HTMLInputElement>

    constructor (props) {
        super(props);
        this.handleSubmit.bind(this);
        this.inputRef = React.createRef();

    }
    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${
        this.fileInput.current.files[0].name
      }`
        );
    }

    componentWillMount() {
        console.log("component iwll mount");
    }

    render() {
        {console.log("rendering this shit")}
        return (
            <div onSubmit={this.handleSubmit}>
                <input type="file" ref={this.fileInput} />
            </div>
        );
    }
}

export default (ImportFile);
