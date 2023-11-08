import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHint.tpl.html';


export type SearchHint = {
  title: string;
  href: string;
};

export class SearchHintItem {
  view: View;
  searchHint: SearchHint;

  constructor(hint: SearchHint) {
    this.view = new ViewTemplate(html).cloneView();
    this.searchHint = hint;
  }


  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { title, href } = this.searchHint;
    this.view.searchHintTitle.textContent = title;
    this.view.root.setAttribute('href', href);
  }

  createSeparator(textContent: string) {
    const separatorEl = document.createElement('span');
    separatorEl.classList.add('searchHint__separator');
    separatorEl.textContent = textContent;
    return separatorEl;
  }
}