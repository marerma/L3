import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHintsList.tpl.html';
import { SearchHintItem, SearchHint } from '../searchHint/searchHint';

export class SearchHintsList {
  view: View;
  searchHints: SearchHint[]

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
    this.searchHints = [];
  }

  update(hints: SearchHint[]) {
    this.searchHints = hints;
    this.render();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  render() {
    this.view.root.innerHTML = '';
    this.searchHints.forEach((hint, ind) => {
      const hintComp = new SearchHintItem(hint);
      hintComp.render();

      if (ind === 0) {
        const sepEl = hintComp.createSeparator('Например,');
        this.view.root.appendChild(sepEl);
      } else if (ind === this.searchHints.length - 1) {
        const sepEl = hintComp.createSeparator('или');
        this.view.root.appendChild(sepEl);
      } else {
        const sepEl = hintComp.createSeparator(',');
        this.view.root.appendChild(sepEl);
      }
      hintComp.attach(this.view.root);
    });
  }
}