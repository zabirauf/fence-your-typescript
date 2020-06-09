import isOdd from 'is-odd';
import { fullName } from 'hello';

function app() {
    console.log(fullName('Zohaib', 'Rauf'));
    console.log(isOdd(23) ? 'Odd' : 'Even');
}

app();