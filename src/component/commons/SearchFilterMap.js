import React, { useState } from 'react'

import Card from 'antd/lib/card'
import Empty from 'antd/lib/empty'
import Input from 'antd/lib/input'
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Menu from 'antd/lib/menu'
import Typography from 'antd/lib/typography'
import Dropdown from 'antd/lib/dropdown'
import DownOutlined from '@ant-design/icons/DownOutlined'

const { Title } = Typography
const { Search } = Input

export default function SearchFilterMapComponent(props) {
    const [searchParam, setParam] = useState('')
    const [minNum, setMin] = useState(0)
    const [maxNum, setMax] = useState(0)
    const [selectedCategory, setCategory] = useState('')
    const [priceSort, setOrder] = useState(0)

    //Handles the combination of Search and Filtering
    const SearchFilterMap = (item, searchParam, minRange, maxRange, selectedCategory) => {
        const product = item
        if(priceSort === 1) {
            product.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            })
        } else if (priceSort === 2){
            product.sort(function(a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            })
        }
        //handles if somehow item has no data, as usestate is an empty array by default
        if (product.length === 0) {
            return (
                <Card.Grid>
                    <Empty />
                </Card.Grid>
            )
        }
        return product.map((item, index) => {
            if ((item.title.toLowerCase()).includes(searchParam.toLowerCase())) {// lowercases both title and search value, and searches by a partial word not by whole word
                if(item.category === selectedCategory || selectedCategory === "") {
                    //If price is (greater than or equal) minimum number AND (price is less than or equal to maximum number OR max range is not set)
                    if (item.price >= minRange && (item.price <= maxRange || maxRange === 0)) {
                        return (
                            <Card.Grid key={index}>
                                <img style={{ width: "100%" }} alt="example" src={item.image} />
                                <p><strong>{item.title}</strong></p>
                                <p>{"$" + item.price.toFixed(2)}</p> {/* Integer must have 2 decimal spaces to look better */}
                                <p>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p> {/* Capitalize First Letter */}
                                <p>{item.description}</p>
                            </Card.Grid>
                        )
                    } else { 
                        return null 
                    }
                } else {
                    return null
                }
            } else {
                return null
            }
        })
    }

    //Handles search by title
    const onSearch = value => setParam(value);

    //Handles Product Price filter after submitting
    const onFinish = (values) => {
        if (values.min === undefined || values.min === "") {
            setMin(0)//sets a num if left blank, to prevent errors
        } else {
            setMin(Number(parseFloat(values.min)))//sets product's lowest value, decimal for precise filter
        }
        if (values.max === undefined || values.max === "") {
            setMax(0)//sets a num if left blank, to prevent errors
        } else {
            setMax(Number(parseFloat(values.max)))//sets product's highest value, decimal for precise filter
        }
    }

    
    // Functions for Category Filter--------------------------------------------------------------------------------------------->
    const handleClick = (value) => {
        setCategory(value)
    }
    const ResetCategory = () => {
        setCategory("")
    }

    const menu = (product) => {
        return (
            <Menu>
                { productMap(product)}
            </Menu>
        )
    }

    //Creates a unique/distinct(non-duplicate) list of categories so that I can then filter by those unique categories
    const productMap = (item) => {
        const unique = [...new Set(item.map(item => item.category))];

        return unique.map((item, index) => {
            return (
                <Menu.Item key={index} onClick={() => handleClick(item)}>
                    <div>
                        {item}
                    </div>
                </Menu.Item>
            )
        })
    }
    // Functions for Category Filter--------------------------------------------------------------------------------------------->

    // Functions for Price Sort --------------------------------------------------------------------------------------------->
    const SortMenu = () => {
        return (
            <Menu>
                <Menu.Item key={1} onClick={() => setOrder(1)}>
                    <div>
                        Ascending Order
                    </div>
                </Menu.Item>
                
                <Menu.Item key={2} onClick={() => setOrder(2)}>
                    <div>
                        Descending Order
                    </div>
                </Menu.Item>
            </Menu>
        )
    } 
    // Functions for Price Sort --------------------------------------------------------------------------------------------->

    if (props.data === undefined) {
        return (
            <Empty />
        )
    } else {
        return (
            <div className="card">
                <Title level={4}>
                    Searchbar
                </Title>
                <p>This searchbar searches by product title, highlighted by bold. This can handle partial strings. I.E. men can search products with the title wo(men)</p>
                <Search className="search-bar" placeholder="Search By Name" onSearch={onSearch} style={{ width: "25%" }} />

                <Title level={4}>
                    Filter Product by Price
                </Title>
                <p>Type in two numbers(decimals work) and you will get list of product(s) where the price fits between the minimum and maximum numbers, Enter 0 or nothing to remove the minimum or maximum limit</p>
                <Form className="filter-price" layout="inline" onFinish={onFinish}>
                    <Form.Item name="min">
                        <Input placeholder="Minimum Product Range" />
                    </Form.Item>
                    <Form.Item name="max">
                        <Input placeholder="Maximum Product Range" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Filter by Price</Button>
                </Form>

                <Title level={4}>
                    Filter by Category
                </Title>
                <p>Choose the category that you want to filter by, all categories that don't match will be missing</p>
                <div className="category-filter">
                    <Dropdown overlay={menu(props.data)}>
                        <button className="ant-dropdown-link" >
                            {(selectedCategory === "") ? "Filter by Category" : selectedCategory} <DownOutlined />
                        </button>
                    </Dropdown>
                    <button onClick={() =>{ResetCategory()}} style={{marginLeft:"20px"}}>
                        Reset
                    </button>
                </div>

                <Title level={4}>
                    Sort by Price
                </Title>
                <p>Choose how to sort the product, ascending(lowest price to highest) or descending(highest price to lowest)</p>
                <Dropdown overlay={SortMenu}>
                        <button className="ant-dropdown-link" >
                            {
                                priceSort === 1 ? "Ascending"
                                : priceSort === 2  ? "Descending"
                                : "Filter by Price"
                            } <DownOutlined />
                        </button>
                </Dropdown>

                <Card className="card-grid" title="Card Title">
                    {SearchFilterMap(props.data, searchParam, minNum, maxNum, selectedCategory)}
                </Card>

                
                <p>Note: These functions work together, so you can filter by category and sort, or partial search and filter by price. It works with all the functions.</p>
            </div>
        )
    }
}