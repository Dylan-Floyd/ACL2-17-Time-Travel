import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('travels through time like a doctor', () => {
  render(<App />);
  const dateInput = screen.getByLabelText('Date:')
  const undoButton = screen.getByText('Undo')
  const redoButton = screen.getByText('Redo')

  //select a date (e.g. 2022-01-01), see the date change (to 2022-01-01)
  fireEvent.change(dateInput, {target: {value: '2022-01-01'}})
  expect(dateInput.value).toEqual('2022-01-01')

  //select another date (e.g. 2022-02-22), see the date change to the new date (to 2022-02-22)
  fireEvent.change(dateInput, {target: {value: '2022-02-22'}})
  expect(dateInput.value).toEqual('2022-02-22')

  //select another date (e.g. 2022-03-14), see the date change to the new date (to 2022-03-14)
  fireEvent.change(dateInput, {target: {value: '2022-03-14'}})
  expect(dateInput.value).toEqual('2022-03-14')

  //press undo, see the date change to the second date (to 2022-02-22)
  fireEvent.click(undoButton)
  expect(dateInput.value).toEqual('2022-02-22')

  //press undo, see the date change to the first date (to 2022-01-01)
  fireEvent.click(undoButton)
  expect(dateInput.value).toEqual('2022-01-01')

  //press redo, see the date change to the second date (to 2022-02-22)
  fireEvent.click(redoButton)
  expect(dateInput.value).toEqual('2022-02-22')

  //select another date (e.g. 2022-04-04), see the date change to the new date (to 2022-04-04)
  fireEvent.change(dateInput, {target: {value: '2022-04-04'}})
  expect(dateInput.value).toEqual('2022-04-04')

  //press undo, see the date change to the second date (to 2022-02-22)
  fireEvent.click(undoButton)
  expect(dateInput.value).toEqual('2022-02-22')

  //press undo, see the date change to the first date (to 2022-01-01)
  fireEvent.click(undoButton)
  expect(dateInput.value).toEqual('2022-01-01')

  //press redo, see the date change to the second date (to 2022-02-22)
  fireEvent.click(redoButton)
  expect(dateInput.value).toEqual('2022-02-22')

  //press redo, see the date change to the fourth date (to 2022-04-04)
  fireEvent.click(redoButton)
  expect(dateInput.value).toEqual('2022-04-04')

  //press redo, see the date change to the third date (to 2022-03-14)
  fireEvent.click(redoButton)
  expect(dateInput.value).toEqual('2022-03-14')
});
