import React, { useState } from "react";
import './Delivery.css'
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Table, Button, notification } from 'antd';
import { ConfirmOrderAction } from "../../../../stores/slices/admin.cart.slice";
import { fetchOrderAdminAction } from "../../../../stores/slices/admin.cart.slice";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";

export const Delivery = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const dispatch = useDispatch();
    const orderState = useSelector((state) => state.adminCart.cartState);
    const lengthStatus = orderState.lengthStatus;
    const loading2 = orderState.loading;
    const data1 = orderState.data.filter(item => item.status === 'Đang giao')
    const dataSource = []
    const data_ = () => {
        data1.map((item, index) => {
            const data_item = { key: index, ...item }
            dataSource.push(data_item)
        })
    }
    data_();
    //   const [data, setData] = useState();
    useEffect(() => {
        dispatch(fetchOrderAdminAction())
    }, [dispatch,lengthStatus,selectedRowKeys]);

    const handleDeliveredOrder = (item) => {
        dispatch(ConfirmOrderAction({ id: item, status: 'Đang giao' }));
        notification.success({message:'Xác nhận thành công'})
    }
    const handleCancelOrder = (item) => {
        dispatch(ConfirmOrderAction({ id: item, status: 'Đã hủy' }))
        notification.success({message:'Đã hủy'})

    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName',
            render: (userName) => <div style = {{color:"blue"}}>{userName}</div>
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => <div style = {{color:"blue"}}>{date}</div>
        },
        {
            title: 'Order',
            dataIndex: 'listProductOrder',
            key: 'listProductOrder',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    - {element.productName}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Size',
            dataIndex: 'listProductOrder',
            key: 'size',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            const size = element.size.label
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {size}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Count',
            dataIndex: 'listProductOrder',
            key: 'count',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {element.count}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'TotalBill',
            key: 'totalBill',
            dataIndex: 'totalBill',
            render: total => `${total} .000đ`

        },
        {
            title: 'TotalBill',
            key: 'totalBill',
            dataIndex: 'totalBill',
            render: total => `${total} .000đ`

        },
        {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (id) => {
                return (
                    <div className="handle-button">
                        <button className="handle-button1" onClick={() => handleDeliveredOrder(id)}
                            >Delivered</button>
                        <button className="handle-button2" onClick={() => { handleCancelOrder(id) }}
                           >Cancel</button>
                    </div>
                )
            }

            ,
        },
    ];


    const handleMultipleDelivered = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
        for (let index = 0; index <selectedRowKeys.length; index++) {
            const element = selectedRowKeys[index];
            const idItem = data1[element].id
            dispatch(ConfirmOrderAction({ id: idItem, status: 'Đã nhận' }))
        }
        notification.success({message: `Đã xong ${selectedRowKeys.length} đơn hàng`})

    };
    const handleMultipleCancel = () => {
        setLoading1(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading1(false);
        }, 1000);
        for (let index = 0; index <selectedRowKeys.length; index++) {
            const element = selectedRowKeys[index];
            const idItem = data1[index].id
            dispatch(ConfirmOrderAction({ id: idItem, status: 'Đã hủy' }))
        }
        notification.success({message: `Đã hủy ${selectedRowKeys.length} đơn hàng`})

    };

    const onSelectChange = (newSelectedRowKeys) => {

        setSelectedRowKeys(newSelectedRowKeys);
    };


    const rowSelection = {
        onChange: onSelectChange,
        selectedRowKeys,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div className="order">
            <NavAdmin />
            <div className="list-order">
                <h2 style={{ textAlign: 'center' }}>LIST DELIVERY</h2>
                <div className="order-table">
                    <div className=""
                        style={{
                            marginBottom: '16px',
                        }}
                    >
                        <Button type="primary" onClick={handleMultipleDelivered} disabled={!hasSelected} loading={loading} style={{ marginRight: '10px' }}>
                            Confirm
                        </Button>
                        <Button type="primary" onClick={handleMultipleCancel} disabled={!hasSelected} loading={loading1}>
                            Cancel
                        </Button>
                        <span
                            style={{
                                marginLeft: 8,
                            }}
                        >
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    {loading2 && <div style={{ textAlign: 'center' }}><LoadingOutlined /></div>}
                    <Table bordered rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
            </div>
        </div>
    );
}