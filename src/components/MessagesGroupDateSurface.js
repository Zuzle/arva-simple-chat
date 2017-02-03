import Surface          from 'famous/core/Surface.js';
import {combineOptions} from 'arva-js/utils/CombineOptions.js'
import moment           from 'moment/moment.js'

export class MessagesGroupDateSurface extends Surface {

    constructor(options = {}) {

        let mergedOptions = combineOptions({
            size: [undefined, true],
            content: options.date ? moment(options.date).format('LL') : null,
            properties: {
                padding: '10px',
                textAlign: 'center',
                color: 'grey',
                fontSize: '11pt'
            }
        }, options);

        super(mergedOptions);

        this.options = mergedOptions;

    }

}