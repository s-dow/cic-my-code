# alphabetize(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr: any[],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getValueToSortBy? = (element) => element<br>): void

Orders uppercase letters before their lowercase versions, i.e., `['A','a','AA','aa']`

# alphabetizeInsensitive(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr: any[],<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getValueToSortBy? = (element) => element<br>): void

Orders without giving uppercase letters priority.


Both functions re-order `arr` in ascending alphabetical order.  
They sort using Array.prototype.sort() with this comparison function:  
`(a, b) => String(getValueToSortBy(a)) < String(getValueToSortBy(b)) ? -1 : 1`  
Optional callback `getValueToSortBy(element)` must return anything that  
can be alphabetically compared with other values. By default it simply  
returns the passed `element`. 


## Examples
```js
let arr = ['z', 'Z', 'zz', 'ZZ', 'a', 'A', 'aa', 'AA', 'c', 'C', '013',
	'000', 0, '012', 1, 10, 11, '011', '001'];

alphabetize(arr);
console.log(arr);
/*****************
 [ 0, '000', '001', '011', '012', '013', 1, 10, 11,
  'A', 'a', 'AA', 'aa', 'C', 'c', 'Z', 'z', 'ZZ', 'zz']
*****************/

 arr = ['z', 'Z', 'zz', 'ZZ', 'a', 'A', 'aa', 'AA', 'c', 'C', '013',
	'000', 0, '012', 1, 10, 11, '011', '001'];
alphabetizeInsensitive(arr);
console.log(arr);
/****************
 [ 0, '000', '001', '011', '012', '013', 1, 10, 11,
 'a', 'A', 'aa', 'AA', 'c', 'C', 'z', 'Z', 'zz', 'ZZ']
*****************/

let objects = [{name: 'frank'}, {name: 'harry'}, {name: 'sheena'},
	           {name: 'brett'}, {name: 'sam'}];
alphabetize(objects, (obj) => obj.name);
console.log(objects);
/************
 [
    { name: 'brett' },
    { name: 'frank' },
    { name: 'harry' },
    { name: 'sam' },
    { name: 'sheena' }
]
************/
```

## Installation
`npm i  @writetome51/alphabetize`

## Loading
```js
import {alphabetize, alphabetizeInsensitive} from '@writetome51/alphabetize';
```
