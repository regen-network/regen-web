import initStoryshots from '@storybook/addon-storyshots';
import path from 'path';
import './jest.mock';
import { configure, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

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
