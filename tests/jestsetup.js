// eslint-disable-next-line
import raf from './tempPolyfills'; // https://github.com/facebookincubator/create-react-app/issues/3199
// eslint-disable-next-line
import Enzyme, { shallow, render, mount } from 'enzyme';
// eslint-disable-next-line
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

// Fail tests on any warning
console.error = (message) => {
  throw new Error(message);
};
