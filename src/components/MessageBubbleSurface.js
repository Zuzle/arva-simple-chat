import Surface                  from 'famous/core/Surface.js';
import {combineOptions}         from 'arva-js/utils/CombineOptions.js'
import {Message}                from '../models/Message.js'
import messageBubbleTemplate    from '../templates/messageBubble.hbs!'

export class MessageBubbleSurface extends Surface {

    constructor(options = {}) {

        if (!options.message instanceof Message) {
            throw new TypeError('Message not specified');
        }

        let mergedOptions = combineOptions({
            content: messageBubbleTemplate({
                author: options.message.author,
                content: options.message.content,
                time: options.message.getDate().fromNow()
            }),
            size: [undefined, true],
            classes: ['message-bubble']
        }, options);

        super(mergedOptions);

        this.options = mergedOptions;

    }

}