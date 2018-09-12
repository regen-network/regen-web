import React from 'react';
import Select from 'react-select';

export default class SingleSelect extends React.Component {
  render() {

    const { value, options, onChange, placeholder } = this.props;

    return (
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name="flavor"
          options={options}
        />
    );
  }
}
