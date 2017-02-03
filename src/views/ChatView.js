import Surface                      from 'famous/core/Surface.js';
import {View}                       from 'arva-js/core/View.js';
import {DataBoundScrollView}        from 'arva-js/components/DataBoundScrollView.js'
import {layout}                     from 'arva-js/layout/Decorators.js';
import {Messages}                   from '../models/Messages.js'
import {MessagesGroupDateSurface}   from '../components/MessagesGroupDateSurface.js'
import {MessageBubbleSurface}       from '../components/MessageBubbleSurface.js'
import {MessageBarView}             from './MessageBarView.js'

export class ChatView extends View {

    constructor(options = {}) {

        if (!options.messages instanceof Messages) {
            throw new TypeError('Messages must be specified');
        }

        super(options);

        /** always scroll to the last message */
        this.messages.on('resize', () => this.messages.goToLastPage());

    }

    /**
     * Messages list
     */
    @layout.fullSize()
    messages = new DataBoundScrollView({
        layoutOptions: {
            margins: [50, 0],
            spacing: 0
        },
        autoPipeEvents: true,
        flow: true,
        alignment: 1,
        mouseMove: true,
        debug: true,
        groupBy: (message) => message.getDateDay(),
        groupTemplate: (dateTimestamp) => new MessagesGroupDateSurface({date: dateTimestamp}),
        itemTemplate: (message) => new MessageBubbleSurface({message}),
        dataStore: this.options.messages,
        chatScrolling: true
    });

    /**
     * Top Bar
     */
    @layout.dock.top(50)
    @layout.size(undefined, 50)
    topBar = new Surface({
        content: 'Arva Simple Chat',
        properties: {
            textAlign: 'center',
            background: 'grey',
            color: 'white',
            lineHeight: '50px'
        }
    });

    /**
     * Message Bar
     */
    @layout.dock.bottom(50)
    messageBar = new MessageBarView();

}
