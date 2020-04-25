import React , {useEffect} from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import './search.styles.css'

const Search = ({ fetchCollectionsStart, match }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect( () => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart]
);

    const SearchCollectionsOverviewContainer = (props) => {
        return (
            <CollectionsOverviewContainer 
                searchQuery={searchQuery}
                {...props}
            />
        )
    }

    
    return (
        <div className='shop-page'>
            <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
            <i class="fas fa-search" aria-hidden="true"></i>
            <input 
                className='search'
                type='search' 
                placeholder='Search' 
                onChange={handleChange}>
            </input>
            </form>
            <Route exact path={`${match.path}`} 
            render={SearchCollectionsOverviewContainer}
            />
            <Route path={`${match.path}/:collectionId`} 
            component={CollectionPageContainer}
            />
        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(Search);