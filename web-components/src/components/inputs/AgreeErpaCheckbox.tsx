import { Link } from 'react-router-dom';

import AgreeCheckbox from './AgreeCheckbox';

const AgreeErpaCheckbox: React.FC = () => {
  return (
    <AgreeCheckbox
      name="agreeErpa"
      label={
        <>
          I agree to the <Link to={'/'}>ERPA agreement</Link>
        </>
      }
    />
  );
};

export default AgreeErpaCheckbox;
