import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const Products = () => {

  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const getAllProducts = async () => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const {data} = await axios.get('/api/products/getproducts');
      setProductData(data);
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(data);

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      console.log(error);
    }
  };

  useEffect(() => {
      getAllProducts();
  }, []);

  const handlerDelete = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post('/api/products/deleteproducts', {productId:record._id});
      message.success("Product Deleted Successfully!")
      getAllProducts();
      setPopModal(false);
      dispatch({
        type: "HIDE_LOADING",
      });
      

    } catch(error) {
      dispatch({
        type: "HIDE_LOADING",
      });
      message.error("Error!")
      console.log(error);
    }
  }

  const columns = [
    {
        title: "Name",
        dataIndex: "name"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Brand",
      dataIndex: "brand"
    },
    {
        title: "Image",
        dataIndex: "image",
        render:(image, record) => <img src={image} alt={record.name} height={60} width={60} />
    }, 
    {
        title: "Price",
        dataIndex: "price",
    },
    {
    
        
    }
  ]

  const handlerSubmit = async (value) => {
    //console.log(value);
    if(editProduct === null) {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const res = await axios.post('/api/products/addproducts', value);
        message.success("Product Added Successfully!")
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!")
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
       await axios.put('/api/products/updateproducts', {...value, productId:editProduct._id});
        message.success("Product Updated Successfully!")
        getAllProducts();
        setPopModal(false);
        dispatch({
          type: "HIDE_LOADING",
        });
        
  
      } catch(error) {
        dispatch({
          type: "HIDE_LOADING",
        });
        message.error("Error!")
        console.log(error);
      }
    }
  }

  return (
    <LayoutApp>
      <h2>All Products </h2>
      <Table dataSource={productData} columns={columns} bordered />
      
      {
        popModal && 
        <Modal title={`${editProduct !== null ? "Edit Product" : "Add New Product"}`} visible={popModal} onCancel={() => {setEditProduct(null); setPopModal(false);}} footer={false}>
          <Form layout='vertical' initialValues={editProduct} onFinish={handlerSubmit}>
            <FormItem name="name" label="Name">
              <Input/>
            </FormItem>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="noodles">Noodles</Select.Option>
                <Select.Option value="can">Can</Select.Option>
                <Select.Option value="drinks">Drinks</Select.Option>
              </Select>
            </Form.Item>
            <FormItem name="price" label="Price">
              <Input/>
            </FormItem>
            <FormItem name="description" label="Description">
              <Input/>
            </FormItem>
            <FormItem name="brand" label="Brand">
              <Input/>
            </FormItem>
            <FormItem name="image" label="Image URL">
              <Input/>
            </FormItem>
          </Form>
        </Modal>
      }

    </LayoutApp>
  )
}

export default Products
