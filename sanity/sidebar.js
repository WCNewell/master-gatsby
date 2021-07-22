import React, { Children } from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { DocumentListItemBuilder } from '@sanity/structure/lib/DocumentListItem';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a new subitem
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems(),
    ]);
}
