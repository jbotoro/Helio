# Helio-Live

[Live Link](https://helio-live.herokuapp.com/) . 
  
    
    
![alt text](https://github.com/jbotoro/markdown_images/blob/master/splash_page.png)


## Overview

Helio-live is a ecommerce web application, the goal was to create a lightweight online store utilizing some new technologies / frameworks like GraphQL, Firebase, Redux Hooks & Sagas, and the Stripe payment API


## Technologies 
 
#### Backend
  * Firebase
  * Node/Express
  * GraphQL/Apollo
  
#### Frontend
  * React / Redux
  * JavaScript
  * Styled Components
  * HTML5
  * CSS3
  
## Features
 
#### Users Auth
   * Users can create and sign in with a unique username and password
   * Users can login with Google account via Firebase or with Email
   
   ![loginwithGoogle](https://github.com/jbotoro/markdown_images/blob/master/googleLoginHelio.gif)
   
   ``` javascript
      export const auth = firebase.auth();
      export const firestore = firebase.firestore();

      export const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: 'select_account' });
      export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

      export default firebase;
   
   ```
   
   * Users cart and cartItems persist if user logged in.
   * Redux-persist used to ensure that state stays the same even on refresh
   
   ``` javascript
    export const store = createStore(rootReducer, applyMiddleware(...middlewares))

    export const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    export default {store, persistor};
   ```
   
   
   ``` javascript
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
   
   ```
   
   
   ``` javascript
    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['cart']
    };

    const rootReducer = combineReducers({
      user: userReducer,
      cart: cartReducer,
      directory: directoryReducer,
      shop: shopReducer
    });

    export default persistReducer(persistConfig, rootReducer);
   ```
   
   
 
#### Main Page & NavBar
   * All subsections of store listed on splash page (i.e. hats show page, jackets page etc...). 
     
     
   ![featuredListSplash](https://github.com/jbotoro/markdown_images/blob/master/splash_page.png)
   ``` javascript
      const Directory = ({ sections }) => (
        <DirectoryMenuContainer>
          {sections.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
           ))}
        </DirectoryMenuContainer>
       );
   ```
   * NavBar has cartIcon and cart Dropdown list, cartIcon updates with number of items in cart . 
   ![cartItemsNavbar](https://github.com/jbotoro/markdown_images/blob/master/cart_icon.png)
   ``` javascript
    export const CartIcon = ({ toggleCartHidden, itemCount }) => (
      <CartContainer onClick={toggleCartHidden}>
        <ShoppingIcon />
        <ItemCountContainer>{itemCount}</ItemCountContainer>
      </CartContainer>
    );
   ```
   
   ![cartDropdown](https://github.com/jbotoro/markdown_images/blob/master/cart_dropdown.png)
   
   ``` javascript
     export const CartDropdown = ({ cartItems, history, dispatch }) => (
      <CartDropdownContainer>
        <CartItemsContainer>
          {cartItems.length ? (
            cartItems.map(cartItem => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
              <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            )}
        </CartItemsContainer>
        <CartDropdownButton
          onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
          }}
        >
          GO TO CHECKOUT
        </CartDropdownButton>
      </CartDropdownContainer>
  );
   
   ```


#### Search clothing via Search Page

  

  * Search page allow for users to quickly and easily sift through the collection to find what they are looking for.
  
  ![featuredSearch](https://github.com/jbotoro/markdown_images/blob/master/featuredbrowsinghelio.gif). 
  
  ``` javascript
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
  
  ```
     
   
#### Browse clothing by collection type

  * All clothes can be browse via collection type (i.e. hats show page displays all hats, jackets show page displays all jackets etc...) for easy and convenient browsing.  
  
  ![featuredBrowsing](https://github.com/jbotoro/markdown_images/blob/master/featuredbrowsinghelio.gif).  
  
     
             
#### Checkout Page  
 

   * All items added to cart are shown in checkout page, users able to change quantity of items or remove items all together  from the cart on the checkout page 
     
     
   ![checkoutPageButtons](https://github.com/jbotoro/markdown_images/blob/master/checkout_screen.png) . 
   
     
     
   * Stripe API used to handle payments, users given sample credit card information to test Stripe payment 
     
     
   ![stripePayment](https://github.com/jbotoro/markdown_images/blob/master/stripe_checkout.png)
   
   
   ``` javascript
       const CheckoutPage = ({ cartItems, total }) => (
        <CheckoutPageContainer>
          <CheckoutHeaderContainer>
            <HeaderBlockContainer>
              <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
              <span>Remove</span>
            </HeaderBlockContainer>
          </CheckoutHeaderContainer>
          {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <TotalContainer>TOTAL: ${total}</TotalContainer>
          <WarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 11/20 - CVV: 123
          </WarningContainer>
          <StripeCheckoutButton price={total} />
        </CheckoutPageContainer>
    );
   
   ```