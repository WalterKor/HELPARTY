import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Icon, Col, Card, Row, Carousel, Checkbox} from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { continents } from './Sections/Datas';

function LandingPage() {

    const { Meta } = Card;
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0);




    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body);

    }, [])

    const getProducts = (body) =>{
        axios.post('/api/product/products', body)
        .then(response =>{
            if(response.data.success){
                if(body.loadMore){
                    setProducts([...Products, ...response.data.productsInfo])
                }else{
                    setProducts(response.data.productsInfo)
                }
                setPostSize(response.data.postSize)
                
            }else{
                alert("상품들을 가져오는것에 실패했습니다.")
            }
        })
    }
    
    const loadMoreHandler = () =>{
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body);
        setSkip(skip);
    }

    const renderCards = Products.map((product, index)=> {
        console.log(product);
        return(
            <Col key={index} lg={6} md={8} xs={24}  >
                <Card                    
                    style={{ width: '100%', maxHeight: '150px'}}
                    cover={<ImageSlider images={product.images}/>}
                >
                    <Meta 
                        title={product.title}
                        description={`${product.price}`}
                    />
                </Card>
            </Col>
        )
    })


    return (
        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center'}}>
                <h2>Let's Travel Anywhere<Icon type='rocket'/></h2>
            </div>
        
            {/* Filter */}

            {/* CheckBox */}
            <CheckBox list={continents}/>
            {/* RadioBox */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}            
            </Row>
            <br/>

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>            
            }


        </div>
    )
}

export default LandingPage
