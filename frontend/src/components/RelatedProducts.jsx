import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category }) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.filter(item => 
                item.category === category
            );

            productsCopy = productsCopy.sort(() => Math.random() - 0.5);
            setRelated(productsCopy.slice(0, 5))
        }
    }, [products, category])

    const handleScrollToTop = (id) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        let productsCopy = products.filter(item => 
            item.category === category
        ).sort(() => Math.random() - 0.5);

        setRelated(productsCopy.slice(0, 5));
    }

    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gy6'>
                {
                    related.map((item, index) => (
                        <div key={item._id} onClick={() => handleScrollToTop(item._id)}>
                            <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts