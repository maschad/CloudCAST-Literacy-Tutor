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
            {id: 4, text: 'I went to the football match yesterday', highestScore: 0},
            {id: 5, text: 'The humming bird is the national bird of Jamaica', highestScore: 0},
            {id: 6, text: 'I went to the park today and it was very exciting', highestScore: 0},
            {id: 7, text: 'Emperor Selassie was a great man', highestScore: 0},
        ];
        //#TODO: Finish words
        let phoneMapping = [
            {id: 'my', phones: ['M_B', 'AY_E']},
            {id: 'cat', phones: ['K_B', 'AE_I', 'T_E']},
            {id: 'sits', phones: ['S_B', 'IH_I', 'T_I', 'S_E']},
            {id: 'on', phones: ['AA_B', 'N_E']},
            {id: 'the', phones: ['DH_B', 'AH_E']},
            {id: 'mat', phones: ['M_B', 'AE_I', 'T_E']},
            {id: 'emperor', phones: ['EH_B', 'M_I', 'P_I', 'ER_I', 'ER_E']},
            {id: 'selassie', phones: ['S_B', 'AH_I', 'L_I', 'AE_I', 'S_I', 'IY_E']},
            {id: 'marcus', phones: ['M_B', 'AA_I', 'R_I', 'K_I', 'AH_I', 'S_E']},
            {id: 'garvey', phones: ['G_B', 'AA_I', 'R_I', 'V_I', 'IY_E']},
            {id: 'is', phones: ['IH_B', 'Z_E']},
            {id: 'favorite', phones: ['F_B', 'EY_I', 'V_I', 'ER_I','IH_I', 'T_E']},
            {id: 'national', phones: ['N_B', 'AE_I', 'SH_I', 'N_I', 'AH_I', 'L_E']},
            {id: 'hero', phones: ['HH_B', 'IY_I', 'R_I', 'OW_E']},
            {id: 'walter', phones: ['W_B', 'AO_I', 'L_I', 'T_I', 'ER_E']},
            {id: 'rodney', phones: ['R_B', 'AA_I', 'D_I', 'N_I', 'IY_E']},
            {id: 'wrote', phones: ['R_B', 'OW_I', 'T_E']},
            {id: 'about', phones: ['']}
        ];
        return {phoneMapping,onScreenSentences}
    }

}