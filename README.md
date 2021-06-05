# FakeStore

### How to Run
npx create-react-app my-app
</br>
npm i (antd, node-sass, react-router-dom,sass-loader)
</br>
npm start

### Details
I decided to use a single page, as I didn't see the need to use more than one. 
</br>
I also created the component SearchFilterMap.js to handle all the functions required(search,filter, sort).
</br>
Another reason I did that is because it looks better for home.js not to be cluttered with functions and state objectts.
</br>
</br>
SearchFilterMap function in (component/commons/searchfiltermap.js) accepts multiple parameters because I thought it would be a lot of work to handle the manipulation seperately. 
</br>
I chose to nest the if statements together so that filter, search, sort would depend on each other and interact if the user chose to use more than one function.
</br>
In the SearchFilterMap function, I chose to prioritze certain functions primarily sorting.
</br>
Sort is first priority because I want to sort the products instead of filter, or search before sort. 
</br>
The reason I did it this way is because if you reset the filter or search I wanted the products to be sorted.
</br>
I didn't want to users to filter than sort, as reversing the filter would return a partial sorted list of products.
</br>
Search, category filter, product filter in second, third, and fourth. I don't think it would matter to change priorties as they are meant to coexist.

