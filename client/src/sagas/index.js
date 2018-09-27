import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
// import { delay } from 'redux-saga';
import axios from 'axios';
import { CURRENCY_STATE_SUC, CURRENCY_STATE } from 'modules/vtc';

export function* currencyStateWatch() {
  yield takeLatest(CURRENCY_STATE, currencyState)
}
export function* currencyState() {
  const state = yield call([axios, axios.get], '/api/vtc/state')
  yield put({ type: CURRENCY_STATE_SUC, payload: state.data })
}

export function* rootSaga() {
  yield all([
    fork(currencyStateWatch),
  ])
}