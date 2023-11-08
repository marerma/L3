import { Component } from '../component';
import html from './searchpage.tpl.html';

import { SearchHintsList } from '../searchHintsList/searchHintsList';

// тестовые данные
const mockHints = [
  { href: '/product?id=23150481', title: 'чехол iphone 13 pro'}, 
  { href: '/product?id=155334998', title: 'коляски agex'}, 
  { href: '/product?id=68988778', title: 'яндекс станция 2'}
];

// тестовая страница для просмотра подсказок
class Searchpage extends Component {
  searchHints: SearchHintsList;

  constructor(props: any) {
    super(props);

    this.searchHints = new SearchHintsList();
    this.searchHints.attach(this.view.searchHints);
  }

  render() {
    this.searchHints.update(mockHints);
  }
}

export const searchpageComp = new Searchpage(html);
