import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';


//create test file
//lead imports
//render ExpenseListItem with fixture data
//create the snapshot

test('Should have a populated expense item', () => {
    
    const wrapper = shallow(<ExpenseListItem {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
})
//{ id, description, amount, createdAt }
//ExpenseListItem = ({ id, description, amount, createdAt })