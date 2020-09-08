import React from 'react';
import ReactDOM from 'react-dom';
import Resume from '../index';
import data from '../../../data/resume.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Resume data={data} code={{ fileName: '', html: '' }} open={false} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
