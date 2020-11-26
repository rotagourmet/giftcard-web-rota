import {
    STORAGE_TRANSACTIONS,
    STORAGE_VOUCHERS,
    STORAGE_USERS,
    STORAGE_RESTAURANTS
} from '../actions';

export const storageTransactions = value => ({
  type: STORAGE_TRANSACTIONS,
  transactions: value
});

export const storageVouchers = value => ({
  type: STORAGE_VOUCHERS,
  vouchers: value
});

export const storageUsers = value => ({
  type: STORAGE_USERS,
  users: value
});

export const storageRestaurantes = value => ({
  type: STORAGE_RESTAURANTS,
  restaurants: value
});

