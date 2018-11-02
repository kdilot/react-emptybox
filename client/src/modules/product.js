import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Product from 'files/Product';

export const CREATE_PRODUCT = 'product/CREATE_PRODUCT';
export const MODIFY_PRODUCT = 'product/MODIFY_PRODUCT';
export const REMOVE_PRODUCT = 'product/REMOVE_PRODUCT';
export const OPTION_DEPTH = 'product/OPTION_DEPTH';
export const SELECTED_OPTION = 'product/SELECTED_OPTION';
export const ADD_OPTION = 'product/ADD_OPTION';
export const REMOVE_OPTION = 'product/REMOVE_OPTION';
export const RESET_SELECTED_OPTION = 'product/RESET_SELECTED_OPTION';
export const CHANGE_SORT = 'product/CHANGE_SORT';

export const createProduct = createAction(CREATE_PRODUCT);
export const modifyProduct = createAction(MODIFY_PRODUCT);
export const removeProduct = createAction(REMOVE_PRODUCT);
export const optionDepth = createAction(OPTION_DEPTH);
export const addOption = createAction(ADD_OPTION);
export const removeOption = createAction(REMOVE_OPTION);
export const resetSelectedOption = createAction(RESET_SELECTED_OPTION);
export const selectedOption = createAction(SELECTED_OPTION);
export const changeSort = createAction(CHANGE_SORT);

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
  }),
  sort: 'name',
  asc: true,
  color: List(['red', 'black', 'blue', 'yellow', 'purple', 'green', 'aqua', 'antiquewhite', 'darkcyan', 'royalblue', 'orange', 'maroon', 'tan', 'lightsteelblue']),
  productNumber: 2
})

export default handleActions({
  [CREATE_PRODUCT]: (state, action) => {
    let result = state
    let number = result.get('productNumber')
    let data = result.getIn(['list'])
    let product = fromJS(Product.add)
    product = product.set('image', Math.floor(Math.random() * 14)).set('name', product.get('name') + ' ' + (data.toJS().length + 1))
      .set('no', ++number)
      .setIn(['option', 0, 'image'], Math.floor(Math.random() * 14))
      .setIn(['option', 0, 'depth', 'option', 0, 'image'], Math.floor(Math.random() * 14))
    data = data.push(product)
    // console.log(data.toJS())
    result = result.setIn(['list'], data).set('productNumber', number)
    return result
  },
  [REMOVE_PRODUCT]: (state, action) => {
    let result = state
    let list = result.getIn(['list']).filter((children) => children.get('no') !== parseInt(action.payload.index, 10))
    result = result.setIn(['list'], list)
    return result
  },
  [OPTION_DEPTH]: (state, action) => {
    const option = fromJS(action.payload)
    let result = state
    if (option.get('originPrice')) result = result.setIn(['productStatus', 'originPrice'], option.get('originPrice'))
    if (option.get('price')) result = result.setIn(['productStatus', 'price'], option.get('price'))
    if (option.get('image')) result = result.setIn(['productStatus', 'image'], option.get('image'))
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
  [ADD_OPTION]: (state, action) => {
    const addOption = Map({ name: 'add field', option: List() })
    const addDepth = Map({ name: 'add field', depth: Map() })
    const param = action.payload
    const index = state.getIn(['list']).findIndex(children => children.get('no') === param.product)
    let result = state
    if (param.type === 'new') {
      const array = Map({
        name: 'new option',
        image: 'new.img',
        originPrice: 100,
        price: 100,
        depth: Map()
      })
      let data = result.getIn(['list', index, 'option'])
      data = data.push(array)
      result = result.setIn(['list', index, 'option'], data)
    } else if (param.type === null) {
      result = result.setIn(['list', index, 'option', param.index, 'depth'], addOption)
    } else if (param.type === 0) {
      let data = result.getIn(['list', index, 'option', param.index, 'depth', 'option'])
      data = data.push(addDepth)
      result = result.setIn(['list', index, 'option', param.index, 'depth', 'option'], data)
    } else if (param.type === 1) {
      result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', param.depth, 'depth'], addOption)
    } else if (param.type === 2) {
      let data = result.getIn(['list', index, 'option', param.index, 'depth', 'option', param.depth, 'depth', 'option'])
      data = data.push(addOption)
      result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', param.depth, 'depth', 'option'], data)
    }
    return result
  },
  [REMOVE_OPTION]: (state, action) => {
    const param = action.payload
    const index = state.getIn(['list']).findIndex(children => children.get('no') === parseInt(param.product, 10))
    let result = state
    if (param.type === 'top') {
      let data = result.getIn(['list', index, 'option']).filter((list, index) => index !== param.index)
      result = result.setIn(['list', index, 'option'], data)
    } else if (param.type === 0) {
      result = result.setIn(['list', index, 'option', param.index, 'depth'], {})
    } else if (param.type === 1) {
      let data = result.getIn(['list', index, 'option', param.index, 'depth', 'option']).filter((list, index) => index !== param.depth)
      result = result.setIn(['list', index, 'option', param.index, 'depth', 'option'], data)
    } else if (param.type === 2) {
      if (Array.isArray(param.depth)) {
        const array = param.depth
        if (array[1] >= 0) {
          let data = result.getIn(['list', index, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option']).filter((list, index) => index !== array[1])
          result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option'], data)
        } else
          result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', array[0], 'depth'], {})
      }
    }
    return result
  },
  [MODIFY_PRODUCT]: (state, action) => {
    const param = action.payload
    const index = state.getIn(['list']).findIndex(children => children.get('no') === parseInt(param.product, 10))
    let result = state
    if (param.type === 'product') {
      result = result.setIn(['list', index, param.name], param.value)
    } else if (param.type === 'option') {
      if (param.depth === null) {
        result = result.setIn(['list', index, 'option', param.index, param.name], param.value)
      } else if (param.depth === 'depth') {
        result = result.setIn(['list', index, 'option', param.index, 'depth', param.name], param.value)
      } else if (Array.isArray(param.depth)) {
        const array = param.depth
        if (array[1] >= 0)
          result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', array[0], 'depth', 'option', array[1], param.name], param.value)
        else
          result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', array[0], 'depth', param.name], param.value)
      } else {
        result = result.setIn(['list', index, 'option', param.index, 'depth', 'option', param.depth, param.name], param.value)
      }
    }
    return result
  },
  [RESET_SELECTED_OPTION]: (state, action) => {
    return state.setIn(['optionStatus', 'selected'], List())
      .setIn(['optionStatus', 'depth'], List([Map({}), Map({})]))
      .setIn(['optionStatus', 'name'], '')
      .setIn(['productStatus', 'price'], '')
      .setIn(['productStatus', 'originPrice'], '')
      .setIn(['productStatus', 'image'], '')
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
}, initialState)