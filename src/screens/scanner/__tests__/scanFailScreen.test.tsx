import {FailScreen} from "../scanFailScreen";
import ReactTestRenderer from 'react-test-renderer';
import React from 'react';

describe('Scan fail Screen', () => {
    const render = ReactTestRenderer.create(<FailScreen/>);

    it('Matches Snapshot', () => {
        expect(render.toJSON()).toMatchSnapshot();
    });
});