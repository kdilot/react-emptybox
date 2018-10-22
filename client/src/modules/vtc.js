import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

export const CURRENCY_STATE_SUC = 'vtc/CURRENCY_STATE_SUC';
export const CURRENCY_STATE = 'vtc/CURRENCY_STATE';
export const CURRENCY_CHART_SUC = 'vtc/CURRENCY_CHART_SUC';
export const CURRENCY_CHART = 'vtc/CURRENCY_CHART';
export const CURRENCY_NAME_SUC = 'vtc/CURRENCY_NAME_SUC';
export const CURRENCY_NAME = 'vtc/CURRENCY_NAME';
export const CURRENCY_TYPE = 'vtc/CURRENCY_TYPE';
export const UPDATE_TICKER = 'vtc/UPDATE_TICKER';

export const currencyState = createAction(CURRENCY_STATE);
export const currencyStateSuccess = createAction(CURRENCY_STATE_SUC);
export const currencyChart = createAction(CURRENCY_CHART);
export const currencyChartSuccess = createAction(CURRENCY_CHART_SUC);
export const currencyName = createAction(CURRENCY_NAME);
export const currencyNameSuccess = createAction(CURRENCY_NAME_SUC);
export const currencyType = createAction(CURRENCY_TYPE);
export const updateTicker = createAction(UPDATE_TICKER);

const initialState = Map({
  list: List(),
  chart: List(),
  currencyNameList: List(),
  wsUrl: 'ws://localhost:3001',
  // wsUrl: 'wss://emptybox.herokuapp.com',
  selectedCurrencyType: 'BTC'
})

export default handleActions({
  [CURRENCY_STATE_SUC]: (state, action) => {
    return state.setIn(['list'], fromJS(action.payload))
  },
  [CURRENCY_STATE]: (state, action) => {
  },
  [CURRENCY_CHART_SUC]: (state, action) => {
    if (action.payload.error)
      return state.setIn(['chart'], fromJS([]))
    else
      return state.setIn(['chart'], fromJS(action.payload))
  },
  [CURRENCY_CHART]: (state, action) => {
    return state.setIn(['chart'], fromJS([]))
  },
  [CURRENCY_NAME_SUC]: (state, action) => {
    return state.setIn(['currencyNameList'], fromJS(action.payload))
  },
  [CURRENCY_NAME]: (state, action) => {
  },
  [CURRENCY_TYPE]: (state, action) => {
    return state.get('selectedCurrencyType') ?
      state.set('selectedCurrencyType', action.payload)
      :
      state.set('selectedCurrencyType', 'BTC')
  },
  [UPDATE_TICKER]: (state, action) => {
    const data = JSON.parse(action.payload)
    let ticker = state
    data.map(list => {
      const index = state.getIn(['list']).findIndex(children => children.get('name') === list.name)
      if (index !== -1) {
        ticker = ticker.setIn(['list', index], fromJS(list))
      }
      return list
    })
    return ticker
  },
}, initialState)