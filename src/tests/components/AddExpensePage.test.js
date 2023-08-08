import React from 'react';
import { shallow } from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';
import moment from 'moment';

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();
    history = {push: jest.fn()}
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>)
})
test("Should render an add expense page", () => {
    expect(wrapper).toMatchSnapshot();   
})


test("Should handle onsubmit", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
})

