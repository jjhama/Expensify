import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses ={expenses}/>);
    expect(wrapper).toMatchSnapshot();
    //expect(1).toBe(1);
});

test('Should pass in an empty expense list', () => {
    const wrapper = shallow(<ExpenseList expenses = {[]}/>);
    expect(wrapper).toMatchSnapshot();
});

//create test file
//lead imports
//render ExpenseListItem with fixture data
//create the snapshot