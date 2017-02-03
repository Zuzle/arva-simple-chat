import {PrioritisedArray}   from 'arva-js/data/PrioritisedArray.js';
import {Message}               from './Message.js';

export class Messages extends PrioritisedArray {
    constructor() {
        super(Message);
    }
}