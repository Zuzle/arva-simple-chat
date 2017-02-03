import InputSurface          from 'famous/surfaces/SubmitInputSurface.js';
import {View}                from 'arva-js/core/View.js';
import {SingleLineTextInput} from 'arva-js/components/inputs/SingleLineTextInput.js';
import {layout}              from 'arva-js/layout/Decorators.js';
import {combineOptions}      from 'arva-js/utils/CombineOptions.js'

export class MessageBarView extends View {

    constructor(options = {}) {
        super(options);

        /** Listen input's and button's events to trigger submit */
        this.textInput.on('message', (content) => content ? this._eventOutput.emit('submit', content) : null);
        this.button.on('click', () => this.textInput.getValue() ? this._eventOutput.emit('submit', this.textInput.getValue()) : null);
        this.on('submit', () => this.textInput.setValue(''));
    }

    /**
     * Text Input
     */
    @layout.dock.fill(1)
    @layout.size(undefined, 50)
    textInput = new SingleLineTextInput({
        placeholder: 'Enter message'
    });

    /**
     * Submit Button
     */
    @layout.dock.right(undefined, 1)
    @layout.size(70, undefined)
    button = new InputSurface({
        value: 'Send',
        properties: {
            border: 'none',
            lineHeight: '50px',
            background: 'grey',
            color: 'white'
        }
    });

}