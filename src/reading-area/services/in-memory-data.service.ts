/**
 * Created by carlos on 4/18/17.
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';



export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        let onScreenSentences = [
            {id: 1, text: 'Hi my name is Chad'}
        ];
        return {onScreenSentences};
    }

}