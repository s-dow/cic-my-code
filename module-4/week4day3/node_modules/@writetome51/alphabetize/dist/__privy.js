import {toStr} from '@writetome51/to-str';


// Repeated tests show Array.sort((a, b) => a < b ? -1 : 1) is faster than quicksort algorithms for
// alphabetical sorting.


export function getCaseInsensitiveComparator(getValueToSortBy) {
	return getComparator(
		(a, b) => toStr(getValueToSortBy(a)).toLowerCase() < toStr(getValueToSortBy(b)).toLowerCase()
	);
}


export function getCaseSensitiveComparator(getValueToSortBy) {
	return getComparator(
		(a, b) => toStr(getValueToSortBy(a)) < toStr(getValueToSortBy(b))
	);
}


export function getComparator(getBoolExpression) {
	return (a, b) => (getBoolExpression(a, b) ? -1 : 1);
}
