import '@hotwired/turbo';
import 'bundle:tailwind.css';
import 'highlight.js/styles/atom-one-dark.css';
import './base.css';
import './components/x-class-toggle.js';
import './components/x-instant-submitter.js';
import './components/x-modal-closer.js';
import './components/x-shortcut-clicker.js';
import './components/x-table-of-contents-highlighter.js';
import './components/x-theme-button.js';
import initLiveReload from './utilities/liveReload.js';

if (process.env.NODE_ENV === 'development') {
  initLiveReload();
}
