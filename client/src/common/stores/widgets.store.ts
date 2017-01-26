/**
 * Created by schneij on 1/24/2017.
 */

export const widgets = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'ADD_WIDGETS':
      return payload;
    case 'CREATE_WIDGET':
      return [...state, payload];
    case 'UPDATE_WIDGET':
      return state.map(widget => {
        return widget.id === payload.id ? Object.assign({}, widget, payload) : widget;
      });
    case 'DELETE_WIDGET':
      return state.filter(widget => {
        return widget.id !== payload.id;
      });
    default:
      return state;
  }
};
