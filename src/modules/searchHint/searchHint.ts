import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHint.tpl.html';


export type SearchHint = {
  title: string;
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
    const { title } = this.searchHint;
    this.view.searchHintTitle.innerText = title;
    this.view.searchHintTitle.onclick = () => {
      const input = document.querySelector(".searchpage__input");
      if(!input) return;
      if(input instanceof HTMLInputElement) {
        input.value = title;
      }
    };
  }

  createSeparator(textContent: string) {
    const separatorEl = document.createElement('span');
    separatorEl.classList.add('searchHint__separator');
    separatorEl.textContent = textContent;
    return separatorEl;
  }
}