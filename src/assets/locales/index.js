// Import all locales

import { getUser } from "~/firebase/firestore/getData";
import en from './en.json';
import th from './th.json';



global.language = 'th';

// getUser(global.user.uid, (result) => {
// 	if(result.language){
// 		global.language = result.language;
// 	}
// });

//console.log(global.user);

export default { en, th };