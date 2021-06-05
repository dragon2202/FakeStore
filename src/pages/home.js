import React, { useState, useEffect } from 'react'

import SearchFilterMap from '../component/commons/SearchFilterMap'


export default function Home() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        //Fetches api and sets it in a usestate
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then((productsArray) => {
                setProduct(productsArray)
            })
    }, [])

    return (
        <main className="home">
            <section>
                <p className="title">Fake Store Assessment</p>
                <SearchFilterMap data={product} />
            </section>
        </main>
    )
}