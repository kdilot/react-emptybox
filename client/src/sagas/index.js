import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import axios from 'axios';
import { CURRENCY_STATE_SUC, CURRENCY_STATE, CURRENCY_NAME_SUC, CURRENCY_NAME, CURRENCY_CHART_SUC, CURRENCY_CHART } from 'modules/vtc';

export function* currencyStateWatch() {
  yield takeLatest(CURRENCY_STATE, currencyState)
}
export function* currencyState() {
  const state = yield call([axios, axios.get], '/api/vtc/state')
  yield put({ type: CURRENCY_STATE_SUC, payload: state.data })
}

export function* currencyChartWatch() {
  yield takeLatest(CURRENCY_CHART, currencyChart)
}
export function* currencyChart(req) {
  const state = yield call([axios, axios.post], '/api/vtc/currencychart', { data: req.payload })
  yield put({ type: CURRENCY_CHART_SUC, payload: state.data })
}

export function* currencyNameWatch() {
  yield takeLatest(CURRENCY_NAME, currencyName)
}

export function* currencyName() {
  const state = yield call([axios, axios.get], '/api/vtc/currencyname')
  yield put({ type: CURRENCY_NAME_SUC, payload: state.data })
}

export function* rootSaga() {
  yield all([
    fork(currencyStateWatch),
    fork(currencyNameWatch),
    fork(currencyChartWatch),
  ])
}