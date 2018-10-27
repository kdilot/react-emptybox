import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Product from 'files/Product';

export const OPTION_DEPTH = 'product/OPTION_DEPTH';
export const SELECTED_OPTION = 'product/SELECTED_OPTION';
export const CHANGE_SORT = 'product/CHANGE_SORT';
export const OPTION_REMOVE = 'product/OPTION_REMOVE';
export const PRODUCT_MODIFY = 'product/PRODUCT_MODIFY';
export const OPTION_ADD = 'product/OPTION_ADD';

export const optionDepth = createAction(OPTION_DEPTH);
export const selectedOption = createAction(SELECTED_OPTION);
export const changeSort = createAction(CHANGE_SORT);
export const optionRemove = createAction(OPTION_REMOVE);
export const productModify = createAction(PRODUCT_MODIFY);
export const optionAdd = createAction(OPTION_ADD);

const initialState = Map({
  list: fromJS(Product.list),
  optionStatus: Map({
    name: '',
    depth: List([Map({}), Map({})]),
    selected: List(['', '']),
    image: '',
  }),
  productStatus: Map({
    originPrice: 0,
    price: 0,
    image: '',
    quantity: 0
  }),
  sort: 'name',
  asc: true,
})

export default handleActions({
  [OPTION_DEPTH]: (state, action) => {
    const option = fromJS(action.payload)
    let result = state
    if (option.get('originPrice')) result = result.setIn(['productStatus', 'originPrice'], option.get('originPrice'))
    if (option.get('price')) result = result.setIn(['productStatus', 'price'], option.get('price'))
    if (option.get('image')) result = result.setIn(['productStatus', 'image'], option.get('image'))
    if (option.get('quantity')) result = result.setIn(['productStatus', 'quantity'], option.get('quantity'))
    if (option.get('name') && option.get('index') === 0) result = result.setIn(['optionStatus', 'name'], option.get('name'))

    result = result.setIn(['optionStatus', 'depth', option.get('index')], option.get('depth') ? option.get('depth') : {})
      .setIn(['optionStatus', 'depth', option.get('index') + 1], {})
      .setIn(['optionStatus', 'selected', option.get('index')], '')
      .setIn(['optionStatus', 'selected', option.get('index') + 1], '')

    return result
  },
  [SELECTED_OPTION]: (state, action) => {
    const selected = fromJS(action.payload)
    return (
      state.setIn(['optionStatus', 'selected', (selected.get('index') - 1)], selected.get('name'))

    )
  },
  [CHANGE_SORT]: (state, action) => {
    let result = state
    if (action.payload === result.get('sort')) {
      if (result.get('asc'))
        result = result.set('asc', false)
      else {
        result = result.set('asc', true)
      }
    }
    result = result.set('sort', action.payload)
    return result
  },
  [OPTION_REMOVE]: (state, action) => {
    const param = action.payload
    let result = state
    if (param.type === 0) {
      result = result.setIn(['list', 0, 'option', param.index, 'depth'], {})
    } else if (param.type === 1) {
      let data = result.getIn(['list', 0, 'option', param.index, 'depth', 'option']).filter((list, index) => index !== param.depth)
      result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option'], data)
    } else if (param.type === 2) {
      if (Array.isArray(param.depth)) {
        const array = param.depth
        if (array[1] >= 0) {
          let data = result.getIn(['list', 0, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option']).filter((list, index) => index !== array[1])
          result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option'], data)
        } else
          result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', array[0], 'depth'], {})
      }
    }
    return result
  },
  [PRODUCT_MODIFY]: (state, action) => {
    const param = action.payload
    let result = state
    if (param.type === 'product') {
      result = result.setIn(['list', 0, param.name], param.value)
    } else if (param.type === 'option') {
      if (param.depth === null) {
        result = result.setIn(['list', 0, 'option', param.index, param.name], param.value)
      } else if (param.depth === 'depth') {
        result = result.setIn(['list', 0, 'option', param.index, 'depth', param.name], param.value)
      } else if (Array.isArray(param.depth)) {
        const array = param.depth
        if (array[1] >= 0)
          result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option', array[1], param.name], param.value)
        else
          result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', array[0], 'depth', param.name], param.value)
      } else {
        result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', param.depth, param.name], param.value)
      }
    }
    return result
  },
  [OPTION_ADD]: (state, action) => {
    const addOption = Map({ name: 'add field', option: List() })
    const addDepth = Map({ name: 'add field', depth: Map() })
    const param = action.payload
    let result = state
    if (param.type === 'new') {
      const array = Map({
        name: 'new option',
        image: 'new.img',
        originPrice: 100,
        price: 100,
        depth: Map()
      })
      let data = result.getIn(['list', 0, 'option'])
      data = data.push(array)
      result = result.setIn(['list', 0, 'option'], data)
    } else if (param.type === null) {
      result = result.setIn(['list', 0, 'option', param.index, 'depth'], addOption)
    } else if (param.type === 0) {
      let data = result.getIn(['list', 0, 'option', param.index, 'depth', 'option'])
      data = data.push(addDepth)
      result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option'], data)
    } else if (param.type === 1) {
      result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', param.depth, 'depth'], addOption)
    } else if (param.type === 2) {
      let data = result.getIn(['list', 0, 'option', param.index, 'depth', 'option', param.depth, 'depth', 'option'])
      data = data.push(addOption)
      result = result.setIn(['list', 0, 'option', param.index, 'depth', 'option', param.depth, 'depth', 'option'], data)
    }
    return result
  }
}, initialState)