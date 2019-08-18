import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const {JSDOM} = require('jsdom');
const Node = require('jsdom/lib/jsdom/living/node-document-position');

// We can use jsdom-global at some point if maintaining these lists is a burden.
const whitelist = ['HTMLElement', 'Performance'];
const blacklist = ['sessionStorage', 'localStorage'];

function createDOM() {
  // Function taken from github issue
  // https://github.com/jsdom/jsdom/issues/2304#issuecomment-408667295
  //
  // Working around conflict between jest and jsdom
  // jsdom is required to allow mounting components
  // Shallow rendering components doesn't allow searching for elements
  // in all cases, especially not through native react-native components
  const dom = new JSDOM('', {pretendToBeVisual: true});
  global.window = dom.window;
  global.Node = Node;
  global.document = dom.window.document;
  global.HTMLButtonElement = dom.window.HTMLButtonElement;

  // Not yet supported: https://github.com/jsdom/jsdom/issues/317
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
  global.navigator = {
    userAgent: 'node.js',
  };

  Object.keys(dom.window)
    .filter(key => !blacklist.includes(key))
    .concat(whitelist)
    .forEach(key => {
      if (typeof global[key] === 'undefined') {
        global[key] = dom.window[key];
      }
    });
}

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
createDOM();
Enzyme.configure({adapter: new Adapter()});

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = message => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};
