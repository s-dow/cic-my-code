# toStr(arg): string

Returns `arg` as string (I know, durr).  
81% faster than <code>String(arg)</code>.  
62% faster than <code>\`${arg}\`</code>.  
(Tested at  https://jsbench.me/)


## Examples
```js
import {toStr} from '@writetome51/to-str';

toStr(1);
// --> '1'

toStr(0.001);
// --> '0.001'

toStr(-0.001);
// --> '-0.001'

toStr(-0);
// --> '0'

toStr(false);
// --> 'false'

toStr([]);
// --> ''

toStr([1, 2, 3, [4]]);
// --> '1,2,3,4'

toStr();
// --> 'undefined'

typeof toStr();
// --> 'string'
```

## Installation
`npm i  @writetome51/to-str`

## Loading
```js
import {toStr} from '@writetome51/to-str';
```
