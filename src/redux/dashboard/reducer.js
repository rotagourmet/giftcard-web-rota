
import {
    STORAGE_TRANSACTIONS,
    STORAGE_VOUCHERS,
    STORAGE_USERS,
    STORAGE_RESTAURANTS
} from '../actions';

const initialState = {
	transactions: [],
	vouchers: [],
  users: null,
  restaurants: null,
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case STORAGE_TRANSACTIONS:
		  return { 
        ...state, 
        transactions: action.transactions
      };
    case STORAGE_VOUCHERS:
      return { 
        ...state, 
        vouchers: action.vouchers
      };
    case STORAGE_USERS:
      return { 
        ...state, 
        users: action.users
      };
    case STORAGE_RESTAURANTS:
      return { 
        ...state, 
        restaurants: action.restaurants
      };
    default:
      return state;
  }
};