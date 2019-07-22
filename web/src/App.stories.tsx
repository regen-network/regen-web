import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Table from 'web-components/lib/components/table';

storiesOf('Components|Views', module).add('welcome', () => <Table rowsPage={200} totalRows={500} />);
