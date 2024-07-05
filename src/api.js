import { cryptoAssets, cryptoData } from './data'

export function fakefetchCrypto() {
	return new Promise(resolve => {
		setTimeout(() => resolve(cryptoData), 1070)
	})
}

export function fetchAssets() {
	return new Promise((resolve) => {
		setTimeout(() => resolve(cryptoAssets), 1800)
	})
}