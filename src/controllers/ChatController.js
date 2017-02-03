import firebase                     from 'firebase';
import {Controller}                 from 'arva-js/core/Controller.js';
import {Injection}                  from 'arva-js/utils/Injection.js';
import {ChatView}                   from '../views/ChatView.js';
import {Messages}                   from '../models/Messages.js';

export class ChatController extends Controller {
    Index(){

        if(!this.chatView) {

            let messages = Injection.get(Messages, { orderBy: 'timestamp' });

            this.chatView = new ChatView({messages: messages});

            this.chatView.messageBar.on('submit', (content) => {

                if (!content.trim()) return;

                messages.add({
                    author: 'Noname',
                    content: content,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });

            });

        }

        return this.chatView;
    }

}