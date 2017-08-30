/**
 * Created by carlos on 4/18/17.
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';



export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        let onScreenSentences = [
            {id: 1, text: 'Emperor Selassie was a great man', highestScore: 0},
            {id: 2, text: 'Marcus Garvey is my favorite national hero', highestScore: 0},
            {id: 3, text: 'Walter Rodney wrote about very important topics', highestScore: 0},
            {id: 4, text: 'Bob Marley was born in st Ann but grew up in trenchtown', highestScore: 0},
            {id: 5, text: 'I went to the football match yesterday', highestScore: 0},
            {id: 6, text: 'Thank you for being my friend', highestScore: 0},
            {id: 7, text: 'The humming bird is the national bird of Jamaica', highestScore: 0},
            {id: 8, text: 'I went to the park today and it was very exciting', highestScore: 0},
        ];
        return {onScreenSentences};
    }

}