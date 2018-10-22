import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

export const TEST = 'product/TEST';
export const TEST2 = 'product/TEST2';

export const test = createAction(TEST);
export const test2 = createAction(TEST2);

const initialState = Map({
  list: List([
    Map(
      {
        name: 'product example 1',
        originPrice: 600,
        price: 429,
        img: 'none',
        option: List([
          Map({
            name: 'black',
            size: List(['L', 'M', 'S'])
          }),
          Map({
            name: 'yellow',
            size: List(['XL', 'L', 'M', 'S'])
          }),
          Map({
            name: 'blue',
            size: List(['XL', 'M', 'S'])
          })
        ]),
        description: 'sdfsdfsdfsdf'
      }
    )
  ]),
  selectedOption: Map({
    option : List([]),
    size: ''
  })
})

export default handleActions({
  [TEST]: (state, action) => {
    return state.setIn(['selectedOption', 'option'], fromJS(action.payload)).setIn(['selectedOption', 'size'], '')
  },
  [TEST2]: (state, action) => {
    return state.setIn(['selectedOption', 'size'], fromJS(action.payload))
  },
}, initialState)