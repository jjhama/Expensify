import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test("Should render an expense form", () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot();   
})

test('should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]}/>)
    expect(wrapper).toMatchSnapshot();
}) 

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
}) 

test('should set description on the form editor', () => {
    const wrapper = shallow(<ExpenseForm />)
    const description = 'TESTING'
    const value = 'blah blah'
    wrapper.find('input').at(0).simulate('change', {
        target: { value:description }
    })

    expect(wrapper.state('description')).toBe(description);

    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('description')).toBe(value);


})

//should set the note on the textarea
test('should set the note on the textarea', () => {
    const wrapper = shallow(<ExpenseForm />)
    
    const value = 'testing Note change'
    wrapper.find('textarea').at(0).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('note')).toBe(value);


})

test('testing amount changes', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '23.50'

    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('amount')).toBe(value);
})

test('testing amount changes', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '12.122'

    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })

    expect(wrapper.state('amount')).toBe('');
})

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    // const name = 'Jason'
    // const city = 'Seattle'
    // onSubmitSpy(name, city);
    // expect(onSubmitSpy).toHaveBeenCalledWith(name, 'Texas');

    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        note: expenses[0].note,
    });
})


test('should test the date select picker ', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)    
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);

})

test('Should set calendar focus to onchange', () => {
    const focused = true
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)    
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);

})