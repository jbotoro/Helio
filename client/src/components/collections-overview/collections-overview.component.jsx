import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionPreview from "../preview-collection/preview-collection.component"

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

import { CollectionsOverviewContainer } from "./collections-overview.styles";



const CollectionsOverview = ({ collections, searchQuery }) => {


  const filterCollection = (collection, search) => {
    const collectionItems = collection.items;
    let res = []
    for(let i = 0; i < collectionItems.length; i++){
      let currItem = collectionItems[i];
      let itemName = currItem.name.toLowerCase();
      if(itemName.includes(search.toLowerCase())){
        res.push(currItem)
      }
    }
    return res
  }

  if(searchQuery){
    let searchRes = [];
    for(let j = 0; j < collections.length; j++){
      let currCollection = collections[j];
      let copyCollection = Object.assign({}, currCollection)
      let collectionRes = filterCollection(copyCollection, searchQuery);
      copyCollection.items = collectionRes;
      searchRes.push(copyCollection);

    }
    collections = searchRes;

  }
  
  return(
    <CollectionsOverviewContainer>
      {collections.map(({ id, routeName, title, items }) => (
        items.length > 0 ? <CollectionPreview key={id} routeName={routeName} title={title} items={items} /> : null
      ))}
    </CollectionsOverviewContainer>
  )
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);
