import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Instagram from '../../../../assets/instagram.jpg'
import Facebook from '../../../../assets/facebook.jpg'
import Zalo from '../../../../assets/zalo.jpg'
import './Profile.css';
import { Modal, Table } from "antd";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import { fetchOrderAdminAction } from "../../../../stores/slices/admin.cart.slice";
import { deleteUserAction, fetchUserAction, searchUserAction, updateUserInfoAction } from "../../../../stores/slices/user.slice";
import { IoPencilOutline } from "react-icons/io5";

function Profile() {
    const list_user = useSelector(state => state.user.userInfoState);
    const orderState = useSelector((state) => state.adminCart.cartState);
    const [valueSearch, setValueSearch] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const location = useLocation()
    const [newValue, setNewValue] = useState();
    const [title, setTitle] = useState({
        titleName: '',
        titleValue: ''
    });
    const [profileUser, setProfileUser] = useState(location.state);
    const dispatch = useDispatch();
    const userUpdate_ = list_user.userUpdate
    const data = orderState.data.filter(item => {
        return item.userId === profileUser.id
    })


    useEffect(() => {
        dispatch(fetchUserAction({ page: 1, limit: 200 }))
    }, [dispatch,userUpdate_])
    useEffect(() => {
        dispatch(fetchOrderAdminAction())
    }, [dispatch]);
    const showUser = (item) => {
        setProfileUser(item)
    }
    
    const onChangeShowUser = (e) => {
        const value = e.target.value;
        setValueSearch(value);
        dispatch(searchUserAction(value));
    
    }
    
    const onChangeNewValue = (e) => {
        setNewValue(e.target.value)
    }
   

    const showModal = (name, value) => {
        setIsModalVisible(true);

        setNewValue(null)
        setTitle({
            titleName: name,
            titleValue: value
        })
    };
    const showModal2 = (name, value) => {
        setIsModalVisible2(true);
        setTitle({
            titleName: name,
            titleValue: value
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
        dispatch(updateUserInfoAction({id:profileUser.id,data:{[title.titleName.toLowerCase()]: newValue}}))
        setProfileUser({...profileUser,[title.titleName.toLowerCase()]: newValue})
        setNewValue(null)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };
    const handleOnchangeFile = (e) => {
        const file = e.target.files[0];
        // file.urlImage = URL.createObjectURL(file);
        function getBase64(file, onLoadCallback) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function () { resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        var promise = getBase64(file);
        promise.then(function (result) {
            if(result) {
                setNewValue(result)
            }
        });
    };
    const handleDelete = (e) => {
        const index = list_user.dataUser.findIndex(item => item.id === e)
        dispatch(deleteUserAction(e))
        setProfileUser(list_user.dataUser[index-1])
    }
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ListProductOrder',
            dataIndex: 'listProductOrder',
            key: 'listProductOrder',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {element.productName}
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
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => <div style={status === 'Đã nhận' ? { color: "green" } : { color: 'red' }}>{status}</div>
        },
        {
            title: 'TotalBill',
            key: 'totalBill',
            dataIndex: 'totalBill',
            render: (totalBill) => <div >{totalBill} 000đ</div>
        },
    ];
    return (
        <div className="user-profile">
            <NavAdmin />
            <div className="profile-user">              
                <div className="profile">
                    <div className="info">
                        <img src={profileUser.image} alt="" className="info1"  onClick={() => showModal2('Image',)}/>
                        <div className="info1">
                            <p>Name: {profileUser.name}
                                <span onClick={() => showModal('Name', profileUser.name)}><IoPencilOutline />
                                </span>
                            </p>
                            <p>Email: {profileUser.email}</p>
                            <p>Phone: {profileUser.phone} <span onClick={() => showModal('Phone', profileUser.phone)}>
                                <IoPencilOutline /></span></p>
                            <p>Address: {profileUser.address}
                                <span onClick={() => showModal('Address', profileUser.address)}><IoPencilOutline /></span>
                            </p>
                        </div>
                        <div className="info1">
                            <p>Decentralization: {profileUser.decentralization} <span
                                onClick={() => showModal('Decentralization', profileUser.decentralization)}>
                                <IoPencilOutline /></span>
                            </p>
                            <p>Status: {profileUser.status}</p>
                            <p>
                                <img className="fb" src={Facebook} />
                                <img className="zl" src={Zalo} />
                                <img className="in" src={Instagram} />
                            </p>
                        </div>
                        <button onClick={() =>handleDelete(profileUser.id)} className='delete-profile' >delete</button>
                        <Modal  title="Edit Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>{title.titleName}: {title.titleValue}</p>                          
                            <input className="new-value" placeholder="Enter new value"
                                style={{ outline: 'none', border: 'none' }}
                                value = {newValue?? ''} onChange={onChangeNewValue}
                            ></input>
                        </Modal>
                        <Modal  title="Edit Information" visible={isModalVisible2} onOk={handleOk} onCancel={handleCancel}>
                            <label style={{marginRight:'10px'}}>Avatar:  </label>  
                            <img src={profileUser.image} width={'100px'}></img>                     
                            <label for="new-avatar" style={{margin:'0 10px'}}>Chose new Avatar:  </label>
                            <input id="new-avatar" type='file' hidden onChange={handleOnchangeFile}></input>
                            {newValue && <img width={'100px'} className="image-profile" src={newValue} />}
                        </Modal>
                    </div>
                    <div className="history">
                        <Table bordered columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div>
                <div className="search-user" >
                    <div className="input-search">
                        <input placeholder="Search Users" onChange={onChangeShowUser}></input>
                    </div>
                    <div className="list-user">
                        {(valueSearch ? list_user.search : list_user.dataUser).map((item) => {
                            return (
                                <div className={`item-user ${(item.id === profileUser.id)? 'active':''}`} onClick={() => showUser(item)} 
                                >
                                    <img src={item.image} alt="" />
                                    <div className="name-user">
                                        <p>{item.name}</p>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;