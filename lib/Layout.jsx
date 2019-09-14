import React from 'react';

import Header from './modules/header/components/Header';
import FilesView from './modules/filesview/components/FilesView';
import NavigationTree from './modules/navigationTree/components/NavigationTree';

export default function Layout() {

  return (
    <React.Fragment>
      <Header />
      <NavigationTree />
      <FilesView />
    </React.Fragment>
  );
}