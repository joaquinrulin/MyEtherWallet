import { State } from 'reducers/transaction/meta/typings';
import { getDecimal } from 'libs/units';
import { TypeKeys as TK, MetaAction } from 'actions/transaction';
import { ReducersMapObject, Reducer } from 'redux';
import { createReducerFromObj } from 'reducers/transaction/helpers';

const INITIAL_STATE: State = {
  unit: 'ether',
  decimal: getDecimal('ether'),
  tokenValue: { raw: '', value: null }
};

//TODO: generic-ize updateField to reuse
const updateField = (key: keyof State): Reducer<State> => (
  state: State,
  action: MetaAction
) => {
  if (typeof action.payload === 'object') {
    // we do this to update just 'raw' or 'value' param of tokenValue
    return {
      ...state,
      [key]: { ...(state[key] as object), ...action.payload }
    };
  } else {
    return {
      ...state,
      [key]: action.payload
    };
  }
};

const reducerObj: ReducersMapObject = {
  [TK.UNIT_META_SET]: updateField('unit'),
  [TK.DECIMAL_META_SET]: updateField('decimal'),
  [TK.TOKEN_VALUE_META_SET]: updateField('tokenValue'),
  [TK.RESET]: _ => INITIAL_STATE
};

export const meta = createReducerFromObj(reducerObj, INITIAL_STATE);