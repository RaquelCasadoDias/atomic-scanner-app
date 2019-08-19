import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {HomeScreen} from '../homeScreen';

describe('Home Screen', () => {
  const render = ReactTestRenderer.create(<HomeScreen />);

  it('Matches Snapshot', () => {
    expect(render.toJSON()).toMatchSnapshot();
  });
});
