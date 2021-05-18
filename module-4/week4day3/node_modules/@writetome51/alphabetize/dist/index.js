import {getCaseInsensitiveComparator, getCaseSensitiveComparator} from './__privy.js';


// Uppercase letters are ordered before their lowercase versions, i.e., ['A','a','AA','aa']

export function alphabetize(arr, getValueToSortBy = (element) => element) {
	// First sort so all uppercase letters appear before any lowercase:
	arr.sort(getCaseSensitiveComparator(getValueToSortBy));

	alphabetizeInsensitive(arr, getValueToSortBy);
}


export function alphabetizeInsensitive(arr, getValueToSortBy = (element) => element) {
	arr.sort(getCaseInsensitiveComparator(getValueToSortBy));
}
