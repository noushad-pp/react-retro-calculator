// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import {
    chalkError,
    chalkSuccess,
    chalkProcessing
} from './chalkConfig';
import { publish } from 'gh-pages';

console.log(chalkProcessing('\nDeploying to connected github pages. Please validate the homepage value in package.json for correct deployment!!!\n'));

publish('dist', function (err) {
    if (err) {
        console.log(chalkError(err));
        return 1;
    } else {
        console.log(chalkSuccess('Your app is deployed successfully in gh-pages from /dist. It\'s ready to roll!'));
        return 0;
    }
});
