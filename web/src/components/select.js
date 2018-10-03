import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';

export default class SingleSelect extends React.Component {
  render() {

    const { value, options, onChange, placeholder } = this.props;

    return (
        <CreatableSelect
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
          name="entry"
          options={options}
        />
    );
  }
}
