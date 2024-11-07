import '@hotwired/turbo';
import 'bundle:tailwind.css';
import 'highlight.js/styles/atom-one-dark.css';
import './base.css';
import './components/x-class-toggle';
import './components/x-table-of-contents-highlighter';
import './components/x-theme-button';
import initLiveReload from './utilities/liveReload';

if (process.env.NODE_ENV === 'development') {
  initLiveReload();
}
