/**
 * Created by carlos on 4/18/17.
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';



export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        let onScreenSentences = [
            {id: 1, text: 'My cat sits on the mat', highestScore: 0},
            {id: 2, text: 'Marcus Garvey is my favorite national hero', highestScore: 0},
            {id: 3, text: 'Walter Rodney wrote about very important topics', highestScore: 0},
            {id: 4, text: 'Bob Marley was born in st Ann but grew up in trenchtown', highestScore: 0},
            {id: 5, text: 'I went to the football match yesterday', highestScore: 0},
            {id: 6, text: 'Thank you for being my friend', highestScore: 0},
            {id: 7, text: 'The humming bird is the national bird of Jamaica', highestScore: 0},
            {id: 8, text: 'I went to the park today and it was very exciting', highestScore: 0},
            {id: 9, text: 'Emperor Selassie was a great man', highestScore: 0},
        ];

        let phoneMapping = [
            {id: 'my', phones: ['M_B', 'AY_E']},
            {id: 'cat', phones: ['K_B', 'AE_I', 'T_E']},
            {id: 'sits', phones: ['S_B', 'IH_I', 'T_I', 'S_E']},
            {id: 'on', phones: ['AA_B', 'N_E']},
            {id: 'the', phones: ['DH_B', 'AH_E']},
            {id: 'mat', phones: ['M_B', 'AE_I', 'T_E']},
            {id: 'emperor', phones: ['EH_B', 'M_I', 'P_I', 'ER_I', 'ER_E']},
            {id: 'selassie', phones: ['S_B', 'AH_I', 'L_I', 'AE_I', 'S_I', 'IY_E']}
        ];
        return {phoneMapping,onScreenSentences}
    }

}