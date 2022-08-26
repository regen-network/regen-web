import initStoryshots from '@storybook/addon-storyshots';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import path from 'path';

import './jest.mock';

configure({ adapter: new Adapter() });

initStoryshots({
  configPath: path.resolve(__dirname, '../../web-storybook/.storybook'),
  framework: 'react',
  test: ({ story, context }) => {
    const storyElement = story.render();
    const shallowTree = shallow(storyElement);

    expect(toJson(shallowTree)).toMatchSnapshot();
  },
});
