import React from 'react'
import { Col, message, Row, Table, Badge } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllBooks } from "../../apicalls/books";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Home() {
  const [books, setBooks] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooks=async ()=>{
    try{
      dispatch(ShowLoading())
      const response=await GetAllBooks();
      console.log(response);
      dispatch(HideLoading())
      if(response.success)
      {
        setBooks(response.data)
      }
      else{
        message.error(response.message)
      }


    }catch(error)
    {
  dispatch(HideLoading())
message.error(error.message)
    }
  }
useEffect(() => {
  getBooks()
}, [])


  return (
    <div className="mt-2"> 
      <Row gutter={[16,16]}>
        {books.map((book)=>{
          return <Col key={book._id} onClick={()=>navigate(`/book/${book._id}`)} xs={24} sm={24} md={12} lg={6} xl={6}>
            <Badge.Ribbon text={book.avaliableCopies>0?"In stock":"Out of Stock"} color={book.avaliableCopies>0?"green":"red"}>
             <div className='rounded bg-white p-1 shadow  flex flex-column gap-1'>
              <img src={book.image} height="200px" width="240px"/>
              <h1 className="text-md text-secondary uppercase font-bold mt-2">
                    {book.title}
                  </h1>
             </div>
             </Badge.Ribbon>
          </Col>
        })}
      </Row>
    </div>
  )
}

export default Home