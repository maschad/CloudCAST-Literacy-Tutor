/**
 * Created by carlos on 4/18/17.
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';



export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        let onScreenSentences = [
            {id: 1, text: 'Hi my name is Chad'},
            {id: 2, text: 'I went to the park today, and it was very exciting'},
            {id: 3, text: 'My favorite color is blue'},
            {id: 4, text: 'Bob Marley was born in Saint Ann but grew up in Trench Town'},
            {id: 5, text: 'I went to the football match yesterday'},
            {id: 6, text: 'Thank you for being my friend'},
            {id: 7, text: 'The humming bird is the national bird of Jamaica'},
            {id: 8, text: 'Marcus Garvey is my favorite national hero'}
        ];
        return {onScreenSentences};
    }

}