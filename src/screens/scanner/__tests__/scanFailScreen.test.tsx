import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {FailScreen} from '../scanFailScreen';

describe('Scan fail Screen', () => {
  const render = ReactTestRenderer.create(<FailScreen />);

  it('Matches Snapshot', () => {
    expect(render.toJSON()).toMatchSnapshot();
  });
});
