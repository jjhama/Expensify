import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import { filters, altFilters} from '../fixtures/filters'
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn(); 
    setEndDate = jest.fn();
    
    wrapper = shallow(
        <ExpenseListFilters 
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate }
        />
    )
})

test('Should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
})

test('Should render alt filters', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
})

test('should handle text changes', () => {
    const test ='testing'
    wrapper.find('input').simulate('change', {
        target: {value:test}
    })
    expect(setTextFilter).toHaveBeenLastCalledWith(test);
})

test('should handle sort by date', () => {
    //simulate select change
    const option = "date"
    wrapper.setProps({
        filters: altFilters
    })
    wrapper.find('select').simulate('change', {
        target: {value: option}
    })
    expect(sortByDate).toHaveBeenCalled();
})

test('should handle sort by amount', () => {
    //simulate select change
    const option = "amount"
    wrapper.find('select').simulate('change', {
        target: {value: option}
    })
    expect(sortByAmount).toHaveBeenCalled();
})

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate})
    expect(setEndDate).toHaveBeenCalledWith(endDate);
})

test('should handle date focus changes', () => {
    //can be startDate, endDate, or null
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused)
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})
